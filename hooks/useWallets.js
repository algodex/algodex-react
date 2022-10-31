/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import events from '@algodex/algodex-sdk/lib/events'
import { find } from 'lodash'
import { isEqual } from 'lodash/lang'
import { logInfo } from 'services/logRemote'
import signer from '@algodex/algodex-sdk/lib/wallet/signers/MyAlgoConnect'
import useAccountsInfo from '@/hooks/useAccountsInfo'
import { useAlgodex } from '@algodex/algodex-hooks'
import { useEvent } from 'hooks/useEvents'
import { useEventDispatch } from './useEvents'
import useMyAlgoConnect from './useMyAlgoConnect'
import usePeraConnection from './usePeraConnection'
import useWalletConnect from './useWalletConnect'

/**
 *
 * @param {Array<Wallet>} a
 * @param {Array<Wallet>} b
 * @return {Array<Wallet>}
 * @private
 */
function _mergeAddresses(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new TypeError('Must be an array of addresses!')
  }
  const map = new Map()
  a.forEach((wallet) => map.set(wallet.address, wallet))
  b.forEach((wallet) => map.set(wallet.address, { ...map.get(wallet.address), ...wallet }))
  return Array.from(map.values())
}
export const WalletsContext = createContext()
export function WalletsProvider({ children }) {
  const [addresses, setAddresses] = useState([])
  const { connector: walletConnect } = useWalletConnect()
  return (
    <WalletsContext.Provider value={[addresses, setAddresses, walletConnect]}>
      {children}
    </WalletsContext.Provider>
  )
}
WalletsProvider.propTypes = {
  children: PropTypes.node
}
/**
 * Use Wallets Hooks
 * @param {Object} initialState Wallet Initial State
 * @return {*}
 */
function useWallets(initialState) {
  const dispatcher = useEventDispatch()
  const { connector: myAlgoConnector } = useMyAlgoConnect()
  const context = useContext(WalletsContext)
  const { peraWalletConnector } = usePeraConnection()
  if (context === undefined) {
    throw new Error('Must be inside of a Wallets Provider')
  }
  const [wallet, setWallet] = useState(initialState)
  const [addresses, setAddresses] = context

  const { http, wallet: _wallet, setWallet: setAlgodexWallet } = useAlgodex()

  const onEvents = useCallback(
    (props) => {
      const { type, wallet: _wallet } = props
      if (type === 'change' && !isEqual(wallet, _wallet)) {
        setWallet(_wallet)
      }
    },
    [setWallet, wallet]
  )
  useEffect(() => {
    events.on('wallet', onEvents)
    return () => {
      events.off('wallet', onEvents)
    }
  }, [onEvents])

  const handleRemoveWallet = (disconnectedWallet) => {
    const res = localStorage.getItem('addresses')
    if (res) {
      const _connectedAddresses = JSON.parse(res).filter(
        (wallet) => wallet.address !== disconnectedWallet.address
      )
      localStorage.setItem('addresses', JSON.stringify(_connectedAddresses))
      setIsRehydrating(true)
      setAddresses(_connectedAddresses)
    }
  }

  useEvent('bridge-disconnected', (data) => {
    handleRemoveWallet(data.activeWallet)
    console.log(data.activeWallet, 'active wallet to dsiconnect')
  })

  /**
   * Fetches all Addresses from Local storage
   * and populate addresses list.
   *
   * Ensures there is no duplicate race conndition while
   * settting addresses.
   */
  useEffect(() => {
    const res = localStorage.getItem('addresses')
    if (res) {
      const _addresses = _mergeAddresses(JSON.parse(localStorage.getItem('addresses')), addresses)
      /**
       * If initialState (wallet) is set, don't set addresses
       * You can work with initial state
       */
      if (typeof _wallet === 'undefined') {
        setIsRehydrating(true)
        setAddresses(_addresses)
      } else {
        setActiveWallet([_wallet], 'update')
      }
    }
  }, [])

  const [isRehydrating, setIsRehydrating] = useState(false)

  /**
   * Get Hydrated Addresses
   * Ensures addresses are properly Hydrated at all times
   *
   * Watches for changes in Addresses and Pera Connection.
   */
  useEffect(() => {
    const res = localStorage.getItem('addresses')
    // Check if addresses exist in local storage
    if (res && res.length && isRehydrating) {
      const _reHydratedWallet = async () => {
        setIsRehydrating(true)
        // '@randlabs/myalgo-connect' is imported dynamically
        // because it uses the window object
        const myAlgoConnector = {}
        const MyAlgoConnect = (await import('@randlabs/myalgo-connect')).default
        MyAlgoConnect.prototype.sign = signer
        myAlgoConnector.current = new MyAlgoConnect()
        myAlgoConnector.current.connected = true
        const mappedAddresses = JSON.parse(res).map((addr) => {
          if (addr.type === 'my-algo-wallet') {
            return {
              ...addr,
              connector: myAlgoConnector.current
            }
          } else {
            return {
              ...addr,
              connector: peraWalletConnector.connector
            }
          }
        })
        if (mappedAddresses.length && _wallet === undefined) {
          setActiveWallet(mappedAddresses, 'new')
        } else {
          setActiveWallet(mappedAddresses, 'update')
        }
      }
      _reHydratedWallet()
      setIsRehydrating(false)
    }
  }, [addresses, peraWalletConnector])

  /**
   * Do rehydration when new data is fetched, during
   *
   */

  const walletsQuery = useAccountsInfo(addresses)

  useEffect(() => {
    const res = localStorage.getItem('addresses')
    if (res && _wallet && walletsQuery.data && !isRehydrating) {
      const mappedAddresses = addresses.map((wallet, idx) => {
        if (_wallet.address === wallet.address) {
          setAlgodexWallet({
            ..._wallet,
            ...walletsQuery.data[idx]
          })
        }
        return { ...wallet, ...walletsQuery.data[idx] }
      })
      const _mappedAddresses = mappedAddresses.filter((wallet) => Object.keys(wallet).length)
      setAddresses(_mappedAddresses)

      // Below is commented out because setting localstorage breaks with myAlgo Popup
      // localStorage.setItem('addresses', JSON.stringify(mappedAddresses))
    }
  }, [walletsQuery.data])

  /**
   * Returns the first occurence of connected wallets is a list of addresses.
   *
   * This is used to ensure consistency in activeWallet
   */
  // const filterConnectedWallet = useCallback((addressesList) => {
  //   const _filteredList = addressesList.filter((wallet) => {
  //     return wallet.connector && wallet.connector.connected
  //   })
  //   return _filteredList[0]
  // }, [])

  const filterConnectedWallet = useCallback((addressesList) => {
    const _filteredList = addressesList.filter((wallet) => {
      // return wallet.connector && (wallet.connector.connected || wallet.connector._connected)
      return wallet.connector && wallet.connector.connected
    })
    // return _filteredList[0]
    const _activeWallet = localStorage.getItem('activeWallet')
    if (_activeWallet) {
      const activeWallet = JSON.parse(_activeWallet)
      if (_filteredList.length > 0) {
        const hasActiveWallet = find(_filteredList, (o) => o.address === activeWallet.address)
        if (typeof hasActiveWallet === 'undefined') {
          localStorage.setItem('activeWallet', JSON.stringify(_filteredList[0]))
          return _filteredList[0]
        } else {
          return hasActiveWallet
        }
      } else {
        localStorage.removeItem("activeWallet")
      }
    } else {
      return _filteredList[0]
    }
  }, [])

  useEffect(() => {
    // const _activeWallet = localStorage.getItem('activeWallet')
    // if (_activeWallet && JSON.parse(_activeWallet).type === 'wallet-connect') {
    //   const parsedActiveWallet = JSON.parse(_activeWallet)
    //   const hasPeraConnect = find(addressesList, (o) => o.address === parsedActiveWallet.address)
    // }
    // const addressesList = localStorage.getItem('addresses')
    // if (addressesList) {
    //   setActiveWallet(JSON.parse(addressesList))
    // }
  }, [peraWalletConnector])
  

  const setActiveWallet = useCallback((addressesList, action) => {
    const _activeWallet = localStorage.getItem('activeWallet')
    if (_activeWallet && JSON.parse(_activeWallet).type === 'wallet-connect') {
      const parsedActiveWallet = JSON.parse(_activeWallet)
      const hasPeraConnect = find(addressesList, (o) => o.address === parsedActiveWallet.address)

      if (hasPeraConnect && hasPeraConnect.connector && (hasPeraConnect.connector.connected || hasPeraConnect.connector._connected)) {
        if (peraWalletConnector.connector !== null) {
          const _connectedWallet = filterConnectedWallet(addressesList)
          const _selectedWallet = handleWalletUpdate(_connectedWallet, action)
          if (_selectedWallet) {
            setAlgodexWallet(_selectedWallet)
            return
          }
        }
      } else if (peraWalletConnector.bridge === '') {
        const _connectedWallet = filterConnectedWallet(addressesList)
        const _selectedWallet = handleWalletUpdate(_connectedWallet, action)
        if (_selectedWallet) {
          setAlgodexWallet(_selectedWallet)
          return
        }
      }
    } else {
      const _connectedWallet = filterConnectedWallet(addressesList)
      const _selectedWallet = handleWalletUpdate(_connectedWallet, action)
      if (_selectedWallet) {
        setAlgodexWallet(_selectedWallet)
        return
      }
    }
    // handleActiveWallet(peraWalletConnector)
    // const _connectedWallet = filterConnectedWallet(addressesList)
    // const _selectedWallet = handleWalletUpdate(_connectedWallet, action)
    // if (_selectedWallet) {
    //   setAlgodexWallet(_selectedWallet)
    //   return
    // }
  }, [peraWalletConnector])

  const handleWalletUpdate = (wallet, action) => {
    // Update current wallet
    // Set new wallet
    if (!wallet) {
      console.error('No wallet provided')
      return
    }

    switch (action) {
      case 'update':
        // return _wallet
        return wallet
      case 'new':
        return wallet
      default:
        if (_wallet === undefined) {
          return wallet
        }
        return _wallet
    }
  }

  /**
   * IMPORTANT
   * If for any reason Pera does not have an active connection
   * or connection is null, remove all instance of pera wallet from the app
   */
  const removePeraWalletFromLocStorage = () => {
    // To be implemented
  }

  // Ensure PeraWallet is connection or disconnect Pera

  /**
   * Update Addresses from local storage
   * Update Addresses when rehydration happes
   */

  const addNewWalletToAddressesList = async (sameClient, newAddress, actionType = 'new') => {
    const otherWalletClients =
      addresses.filter((wallet) => wallet.type !== newAddress[0].type) || []

    const accounts = await http.indexer.fetchAccounts(newAddress)
    const mergedPrivateAddresses = _mergeAddresses(newAddress, accounts)
    const _allAddresses = _mergeAddresses(otherWalletClients, mergedPrivateAddresses)
    if (sameClient.length > newAddress.length) {
      if (_allAddresses.length > 0) {
        setActiveWallet(_allAddresses, actionType)
      }
      setIsRehydrating(true)
      localStorage.setItem('addresses', JSON.stringify(_allAddresses))
      if (actionType === 'new') {
        const newWallet = find(_allAddresses, o => o.address === newAddress[0].address)
        localStorage.setItem('activeWallet', JSON.stringify(newWallet))
      }
      setAddresses(_allAddresses)
    }
  }

  const replaceWalletInAddressList = (newAddress, accounts, actionType = 'new') => {
    const allAddresses = _mergeAddresses(addresses, _mergeAddresses(newAddress, accounts))
    const _otherAddresses = JSON.parse(localStorage.getItem('addresses'))
    const _allAddresses = _mergeAddresses(_otherAddresses || [], allAddresses).map((wallet) => {
      if (wallet.type === 'wallet-connect') {
        return {
          ...wallet,
          connector: peraWalletConnector.connector
        }
      }
      return wallet
    })
    setIsRehydrating(true)
    localStorage.setItem('addresses', JSON.stringify(_allAddresses))
    if (actionType === 'new') {
      const newWallet = find(_allAddresses, o => o.address === newAddress[0].address)
      localStorage.setItem('activeWallet', JSON.stringify(newWallet))
    }
    setActiveWallet(_allAddresses, actionType)
    setAddresses(_allAddresses)
  }

  const removeFromExistingList = (filteredAddressesList) => {
    const _filteredAddressesList = filteredAddressesList.map((wallet) => {
      if (wallet.type === 'wallet-connect') {
        return {
          ...wallet,
          connector: peraWalletConnector.connector
        }
      }
      return wallet
    })
    setActiveWallet(_filteredAddressesList, 'new')
  }

  const removeLastWalletFromList = (addressesList) => {
    const _wallet = addressesList[0]
    if (typeof wallet !== 'undefined') {
      let disconnectedActiveWallet = {}
      if (wallet.type === 'wallet-connect') {
        disconnectedActiveWallet = {
          ..._wallet,
          connector: {
            _connected: false,
            connected: false
          }
        }
      } else {
        disconnectedActiveWallet = {
          ..._wallet,
          connector: {
            ..._wallet.connector,
            connected: false
          }
        }
      }
      setActiveWallet([disconnectedActiveWallet], 'new')
    } else {
      let disconnectedActiveWallet = {}
      disconnectedActiveWallet = {
        ..._wallet,
        connector: {
          ..._wallet.connector,
          connected: false
        }
      }
      setActiveWallet([disconnectedActiveWallet], 'new')
    }
    dispatcher('signOut', { type: 'wallet' })
  }

  /**
   * Handles Connection with wallet
   */
  const handleConnect = useCallback(
    async (_addresses) => {
      if (_addresses.length > 0) {
        logInfo('Handling Connect')
        const sameWalletClient = addresses.filter((wallet) => wallet.type === _addresses[0].type)
        const accounts = await http.indexer.fetchAccounts(_addresses)
        if (sameWalletClient.length > _addresses.length) {
          addNewWalletToAddressesList(sameWalletClient, _addresses)
        } else {
          replaceWalletInAddressList(_addresses, accounts)
        }
        dispatcher('signIn', { type: 'wallet' })
      }
    },
    [setAddresses]
  )

  // Handle any Disconnect
  const handleDisconnect = useCallback(
    (_addresses) => {
      setIsRehydrating(true)
      const locStorageAddr = JSON.parse(localStorage.getItem('addresses'))
      const addressesList = locStorageAddr.length > 0 ? locStorageAddr : addresses || []
      const remainingAddresses =
        addressesList.filter((wallet) => {
          if (_addresses && _addresses[0]) {
            return wallet.address !== _addresses[0]
          }
        }) || []
      let _remainingAddresses = [...remainingAddresses]
      if (_remainingAddresses.length > 0) {
        removeFromExistingList(_remainingAddresses)
      } else {
        const _wallet =  addressesList[0]
        let disconnectedActiveWallet = {}
        disconnectedActiveWallet = {
          ..._wallet,
          connector: {
            ..._wallet.connector,
            connected: false
          }
        }
        setAlgodexWallet(disconnectedActiveWallet)
        // addressesList.length && removeLastWalletFromList(addressesList)
      }
      logInfo(
        `Disconnected Successfully with : ${_addresses} removed and ${_remainingAddresses.length} remaining`
      )
      localStorage.setItem('addresses', JSON.stringify(_remainingAddresses))
      setAddresses(_remainingAddresses)
      console.error('Handle removing from storage', _addresses)
    },
    [setAddresses]
  )

  const sessionUpdate = useCallback(
    async (_addresses) => {
      if (_addresses.length > 0) {
        logInfo('Handling Reconnecting session')
        setIsRehydrating(true)
        const sameWalletClient = addresses.filter((wallet) => wallet.type === _addresses[0].type)
        const accounts = await http.indexer.fetchAccounts(_addresses)
        if (sameWalletClient.length > _addresses.length) {
          addNewWalletToAddressesList(sameWalletClient, _addresses, 'update')
        } else {
          replaceWalletInAddressList(_addresses, accounts, 'update')
        }
        dispatcher('signIn', { type: 'wallet' })
      }
    },
    [setAddresses]
  )

  // My Algo Connect/Disconnect
  const { connect: myAlgoConnect, disconnect: myAlgoDisconnect } = useMyAlgoConnect(
    handleConnect,
    handleDisconnect
  )
  // My Algo/Disconnect
  // const {
  //   connect: peraConnect,
  //   disconnect: peraDisconnect,
  //   connector: _peraConnector
  // } = useWalletConnect(handleConnect, handleDisconnect, sessionUpdate)
  // Pera Connect/Disconnect

  const { connect: peraConnectOriginal, disconnect: peraDisconnectOriginal } = usePeraConnection(
    handleConnect,
    handleDisconnect,
    sessionUpdate
  )

  return {
    wallet: _wallet,
    setWallet: setAlgodexWallet,
    addresses,
    myAlgoConnect,
    peraConnect: peraConnectOriginal,
    peraDisconnect: peraDisconnectOriginal,
    // peraConnect,
    // peraDisconnect,
    myAlgoDisconnect,
    myAlgoConnector,
    // peraConnector: _peraConnector
    peraConnector: peraWalletConnector
  }
}

export default useWallets

