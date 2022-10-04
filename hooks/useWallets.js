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

  // Fetch all wallet addresses from local storage
  useEffect(() => {
    const res = localStorage.getItem('addresses')
    if (res) {
      const _addresses = _mergeAddresses(JSON.parse(localStorage.getItem('addresses')), addresses)
      if (initialState !== undefined) {
        console.log(initialState, 'iitialState')
        // setAlgodexWallet(initialState)
      }
      console.log(_addresses, 'console.log(res)')
      // setAlgodexWallet(_addresses[0])
      // setAddresses(_addresses)
    }
  }, [])

  /**
   * Get Hydrated Addresses
   * Ensures addresses are properly Hydrated at all times
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
          setAlgodexWallet(mappedAddresses[0])
        }
        // setAddresses(mappedAddresses)
      }
      _reHydratedWallet()
    }
    //  else {
    //   localStorage.setItem('addresses', JSON.stringify([]))
    //   setAddresses([])
    // }
  }, [addresses, peraWalletConnector])

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

  // useEffect(() => {
  //   if (addresses.length > 0) {
  //     let _activeWallet = { ...addresses[0] }

  //     const _reHydratedWallet = async () => {
  //       const myAlgoConnector = {}
  //       const MyAlgoConnect = (await import('@randlabs/myalgo-connect')).default
  //       MyAlgoConnect.prototype.sign = signer
  //       myAlgoConnector.current = new MyAlgoConnect()
  //       myAlgoConnector.current.connected = true
  //       const mappedAddresses = [_activeWallet].map((addr) => {
  //         if (addr.type === 'my-algo-wallet') {
  //           return {
  //             ...addr,
  //             connector: myAlgoConnector.current
  //           }
  //         }
  //         if (addr.type === 'wallet-connect') {
  //           return {
  //             ...addr,
  //             connector: {
  //               accounts: addr.connector._accounts,
  //               connected: addr.connector._connected,
  //               _connected: addr.connector._connected
  //             }
  //           }
  //           // return {
  //           //   ...addr,
  //           //   connector: peraWalletConnector.connector
  //           // }
  //         }
  //       })

  //       if (typeof wallet === 'undefined') {
  //         setAlgodexWallet(mappedAddresses[0])
  //         // setAlgodexWallet(mappedAddresses[0])
  //         // if (
  //         //   _activeWallet.type === 'wallet-connect'
  //         // ) {
  //         //   setAlgodexWallet(mappedAddresses[0])
  //         // }
  //         // if (
  //         //   _activeWallet.type === 'my-algo-wallet' &&
  //         //   _activeWallet?.connector?.connected === false
  //         // ) {
  //         //   setAlgodexWallet(mappedAddresses[0])
  //         // }
  //       }
  //     }
  //     _reHydratedWallet()
  //   }
  // }, [addresses])

  // TODO: Account Info Query
  // Handle any Connection
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
                  connector: {
                    // peraWalletConnector.connector
                    ...wallet.connector,
                    accounts: wallet.connector._accounts,
                    connected: wallet.connector._connected,
                    _connected: wallet.connector._connected
                  }
                }
              }
              return wallet
            }
          )
          // if (_allAddresses.length > 0) {
          setAlgodexWallet(_allAddresses[0])
          // }
          console.log(
            _mergeAddresses(otherWalletClients, mergedPrivateAddresses),
            _allAddresses,
            'second slintt kubj nerged'
          )
          setAddresses(_allAddresses)
          localStorage.setItem('addresses', JSON.stringify(_allAddresses))
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
    peraConnector: _peraConnector
  }
}

export default useWallets
