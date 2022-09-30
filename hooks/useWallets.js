import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import events from '@algodex/algodex-sdk/lib/events'
import { isEqual } from 'lodash/lang'
// import signer from '@algodex/algodex-sdk/lib/wallet/signers/MyAlgoConnect'
import { logInfo } from 'services/logRemote'
import { useAlgodex } from '@algodex/algodex-hooks'
import { useEventDispatch } from './useEvents'
import useMyAlgoConnect from './useMyAlgoConnect'
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
  const context = useContext(WalletsContext)
  if (context === undefined) {
    throw new Error('Must be inside of a Wallets Provider')
  }
  const [wallet, setWallet] = useState(initialState)
  const [activeWallet, setActiveWallet] = useState()
  const [addresses, setAddresses] = context
  const { http, setWallet: setAlgodexWallet } = useAlgodex()

  const onEvents = useCallback(
    (props) => {
      const { type, wallet: _wallet } = props
      if (type === 'change' && !isEqual(wallet, _wallet)) {
        setWallet(_wallet)
        setActiveWallet(_wallet.address)
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

  // useEffect(() => {
  //   if (context[0]?.length) {
  //     const reConnectMyAlgoWallet = async () => {
  //       // '@randlabs/myalgo-connect' is imported dynamically
  //       // because it uses the window object
  //       const myAlgoConnector = {}
  //       const MyAlgoConnect = (await import('@randlabs/myalgo-connect')).default
  //       MyAlgoConnect.prototype.sign = signer
  //       myAlgoConnector.current = new MyAlgoConnect()
  //       myAlgoConnector.current.connected = true
  //       const mappedAddresses = context[0].map((addr) => {
  //         if (addr.type === 'my-algo-wallet') {
  //           return {
  //             ...addr,
  //             connector: myAlgoConnector.current
  //           }
  //         } else {
  //           return {
  //             ...addr,
  //             connector: context[2]
  //           }
  //         }
  //       })
  //       localStorage.setItem('addresses', JSON.stringify(_mergeAddresses(mappedAddresses, [])))
  //     }
  //     reConnectMyAlgoWallet()
  //   }
  // }, [context])

  useEffect(() => {
    if (addresses.length > 0) {
      let _activeWallet = { ...addresses[0] }
      if (typeof wallet === 'undefined') {
        // setAlgodexWallet(addresses[0])
        if (_activeWallet.type === 'wallet-connect') {
          _activeWallet.connector = context[2].current
          setAlgodexWallet(_activeWallet)
          setWallet(_activeWallet)
        } else {
          setAlgodexWallet(_activeWallet)
          setWallet(_activeWallet)
        }
      }
    }
  }, [addresses])

  // TODO: Account Info Query
  // Handle any Connection
  const handleConnect = useCallback(
    async (_addresses) => {
      if (_addresses.length > 0) {
        logInfo('Handling Connect')
        const sameWalletClient = addresses.filter((wallet) => wallet.type === _addresses[0].type)
        const otherWalletClients =
          addresses.filter((wallet) => wallet.type !== _addresses[0].type) || []

        const accounts = await http.indexer.fetchAccounts(_addresses)
        const mergedPrivateAddresses = _mergeAddresses(_addresses, accounts)
        if (sameWalletClient.length > _addresses.length) {
          // disconnect even occured for atleast one address
          setAddresses(_mergeAddresses(otherWalletClients, mergedPrivateAddresses))
          localStorage.setItem(
            'addresses',
            JSON.stringify(_mergeAddresses(otherWalletClients, mergedPrivateAddresses))
          )
        } else {
          const allAddresses = _mergeAddresses(addresses, _mergeAddresses(_addresses, accounts))
          const _otherAddresses = JSON.parse(localStorage.getItem('addresses'))
          const _allAddresses = _mergeAddresses(_otherAddresses || [], allAddresses).map(
            (wallet) => {
              if (wallet.type === 'wallet-connect' && context[2].current.connected) {
                return wallet
              }
              return wallet
            }
          )
          if (_allAddresses.length > 0) {
            setAlgodexWallet(_allAddresses[0])
          }
          setAddresses(_allAddresses)
          localStorage.setItem('addresses', JSON.stringify(_allAddresses))
        }
        dispatcher('signIn', { type: 'wallet' })
      }
    },
    [setAddresses, addresses]
  )

  // Handle any Disconnect
  const handleDisconnect = useCallback(
    (_addresses) => {
      const remainingAddresses =
        JSON.parse(localStorage.getItem('addresses')).filter((wallet) => {
          if (_addresses && _addresses[0]) {
            return wallet.address !== _addresses[0]
          }
        }) || []
      let _remainingAddresses = [...remainingAddresses]
      if (_remainingAddresses.length > 0) {
        _remainingAddresses = _remainingAddresses.map((wallet) => {
          if (wallet.type === 'wallet-connect') {
            return {
              ...wallet,
              connector: {
                ...context[2].current,
                ...wallet.connector,
                _accounts: wallet.connector._accounts,
                _connected: wallet.connector._connected,
                connected: wallet.connector._connected
              }
            }
          }
          return wallet
        })
        setAlgodexWallet(_remainingAddresses[0])
      } else {
        if (typeof wallet !== 'undefined') {
          let disconnectedActiveWallet = {}
          if (wallet.type === 'wallet-connect') {
            disconnectedActiveWallet = {
              ...wallet,
              connector: {
                ...context[2].current,
                _connected: false,
                connected: false
              }
            }
          } else {
            disconnectedActiveWallet = {
              ...wallet,
              connector: {
                ...wallet.connector,
                connected: false
              }
            }
          }
          setAlgodexWallet(disconnectedActiveWallet)
        }
      }
      // if (typeof wallet !== 'undefined') {
      //   let disconnectedActiveWallet = {}
      //   console.log(context[2].current, 'has wallet context[2].current')
      //   if (wallet.type === 'wallet-connect') {
      //     disconnectedActiveWallet = {
      //       ...wallet,
      //       connector: {
      //         ...context[2].current,
      //         _connected: false,
      //         connected: false
      //       }
      //     }
      //   } else {
      //     disconnectedActiveWallet = {
      //       ...wallet,
      //       connector: {
      //         ...wallet.connector,
      //         connected: false
      //       }
      //     }
      //   }
      //   setAlgodexWallet(
      //     _remainingAddresses.length > 0 ? _remainingAddresses[0] : disconnectedActiveWallet
      //   )
      // }

      // if (_remainingAddresses.length === 0) {
      //   dispatcher('signOut', {
      //     type: 'wallet'
      //   })
      // }
      // dispatcher('signOut', { type: 'wallet' })
      logInfo(
        `Disconnected Successfully with : ${_addresses} removed and ${_remainingAddresses.length} remaining`
      )
      localStorage.setItem('addresses', JSON.stringify(_remainingAddresses))
      setAddresses(_remainingAddresses)
      console.error('Handle removing from storage', _addresses)
    },
    [setAddresses, addresses]
  )

  // My Algo Connect/Disconnect
  const {
    connector: myAlgoConnector,
    connect: myAlgoConnect,
    disconnect: myAlgoDisconnect
  } = useMyAlgoConnect(handleConnect, handleDisconnect)
  // Pera Connect/Disconnect
  const {
    connect: peraConnect,
    disconnect: peraDisconnect,
    connector: _peraConnector
  } = useWalletConnect(handleConnect, handleDisconnect)

  // Fetch active wallet from local storage
  useEffect(() => {
    const res = localStorage.getItem('activeWallet')
    if (res && res !== activeWallet) {
      setActiveWallet(localStorage.getItem('activeWallet'))
    }
  }, [setActiveWallet])

  // Fetch all wallet addresses from local storage
  useEffect(() => {
    const res = localStorage.getItem('addresses')
    if (res) {
      const _addresses = _mergeAddresses(JSON.parse(localStorage.getItem('addresses')), addresses)
      if (initialState) {
        setAlgodexWallet(initialState)
        setWallet(initialState)
      }
      setAddresses(_addresses)
    }
  }, [])
  //
  // useEffect(() => {
  //   localStorage.setItem('addresses', JSON.stringify(addresses))
  // }, [addresses])

  return {
    wallet,
    setWallet,
    addresses,
    myAlgoConnect,
    peraConnect,
    peraDisconnect,
    myAlgoDisconnect,
    myAlgoConnector
  }
}

export default useWallets
