import { isBrowser, isMobile } from '@walletconnect/utils'
import { useCallback, useEffect, useRef } from 'react'

import QRCodeModal from 'algorand-walletconnect-qrcode-modal'
import finishedSound from '/public/finished'
import { throttleLog } from 'services/logRemote'
import waitSound from '/public/lowtone'

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

  // fix for wallectconnect websocket issue when backgrounded on mobile (uses request animation frame)
  let wcReqAF = 0
  let wcS
  let wcSDone

  let waitSound
  let finishedSound
  let intervalId
  const connect = async () => {
    console.log('Connecting')
    try {
      // Something went wrong!
      if (!walletConnect.current) {
        console.error(ERROR.FAILED_TO_INIT)
        return
      }

      if (!walletConnect.current.connected && walletConnect.current.sessionStarted) {
        console.log('Reinitializing wallet session again', walletConnect)
        throttleLog('Reinitializing wallet session again', walletConnect)
        // walletConnect.current = await initWalletConnect()
        // walletConnect.current.connected = false
        walletConnect.current.sessionStarted = true
        walletConnect.current.createSession()
        startReqAF()
      } else if (!walletConnect.current.connected) {
        console.log('Creating Session', walletConnect)
        throttleLog('Creating Session', walletConnect)
        // create new session
        walletConnect.current.sessionStarted = true
        // walletConnect.current.connected = false
        await walletConnect.current.createSession()
        // setInterva(async () => {
        //   console.log
        // }, 5000)
        // await walletConnect.current.createSession()
        startReqAF()
      } else {
        // console.log('Already Connected')
        // throttleLog('Already Connected')
        // QRCodeModal.close()
        // walletConnect.current.killSession()
        // setTimeout(() => {
        //   walletConnect.current.createSession()
        // }, 1000)
        stopReqAF()
        walletConnect.current.killSession()
        setTimeout(() => {
          walletConnect.current.createSession()
        }, 1000)

        // CANCEL wcReqAF to free up CPU
        stopReqAF() // if ticking...
      }

      // Check if connection is already established
      // if (!walletConnect.current.connected) {
      //   console.log('Creating Session')
      //   // create new session
      //   walletConnect.current.createSession()
      //   startReqAF()
      // } else {
      //   stopReqAF()
      //   walletConnect.current.killSession()
      //   setTimeout(() => {
      //     walletConnect.current.createSession()
      //   }, 1000)
      // }

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
  const startReqAF = () => {
    // throttleLog('Keep wallet connection alive')
    // // console.log('startReqAF');
    // // keeps some background tasks running while navigating to Pera Wallet to approve wc session link handshake
    // if (isBrowser() && isMobile()) {
    //   throttleLog('Start action to Keep wallet connection alive')
    //   if (!intervalId) {
    //     intervalId = setInterval(() => {
    //       console.log('keep alive')
    //     }, 2000)
    //   }
    //   const keepAlive = () => {
    //     // throttleLog('Keep alive function')
    //     wcReqAF = requestAnimationFrame(keepAlive)
    //   }
    //   requestAnimationFrame(keepAlive)
    // }
    if (isBrowser()) {
      // if (isBrowser() && isMobile()) {
      // reqaf fix
      const keepAlive = () => {
        // console.log('keepAlive');
        const qrIsOpen = document.querySelector('#walletconnect-qrcode-modal')
        if (!qrIsOpen) {
          this.stopReqAF()
          return
        }
        wcReqAF = requestAnimationFrame(keepAlive)
      }
      requestAnimationFrame(keepAlive)
      // wcReqAF = 1;
      // audio fix
      wcS = new Audio()
      wcS.src = waitSound // the base64 string of the sound
      wcS.autoplay = true
      wcS.volume = 0.6
      wcS.loop = true
      wcS.play()
      wcSDone = new Audio()
      wcSDone.src = finishedSound // the base64 string of the sound
      wcSDone.volume = 0.1
      wcSDone.play()
      wcSDone.pause()
    }
  }

  const stopReqAF = (playSound) => {
    // CANCEL wcReqAF to free up CPU
    // throttleLog('Close live connection')
    // if (wcReqAF) {
    //   // clearInterval(intervalId)
    //   // intervalId = null
    //   cancelAnimationFrame(wcReqAF)
    //   wcReqAF = 0 // reset
    // } else {
    //   console.log('no wcReqAF to cancel') // is this the browser?
    // }
    // console.log('stopReqAF', wcReqAF);
    // CANCEL wcReqAF to free up CPU
    if (wcReqAF) {
      cancelAnimationFrame(wcReqAF)
      wcReqAF = 0 // reset
      // TODO make audio end gracefully + upon return to dapp
      // audio fix
      wcS.pause()
      if (playSound) {
        wcSDone.play()
      }
    } else {
      console.log('no wcReqAF to cancel') // is this the browser?
    }
  }

  const disconnect = () => {
    if (walletConnect.current.connected) {
      walletConnect.current.killSession()
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
    (err) => {
      console.log('DISCONNECTED')
      if (err) throw err
      throttleLog('Disconnnect wallet connect')
      onDisconnect(walletConnect.current['_accounts'])
      // CANCEL wcReqAF to free up CPU
      stopReqAF() // if ticking...
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
    console.log('connected here')
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
