import { useContext, useEffect } from 'react'

// import signer from '@algodex/algodex-sdk/lib/wallet/signers/MyAlgoConnect'
import { logInfo } from 'services/logRemote'
import { useAlgodex } from '@/hooks'
import useMyAlgoConnect from './useMyAlgoConnect'
import usePeraConnection from './usePeraConnection'
import useWalletConnect from './useWalletConnect'
import { WalletReducerContext } from './WalletsReducerProvider'
import useAccountInfo from './useAccountInfo'

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
/**
 * Use Wallets Hooks
 * @param {Object} initialState Wallet Initial State
 * @return {*}
 */
/**
 * Use Wallets Hooks
 * @param {Object} initialState Wallet Initial State
 * @return {*}
 */
function useWallets(closeDropdown) {
  const {
    setPeraWallet,
    setWalletConnect,
    setActiveWallet,
    setAddressesNew,
    disconnectWallet,
    myAlgoAddresses,
    activeWallet
  } = useContext(WalletReducerContext)

  const { http, wallet: _wallet } = useAlgodex()

  // TODO: Account Info Query
  // Handle any Connection
  const handleConnect = async (_addresses) => {
    //Handle Connect is only used for pera wallet and walletConnect, for myAlgo we deal with the connection in walletDropdown/index
    if (_addresses.length > 0) {
      logInfo('Handling Connect')

      if (_addresses[0]?.type === 'wallet-connect') {
        const accounts = await http.indexer.fetchAccounts(_addresses)
        const mergedPrivateAddresses = _mergeAddresses(_addresses, accounts)
        setPeraWallet(mergedPrivateAddresses[0])
        setAddressesNew({ type: 'peraWallet', addresses: mergedPrivateAddresses })
        setActiveWallet(mergedPrivateAddresses[0])
      }

      if (_addresses[0]?.type === 'wallet-connect-general') {
        const accounts = await http.indexer.fetchAccounts(_addresses)
        const mergedPrivateAddresses = _mergeAddresses(_addresses, accounts)
        setWalletConnect(mergedPrivateAddresses[0])
        setAddressesNew({ type: 'walletConnect', addresses: mergedPrivateAddresses })
        setActiveWallet(mergedPrivateAddresses[0])
      }

      if (typeof closeDropdown === 'function') closeDropdown()
    }
  }

  // Handle any Disconnect
  const handleDisconnect = (_addresses) => {
    console.log(_addresses)

    if (_addresses[0]?.type === 'wallet-connect') {
      disconnectWallet({ type: 'peraWallet', address: _addresses[0] })
      setAddressesNew({ type: 'peraWallet', addresses: [] })
    }

    if (_addresses[0]?.type === 'wallet-connect-general') {
      disconnectWallet({ type: 'walletConnect', address: _addresses[0] })
      setAddressesNew({ type: 'walletConnect', addresses: [] })
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
  } = usePeraConnection(handleConnect, handleDisconnect)

  const {
    connect: walletconnectConnect,
    disconnect: walletconnectDisconnect,
    connector: walletconnectConnector
  } = useWalletConnect(handleConnect, handleDisconnect)

  const walletQuery = useAccountInfo(activeWallet)

  useEffect(() => {
    if (activeWallet && walletQuery.data) {
      console.log(activeWallet)
      setActiveWallet({ ...activeWallet, ...walletQuery.data })
    }
  }, [walletQuery.data])

  return {
    myAlgoConnect,
    peraConnect,
    peraDisconnect,
    myAlgoDisconnect,
    myAlgoConnector,
    peraConnector: _peraConnector,
    walletconnectConnect,
    walletconnectDisconnect,
    walletconnectConnector
  }
}

export default useWallets
