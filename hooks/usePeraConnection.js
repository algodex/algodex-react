import { PeraWalletConnect } from '@perawallet/connect'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

const peraWallet = new PeraWalletConnect()

export default function usePeraConnection(onConnect, onDisconnect, sessionUpdate) {
  useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        peraWallet.connector.on('disconnect', handleDisconnectWalletClick)
        console.log(accounts, 'accounts')
        // sessionUpdate(sessionUpdate)
        if (accounts.length) {
          const _addresses = accounts.map((acct) => {
            const _account = {
              type: 'wallet-connect',
              address: acct,
              connector: peraWallet.connector
            }
            return _account
          })
          console.log(_addresses, 'nside pera connectonn')
          // onConnect(_addresses)
          sessionUpdate(_addresses)
        }
      })
      .catch((e) => {
        console.log(e, 'Session expired')
        // setHasError(true)
        // toast.error(e)
      })
  }, [])

  function handleConnectWalletClick() {
    peraWallet
      .connect()
      .then((newAccounts) => {
        // peraWallet.connector.on('disconnect', handleDisconnectWalletClick)

        const _addresses = newAccounts.map((acct) => {
          const _account = {
            type: 'wallet-connect',
            address: acct,
            connector: peraWallet.connector
          }
          _account.connector.connected = true
          return _account
        })
        // setHasError(false)
        onConnect(_addresses)
      })
      .catch((error) => {
        if (error?.data?.type !== 'CONNECT_MODAL_CLOSED') {
          console.log(error)
          // setHasError(true)
          // toast.error(error)
        }
      })
  }

  function handleDisconnectWalletClick() {
    peraWallet.disconnect()
    // Fetch Address to disconnect
    const locStorageAddr = localStorage.getItem('addresses')
    console.log(locStorageAddr, 'locStorageAddr')
    if (locStorageAddr) {
      const _formattedAddr = JSON.parse(locStorageAddr)
      const _peraAddr = _formattedAddr.filter((addr) => addr.type === 'wallet-connect')
      _peraAddr.length && onDisconnect([_peraAddr[0]?.address])
    }
  }

  return {
    connect: handleConnectWalletClick,
    disconnect: handleDisconnectWalletClick,
    peraWalletConnector: peraWallet
  }
}
