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
import { WalletReducerContext } from './WalletsReducerProvider'

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
function useWallets(initialState, closeDropdown) {
  const dispatcher = useEventDispatch()
  const context = useContext(WalletsContext)
  if (context === undefined) {
    throw new Error('Must be inside of a Wallets Provider')
  }
  const [wallet, setWallet] = useState(initialState)
  const { setPeraWallet, setActiveWallet, setAddressesNew, disconnectWallet, myAlgoAddresses } =
    useContext(WalletReducerContext)

  // const [activeWallet, setActiveWallet] = useState()
  const [addresses, setAddresses] = context
  const { http, wallet: _wallet, setWallet: setAlgodexWallet } = useAlgodex()
  // console.log(wallet, context, 'wallet here')

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

  useEffect(() => {
    if (addresses.length > 0) {
      let _activeWallet = { ...addresses[0] }
      if (typeof wallet === 'undefined') {
        // setAlgodexWallet(addresses[0])
        if (_activeWallet.type === 'wallet-connect') {
          _activeWallet.connector = context[2].current
          setAlgodexWallet(_activeWallet)
          // setWallet(_activeWallet)
        } else {
          setAlgodexWallet(_activeWallet)
          // setWallet(_activeWallet)
        }
      }
    }
  }, [addresses])

  // TODO: Account Info Query
  // Handle any Connection
  const handleConnect = async (_addresses) => {
    if (_addresses.length > 0) {
      logInfo('Handling Connect')

      const accounts = await http.indexer.fetchAccounts(_addresses)
      const mergedPrivateAddresses = _mergeAddresses(_addresses, accounts)
      setPeraWallet(mergedPrivateAddresses[0])
      setAddressesNew({ type: 'peraWallet', addresses: mergedPrivateAddresses })
      setActiveWallet(mergedPrivateAddresses[0])
      closeDropdown()
    }
  }

  // Handle any Disconnect
  const handleDisconnect = (_addresses) => {
    console.log(_addresses)

    if (_addresses[0]?.type === 'wallet-connect') {
      disconnectWallet({ type: 'peraWallet', address: _addresses[0] })
      setAddressesNew({ type: 'peraWallet', addresses: [] })
    }

    if (_addresses[0].type === 'my-algo-wallet') {
      disconnectWallet({ type: 'myAlgo', address: _addresses[0] })
      //myAlgoAddresses has state before wallet disconnected
      const _remainingAddresses = myAlgoAddresses.filter((wallet) => {
        return wallet.address !== _addresses[0].address
      })

      setAddressesNew({ type: 'myAlgo', addresses: _remainingAddresses })
    }

    logInfo(`Disconnected Successfully with : ${_addresses}`)
    // console.log(_remainingAddresses, 'again end')
    // localStorage.setItem('addresses', JSON.stringify(_remainingAddresses))
    // setAddresses(_remainingAddresses)
    // console.error('Handle removing from storage', _addresses)
  }

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
  // useEffect(() => {
  //   const res = localStorage.getItem('activeWallet')
  //   if (res && res !== activeWallet) {
  //     setActiveWallet(localStorage.getItem('activeWallet'))
  //   }
  // }, [setActiveWallet])

  // Fetch all wallet addresses from local storage
  useEffect(() => {
    const res = localStorage.getItem('addresses')
    if (res) {
      const _addresses = _mergeAddresses(JSON.parse(localStorage.getItem('addresses')), addresses)
      if (initialState) {
        setAlgodexWallet(initialState)
      }
      setAddresses(_addresses)
    }
  }, [])
  //
  // useEffect(() => {
  //   localStorage.setItem('addresses', JSON.stringify(addresses))
  // }, [addresses])

  return {
    wallet: _wallet,
    setWallet: setAlgodexWallet,
    addresses,
    myAlgoConnect,
    peraConnect,
    peraDisconnect,
    myAlgoDisconnect,
    myAlgoConnector,
    peraConnector: _peraConnector
  }
}

export default useWallets
