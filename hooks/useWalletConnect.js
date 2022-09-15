import { useCallback, useContext, useEffect, useRef } from 'react'

import QRCodeModal from 'algorand-walletconnect-qrcode-modal'
import { WalletsContext } from './useWallets'
import { logInfo } from 'services/logRemote'

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
  // const [addresses, setAddresses] = useState([]);
  /**
   * Instance reference
   */
  const walletConnect = useRef()
  const connect = async () => {
    console.log('Connecting')
    try {
      // Something went wrong!
      // if (!walletConnect.current) {
      //   console.error(ERROR.FAILED_TO_INIT)
      //   return
      // }

      // if (!walletConnect.current.connected && walletConnect.current.sessionStarted) {
      //   console.log('Starting Session again', walletConnect)
      //   walletConnect.current.connected = false
      //   walletConnect.current.sessionStarted = true
      //   walletConnect.current.createSession()
      // } else if (!walletConnect.current.connected) {
      //   console.log('Creating Session', walletConnect)
      //   // create new session
      //   await walletConnect.current.createSession()
      //   walletConnect.current.sessionStarted = true
      // } else {
      //   console.log('Already Connected')
      //   QRCodeModal.close()
      // }

      if (!walletConnect.current) {
        console.error(ERROR.FAILED_TO_INIT)
        return
      }
      // Check if connection is already established
      if (!walletConnect.current.connected) {
        console.log('Creating Session')
        // create new session
        walletConnect.current.createSession()
      } else {
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
  const disconnect = () => {
    if (walletConnect.current.connected) {
      walletConnect.current.killSession()
    }
  }

  const initWalletConnect = async () => {
    try {
      logInfo(`Initializing wallet connect useWalletConnect`)
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
    (err) => {
      console.log('DISCONNECTED')
      if (err) throw err
      logInfo('Disconnnect wallet connect')
      onDisconnect(walletConnect.current['_accounts'])
    },
    [onDisconnect]
  )

  const handleConnected = (err, payload) => {
    console.log('CONNECTED', err)
    if (err) {
      throw err
    }

    let accounts = []

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
    console.log('connected here')
    onConnect(_addresses)
    logInfo('Connect wallet connect')
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
