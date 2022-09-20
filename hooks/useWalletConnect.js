import { useCallback, useEffect, useRef } from 'react'

import QRCodeModal from 'algorand-walletconnect-qrcode-modal'
import { throttleLog } from 'services/logRemote'

const ERROR = {
  FAILED_TO_INIT: 'Wallet connect failed to initialize.',
  FAILED_TO_CONNECT: 'Wallet connect failed to connect.'
}

/**
 * Use Wallet Connect query
 * @param {Function} onConnect On Connect Callback
 * @param {Function} onDisconnect On Disconnect Callback
 * @return {object}
 */
export default function useWalletConnect(onConnect, onDisconnect) {
  /**
   * Instance reference
   */
  const walletConnect = useRef()
  // fix for wallectconnect websocket issue when backgrounded on mobile (uses request animation frame)
  const connect = async () => {
    console.log('Connecting')
    try {
      // Something went wrong!
      if (!walletConnect.current) {
        console.error(ERROR.FAILED_TO_INIT)
        return
      }

      if (!walletConnect.current.connected && walletConnect.current.sessionStarted) {
        // throttleLog('Reinitializing wallet session again', walletConnect)
        console.log('Reinitializing wallet session again', walletConnect)
        walletConnect.current = await initWalletConnect()
        walletConnect.current.createSession()
      } else if (!walletConnect.current.connected) {
        // create new session
        console.log('Creating Session', walletConnect)
        walletConnect.current.sessionStarted = true
        await walletConnect.current.createSession()
      } else {
        console.log('Already Connected')
        walletConnect.current.killSession()
        setTimeout(() => {
          walletConnect.current.createSession()
        }, 1000)
      }

      // Map the connector to the address list
      const _addresses = walletConnect.current.accounts.map((acct) => {
        console.log(acct)
        return {
          name: 'WalletConnect',
          address: acct,
          type: 'wallet-connect',
          connector: walletConnect.current
        }
      })
      // setAddresses(_addresses);
      onConnect(_addresses)
    } catch (e) {
      console.error(ERROR.FAILED_TO_CONNECT, e)
    }
  }

  const disconnect = async (wallet) => {
    console.log(walletConnect.current, wallet, 'asdfasdfasdfsss')
    if (walletConnect.current.connected) {
      await walletConnect.current.killSession()
      // localStorage.removeItem('walletconnect')
    }
  }

  const initWalletConnect = async () => {
    if (!walletConnect === undefined || !walletConnect.current === undefined) {
      throttleLog(`Wallet already initialized, returning early from initWalletConnect`)
      return
    }
    try {
      throttleLog(`Initializing wallet connect useWalletConnect`)
      const WalletConnect = (await import('@walletconnect/client')).default
      WalletConnect.prototype.sign = (
        await import('@algodex/algodex-sdk/lib/wallet/signers/WalletConnect')
      ).default
      return new WalletConnect({
        bridge: 'https://bridge.walletconnect.org', // Required
        qrcodeModal: QRCodeModal
      })
    } catch (error) {
      console.log(error, 'error occured')
    }
  }

  useEffect(() => {
    if (walletConnect === undefined || walletConnect.current === undefined) {
      ;(async () => {
        walletConnect.current = await initWalletConnect()
        walletConnect.current.connected = false
      })()
    }
  }, [])

  const handleDisconnect = useCallback(
    async (err) => {
      console.log('DISCONNECTED')
      if (err) throw err
      throttleLog('Disconnnect wallet connect')
      const walletAccount = walletConnect?.current?._accounts
      if (walletConnect?.current?._accounts) {
        await onDisconnect(walletAccount)
      }
    },
    [onDisconnect]
  )

  const handleConnected = (err, payload) => {
    console.log('CONNECTED', err)
    if (err) {
      throw err
    }

    let accounts = []
    throttleLog('Connect wallet connect')
    // Get provided accounts
    if (typeof payload !== 'undefined' && Array.isArray(payload.params)) {
      accounts = payload.params[0].accounts
    }

    // Map the connector to the address list
    const _addresses = accounts.map((acct) => ({
      type: 'wallet-connect',
      connector: walletConnect.current,
      address: acct
    }))
    console.log(walletConnect, 'connected here')
    onConnect(_addresses)
    // dispatcher('signIn', { type: 'wallet' })
    QRCodeModal.close()
  }
  useEffect(() => {
    // let listener;
    if (typeof walletConnect.current !== 'undefined') {
      walletConnect.current.on('connect', handleConnected)
      walletConnect.current.on('session_update', handleConnected)
      walletConnect.current.on('disconnect', handleDisconnect)
      walletConnect.current.on('modal_closed', () => {
        console.log('Close modal here')
        QRCodeModal.close()
      })
    }
    return () => {
      if (typeof walletConnect.current !== 'undefined') {
        walletConnect.current.off('connect')
        walletConnect.current.off('session_update')
        walletConnect.current.off('disconnect')
        walletConnect.current.off('modal_closed')
      }
    }
  }, [walletConnect.current])
  return { connect, disconnect, connector: walletConnect }
}
