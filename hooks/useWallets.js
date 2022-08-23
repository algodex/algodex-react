import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import events from '@algodex/algodex-sdk/lib/events'
import { isEqual } from 'lodash/lang'
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
  console.log(`ab`, a, b)
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
  return (
    <WalletsContext.Provider value={[addresses, setAddresses]}>{children}</WalletsContext.Provider>
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

  // TODO: Account Info Query
  // Handle any Connection
  const handleConnect = useCallback(
    async (_addresses) => {
      console.log('Handling Connect')
      if (_addresses.length > 0) {
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
          console.log({
            accounts,
            _addresses,
            addresses,
            mergedPrivateAddresses
            // merge: _mergeAddresses(addresses, _mergeAddresses(_addresses, accounts))
          })
          setAddresses(_mergeAddresses(addresses, _mergeAddresses(_addresses, accounts)))
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
        JSON.parse(localStorage.getItem('addresses')).filter(
          (wallet) => wallet.address !== _addresses[0]
        ) || []
      setAddresses(remainingAddresses)

      if (typeof activeWallet !== 'undefined') {
        const disconnectedActiveWallet = {
          ...activeWallet,
          connector: {
            ...activeWallet.connector,
            connected: false
          }
        }
        setAlgodexWallet(
          remainingAddresses.length > 0 ? remainingAddresses[0] : disconnectedActiveWallet
        )
      }

      localStorage.setItem('addresses', JSON.stringify(remainingAddresses))
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
  const { connect: peraConnect, disconnect: peraDisconnect } = useWalletConnect(
    handleConnect,
    handleDisconnect
  )

  // Fetch active wallet from local storage
  useEffect(() => {
    const res = localStorage.getItem('activeWallet')
    if (res && res !== activeWallet) {
      setActiveWallet(localStorage.getItem('activeWallet'))
    }
  }, [setActiveWallet])

  // Fetch all wallet addresses from local storage
  // useEffect(() => {
  //   const res = localStorage.getItem('addresses')
  //   if (res) {
  //     setAddresses(_mergeAddresses(JSON.parse(localStorage.getItem('addresses')), addresses))
  //   }
  // }, [])
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
