import { PeraWalletConnect } from '@perawallet/connect'
import { useEffect } from 'react'

const peraWallet = new PeraWalletConnect()

export default function usePeraConnection(onConnect, onDisconnect, sessionUpdate) {
  useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        peraWallet.connector.on('disconnect', handleDisconnectWalletClick)
        if (accounts.length) {
          const _addresses = accounts.map((acct) => {
            const _account = {
              type: 'wallet-connect',
              address: acct,
              connector: peraWallet.connector
            }
            return _account
          })
          sessionUpdate(_addresses)
        }
      })
      .catch((e) => {
        console.log(e, 'Session expired')
      })
  }, [])

  function handleConnectWalletClick() {
    peraWallet
      .connect()
      .then((newAccounts) => {
        peraWallet.connector.on('disconnect', handleDisconnectWalletClick)

        const _addresses = newAccounts.map((acct) => {
          const _account = {
            type: 'wallet-connect',
            address: acct,
            connector: peraWallet.connector
          }
          _account.connector.connected = true
          return _account
        })
        onConnect(_addresses)
      })
      .catch((error) => {
        if (error?.data?.type !== 'CONNECT_MODAL_CLOSED') {
          console.log(error)
        }
      })
  }

  function handleDisconnectWalletClick() {
    peraWallet.disconnect()
    // Fetch Address to disconnect
    const locStorageAddr = localStorage.getItem('addresses')
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
