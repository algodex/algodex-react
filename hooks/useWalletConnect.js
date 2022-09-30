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

  let forceOpen

  const getAddress = () => {
    const [account] = walletConnect.current.accounts
    return account
  }
  const connect = async () => {
    console.log('Connecting')
    let setForceOpen = false
    try {
      // Something went wrong!
      if (!walletConnect.current) {
        console.error(ERROR.FAILED_TO_INIT)
        return
      }

      if (!walletConnect.current.connected && walletConnect.current.sessionStarted) {
        walletConnect.current = await initWalletConnect()
        walletConnect.current.sessionStarted = true
        walletConnect.current.createSession()
      } else if (!walletConnect.current.connected) {
        await walletConnect.current.createSession()
        walletConnect.current.sessionStarted = true
        setForceOpen = true
        // startReqAF()
      } else {
        walletConnect.current.killSession()
        setTimeout(() => {
          walletConnect.current.createSession()
        }, 1000)
      }

      // else {
      //   stopReqAF()
      //   walletConnect.current.killSession()
      //   setTimeout(() => {
      //     walletConnect.current.createSession()
      //   }, 1000)
      // }

      // https://github.com/NoahZinsmeister/web3-react/issues/376
      if (forceOpen) {
        walletConnect.current = await initWalletConnect()
        walletConnect.current.createSession()
        // Modal has already been opened once, force it to open
        walletConnect.current._qrcodeModal.open(
          walletConnect.current.uri,
          walletConnect.current._qrcodeModalOptions
        )
      } else if (setForceOpen) {
        // Modal opened for the first time, force on future attempts
        forceOpen = true
      }

      const ob = new MutationObserver(([event]) => {
        // Check if the wallet connect wrapper was removed
        const removed = [...event.removedNodes].find((el) => el.id === 'walletconnect-wrapper')
        if (!removed) return
        ob.disconnect() // kill observer
        return walletConnect.current.connected ? getAddress() : []
      })
      ob.observe(document.querySelector('body'), { childList: true })
    } catch (e) {
      console.error(ERROR.FAILED_TO_CONNECT, e)
    }
  }

  let activeWallet = {}
  const disconnect = async (wallet) => {
    if (walletConnect.current.connected) {
      await walletConnect.current.killSession()
      localStorage.removeItem('walletconnect')
    } else if (wallet.connector.connected) {
      activeWallet = { ...wallet }
      console.log(wallet, 'wallet connectorr here')
      wallet.connector.killSession()
      localStorage.removeItem('walletconnect')
    } else {
      return
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
      forceOpen = false
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
      })()
    }
  }, [])

  const handleDisconnect = useCallback(
    async (err) => {
      console.log('DISCONNECTED')
      if (err) throw err
      throttleLog('Disconnnect wallet connect')
      const walletAccount =
        walletConnect.current._accounts.length > 0
          ? walletConnect.current._accounts
          : activeWallet?.connector._accounts

      if (walletConnect.current._accounts) {
        await onDisconnect(walletAccount)
      } else if (activeWallet.connector._accounts) {
        await onDisconnect(walletAccount)
      } else {
        return
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
      name: 'WalletConnect',
      type: 'wallet-connect',
      connector: walletConnect.current,
      address: acct
    }))
    onConnect(_addresses)
    QRCodeModal.close()
  }
  useEffect(() => {
    // let listener;
    if (typeof walletConnect.current !== 'undefined') {
      walletConnect.current.on('connect', handleConnected)
      walletConnect.current.on('session_update', handleConnected)
      walletConnect.current.on('disconnect', handleDisconnect)
      walletConnect.current.on('modal_closed', () => {
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
