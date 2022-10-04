import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import PropTypes from 'prop-types'
import events from '@algodex/algodex-sdk/lib/events'
import { isEqual } from 'lodash/lang'
import { logInfo } from 'services/logRemote'
import signer from '@algodex/algodex-sdk/lib/wallet/signers/MyAlgoConnect'
import { useAlgodex } from '@algodex/algodex-hooks'
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
  console.log(a, b, 'first')
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
        // setActiveWallet(_wallet.address)
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
      // console.log(initialState, 'iitialState')
      if (initialState !== undefined) {
        // console.log(initialState, 'iitialState')
        // setAlgodexWallet(initialState)
      }
      console.log(_addresses, initialState, typeof initialState, 'console.log(res)')
      // setAlgodexWallet(_addresses[0])

      // Ensure there no request update of addresses.
      setAddresses(_addresses)

      /**
       * If initialState (wallet) is set, don't set addresses
       * You can work with initial state
       */
      // if (initialState === 'undefined') {
      //   setAddresses(_addresses)
      //   console.log('is undefined')
      // } else {
      //   console.log('is defined')
      //   setAlgodexWallet(initialState)
      // }
      // console.log(wallet, 'check wallet')
      // if (typeof wallet === 'undefined') {
      //   setAddresses(_addresses)
      // }
    }
  }, [])

  /**
   * Get Hydrated Addresses
   * Ensures addresses are properly Hydrated at all times
   *
   * Watches for changes in Addresses and Pera Connection.
   */
  useEffect(() => {
    const res = localStorage.getItem('addresses')
    // Check if addresses exist in local storage
    if (res && res.length) {
      const _reHydratedWallet = async () => {
        console.log(JSON.parse(res), 'hellosdfss')
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
              // connector: {
              //   // ...peraWalletConnector.connector,
              //   ...addr.connector,
              //   _accounts: addr.connector._accounts,
              //   _connected: addr.connector._connected,
              //   connected: addr.connector._connected
              // }
            }
          }
        })
        console.log(
          mappedAddresses,
          peraWalletConnector,
          peraWalletConnector.connector,
          'mapped addresses'
        )
        // localStorage.setItem('addresses', JSON.stringify(mappedAddresses))
        if (mappedAddresses.length) {
          console.log(mappedAddresses, filterConnectedWallet(mappedAddresses), 'pea new address')
          const _activeWallet = filterConnectedWallet(mappedAddresses)
          // if (initialState === undefined && _activeWallet) {
          //   console.log(initialState, 'setting initial tate')
          //   setAlgodexWallet(_activeWallet)
          //   // return initialState
          // }
          if (_activeWallet) {
            setAlgodexWallet(_activeWallet)
          }
        }
        // setAddresses(mappedAddresses)
      }
      _reHydratedWallet()
    }
  }, [addresses, peraWalletConnector])

  /**
   * Returns the first occurence of connected wallets is a list of addresses.
   *
   * This is used to ensure consistency in activeWallet
   */
  const filterConnectedWallet = useCallback((addressesList) => {
    console.log(addressesList, 'hey ooo')
    const _filteredList = addressesList.filter((wallet) => {
      return wallet.connector && wallet.connector.connected
    })
    console.log(_filteredList, 'aothehr ooo')
    dispatcher('signIn', { type: 'wallet' })
    return _filteredList[0]
  }, [])

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
  // useEffect(() => {
  //   // setAlgodexWallet(addresses[0])
  //   console.log(addresses, 'addresses updated')
  // }, [addresses])

  const addNewWalletToAddressesList = async (sameClient, newAddress) => {
    const otherWalletClients =
      addresses.filter((wallet) => wallet.type !== newAddress[0].type) || []

    const accounts = await http.indexer.fetchAccounts(newAddress)
    const mergedPrivateAddresses = _mergeAddresses(newAddress, accounts)
    const _allAddresses = _mergeAddresses(otherWalletClients, mergedPrivateAddresses)
    if (sameClient.length > newAddress.length) {
      setAddresses(_allAddresses)
      localStorage.setItem('addresses', JSON.stringify(_allAddresses))
      if (_allAddresses.length > 0) {
        const _activeWallet = filterConnectedWallet(_allAddresses)
        setAlgodexWallet(_activeWallet)
      }
    }
  }

  const replaceWalletInAddressList = (newAddress, accounts) => {
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
    setAddresses(_allAddresses)
    localStorage.setItem('addresses', JSON.stringify(_allAddresses))
    const _activeWallet = filterConnectedWallet(_allAddresses)
    setAlgodexWallet(_activeWallet)
  }

  const removeFromExistingList = (filteredAddressesList) => {
    if (filteredAddressesList.length > 0) {
      filteredAddressesList = filteredAddressesList.map((wallet) => {
        console.log(wallet, peraWalletConnector, 'wallet ooo hsdfsse')
        if (wallet.type === 'wallet-connect') {
          return {
            ...wallet,
            connector: peraWalletConnector.connector
          }
        }
        return wallet
      })
      setAlgodexWallet(filteredAddressesList[0])
    }
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
      setAlgodexWallet(disconnectedActiveWallet)
    } else {
      let disconnectedActiveWallet = {}
      disconnectedActiveWallet = {
        ..._wallet,
        connector: {
          ..._wallet.connector,
          connected: false
        }
      }
      setAlgodexWallet(disconnectedActiveWallet)
    }
  }

  /**
   * Handles Connection with wallet
   */
  const handleConnect = useCallback(
    async (_addresses) => {
      if (_addresses.length > 0) {
        console.log(_addresses, 'new address')
        logInfo('Handling Connect')
        const sameWalletClient = addresses.filter((wallet) => wallet.type === _addresses[0].type)
        const otherWalletClients =
          addresses.filter((wallet) => wallet.type !== _addresses[0].type) || []

        const accounts = await http.indexer.fetchAccounts(_addresses)
        const mergedPrivateAddresses = _mergeAddresses(_addresses, accounts)
        console.log(accounts, mergedPrivateAddresses, 'alls direasses')
        // Get data to populate
        // Merge to existing data
        // Update local storage
        // Update addresses list
        if (sameWalletClient.length > _addresses.length) {
          // disconnect even occured for atleast one address
          console.log(
            _mergeAddresses(otherWalletClients, mergedPrivateAddresses),
            'furst kubj nerged'
          )
          setAddresses(_mergeAddresses(otherWalletClients, mergedPrivateAddresses))
          localStorage.setItem(
            'addresses',
            JSON.stringify(_mergeAddresses(otherWalletClients, mergedPrivateAddresses))
          )
          const _allAddresses = _mergeAddresses(otherWalletClients, mergedPrivateAddresses)
          if (_allAddresses.length > 0) {
            setAlgodexWallet(_allAddresses[0])
          }
        } else {
          const allAddresses = _mergeAddresses(addresses, _mergeAddresses(_addresses, accounts))
          const _otherAddresses = JSON.parse(localStorage.getItem('addresses'))
          // const _allAddresses = _mergeAddresses(_otherAddresses || [], allAddresses)
          const _allAddresses = _mergeAddresses(_otherAddresses || [], allAddresses).map(
            (wallet) => {
              if (wallet.type === 'wallet-connect') {
                console.log(wallet, _addresses, 'wallet connect ooo')
                return {
                  ...wallet,
                  connector: peraWalletConnector.connector
                  // connector: {
                  //   // peraWalletConnector.connector
                  //   ...wallet.connector,
                  //   accounts: wallet.connector._accounts,
                  //   connected: wallet.connector._connected,
                  //   _connected: wallet.connector._connected
                  // }
                }
              }
              return wallet
            }
          )
          // if (_allAddresses.length > 0) {
          const _activeWallet = filterConnectedWallet(_allAddresses)
          setAlgodexWallet(_activeWallet)
          // }
          console.log(
            _mergeAddresses(otherWalletClients, mergedPrivateAddresses),
            _allAddresses,
            'second slintt kubj nerged'
          )
          setAddresses(_allAddresses)
          localStorage.setItem('addresses', JSON.stringify(_allAddresses))
          // if (_allAddresses.length > 0) {
          // const _activeWallet = filterConnectedWallet(_allAddresses)
          // setAlgodexWallet(_activeWallet)
          // }
        }
        dispatcher('signIn', { type: 'wallet' })
      }
    },
    [setAddresses]
  )

  // Handle any Disconnect
  const handleDisconnect = useCallback(
    (_addresses) => {
      const locStorageAddr = JSON.parse(localStorage.getItem('addresses'))
      const addressesList = locStorageAddr.length > 0 ? locStorageAddr : addresses || []
      console.log(addressesList, _addresses, 'addressesList')
      const remainingAddresses =
        addressesList.filter((wallet) => {
          console.log(wallet, 'wallet outside')
          if (_addresses && _addresses[0]) {
            console.log(
              wallet.address,
              _addresses[0],
              wallet.address !== _addresses[0],
              'wallet inside'
            )
            // if (wallet.address !== _addresses[0]) {
            //   return wallet
            // }
            return wallet.address !== _addresses[0]
          }
        }) || []
      let _remainingAddresses = [...remainingAddresses]
      console.log(_remainingAddresses, remainingAddresses, '_remainingAddresses')
      if (_remainingAddresses.length > 0) {
        _remainingAddresses = _remainingAddresses.map((wallet) => {
          console.log(wallet, peraWalletConnector, 'wallet ooo hsdfsse')
          if (wallet.type === 'wallet-connect') {
            return {
              ...wallet,
              connector: peraWalletConnector.connector

              // connector: {
              //   ...peraWalletConnector.connector,
              //   ...wallet.connector,
              //   _accounts: wallet.connector._accounts,
              //   _connected: wallet.connector._connected,
              //   connected: wallet.connector._connected
              // }
            }
          }
          return wallet
        })
        console.log(_remainingAddresses[0], 'okay thak you ooo')
        setAlgodexWallet(_remainingAddresses[0])
      } else {
        const _wallet = addressesList[0]
        console.log(
          wallet,
          _wallet,
          addressesList,
          _remainingAddresses,
          'wallet udpate oo',
          'disconnectedActiveWallet sdfs'
        )
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
          console.log(disconnectedActiveWallet, 'disconnectedActiveWallet sdfs')
          setAlgodexWallet(disconnectedActiveWallet)
        } else {
          let disconnectedActiveWallet = {}
          disconnectedActiveWallet = {
            ..._wallet,
            connector: {
              ..._wallet.connector,
              connected: false
            }
          }
          console.log(_wallet, wallet, 'wallet is undefined sdfs')
          setAlgodexWallet(disconnectedActiveWallet)
        }
        // if (typeof wallet !== 'undefined') {
        // let disconnectedActiveWallet = {}
        // if (wallet.type === 'wallet-connect') {
        //   disconnectedActiveWallet = {
        //     ..._wallet,
        //     connector: null
        //   }
        // } else {
        //   disconnectedActiveWallet = {
        //     ..._wallet,
        //     connector: null
        //   }
        // }
        // console.log(disconnectedActiveWallet, 'new to discover sdfs')
        // setAlgodexWallet(disconnectedActiveWallet)
        // } else {
        //   console.log(wallet, 'unndefied wallet')
        //   // setAlgodexWallet()
        // }
      }

      logInfo(
        `Disconnected Successfully with : ${_addresses} removed and ${_remainingAddresses.length} remaining`
      )
      console.log(_remainingAddresses, 'again end')
      localStorage.setItem('addresses', JSON.stringify(_remainingAddresses))
      setAddresses(_remainingAddresses)
      dispatcher('signOut', { type: 'wallet' })
      console.error('Handle removing from storage', _addresses)
    },
    [setAddresses]
  )

  const sessionUpdate = useCallback(
    (addresses) => {
      // const _updatedAddresses = addresses.map((wallet) => {
      //   return {
      //     ...wallet,
      //     connector: {
      //       connected: true
      //     }
      //   }
      // })
      console.log('addresses after session update', addresses)
    },
    [setAddresses]
  )

  // My Algo Connect/Disconnect
  const { connect: myAlgoConnect, disconnect: myAlgoDisconnect } = useMyAlgoConnect(
    handleConnect,
    handleDisconnect
  )
  // My Algo/Disconnect
  const {
    connect: peraConnect,
    disconnect: peraDisconnect,
    connector: _peraConnector
  } = useWalletConnect(handleConnect, handleDisconnect, sessionUpdate)
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
