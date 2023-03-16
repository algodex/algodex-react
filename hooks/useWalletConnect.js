/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { useCallback, useEffect, useRef } from 'react'

import QRCodeModal from 'algorand-walletconnect-qrcode-modal'
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
  /**
   * Instance reference
   */
  const walletConnect = useRef()

  let forceOpen

  const getAddress = () => {
    const [account] = walletConnect.current.accounts
    return account
  }
  const handleConnected = async (err, payload) => {
    console.log('CONNECTED', err)
    if (err) {
      throw err
    }

    let accounts = []
    logInfo('Connect wallet connect')
    // Get provided accounts
    if (typeof payload !== 'undefined' && Array.isArray(payload.params)) {
      accounts = payload.params[0].accounts
    } else {
      throw new Error('incorrect payload')
    }

    // Map the connector to the address list
    const _addresses = accounts.map((acct) => ({
      name: 'WalletConnect',
      type: 'wallet-connect-general',
      connector: walletConnect.current,
      address: acct
    }))
    await onConnect(_addresses)

    QRCodeModal.close()
    // return addresses
  }

  const handleDisconnect = async (err, payload) => {
    console.log('DISCONNECTED')
    console.log(payload)
    if (typeof payload !== 'undefined' && Array.isArray(payload.params)) {
      onDisconnect([{ ...payload.params[0].accounts, type: 'wallet-connect-general' }])
    }
    // let accounts = []
    // logInfo('Connect wallet connect')
    // // Get provided accounts
    // if (typeof payload !== 'undefined' && Array.isArray(payload.params)) {
    //   accounts = payload.params[0].accounts
    // } else {
    //   throw new Error('incorrect payload')
    // }
    // if (err) throw err
    // logInfo('Disconnnect wallet connect')
    // const walletAccount =
    //   walletConnect.current._accounts.length > 0
    //     ? walletConnect.current._accounts
    //     : activeWallet?.connector._accounts

    // if (walletConnect.current._accounts) {
    //   await onDisconnect(walletAccount)
    // } else if (activeWallet.connector._accounts) {
    //   await onDisconnect(walletAccount)
    // } else {
    //   logInfo('Nothing to disconnect, returning early')
    //   return
    // }
  }

  let activeWallet = {}

  const disconnect = async (wallet) => {
    onDisconnect([wallet])
    wallet.connector.killSession()
    // if (walletConnect.current.connected) {
    //   await walletConnect.current.killSession()
    //   localStorage.removeItem('walletconnect')
    // } else if (wallet.connector.connected) {
    //   activeWallet = { ...wallet }
    //   console.log(wallet.connector, 'wallet connector')
    //   wallet.connector.killSession()
    //   localStorage.removeItem('walletconnect')
    // } else {
    //   console.error('Wallet was never connected! Remove address and Return')
    //   // await walletConnect.current.killSession()
    //   // wallet.connector.killSession()
    //   await onDisconnect([wallet.address])
    //   return
    // }
  }
  const initWalletConnect = async () => {
    if (!walletConnect === undefined || !walletConnect.current === undefined) {
      logInfo(`Wallet already initialized, returning early from initWalletConnect`)
      return
    }
    try {
      logInfo(`Initializing wallet connect useWalletConnect`)
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
      throw error
    }
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

      walletConnect.current.createSession()

      walletConnect.current.on('connect', handleConnected)
      walletConnect.current.on('session_update', handleConnected)
      walletConnect.current.on('disconnect', handleDisconnect)
      walletConnect.current.on('modal_closed', () => {
        QRCodeModal.close()
      })

      // walletConnect.current.createSession()

      // if (!walletConnect.current.connected && walletConnect.current.sessionStarted) {
      //   walletConnect.current = await initWalletConnect()
      //   walletConnect.current.sessionStarted = true
      //   walletConnect.current.on('connect', handleConnected)
      //   walletConnect.current.on('session_update', handleConnected)
      //   walletConnect.current.on('disconnect', handleDisconnect)
      //   walletConnect.current.on('modal_closed', () => {
      //     QRCodeModal.close()
      //   })
      //   walletConnect.current.createSession()
      // } else if (!walletConnect.current.connected) {
      //   await walletConnect.current.createSession()
      //   walletConnect.current.sessionStarted = true
      //   setForceOpen = true
      //   // startReqAF()
      // } else {
      //   walletConnect.current.killSession()
      //   setTimeout(() => {
      //     walletConnect.current.createSession()
      //   }, 1000)
      // }

      // else {
      //   stopReqAF()
      //   walletConnect.current.killSession()
      //   setTimeout(() => {
      //     walletConnect.current.createSession()
      //   }, 1000)
      // }

      // https://github.com/NoahZinsmeister/web3-react/issues/376
      // if (forceOpen) {
      //   walletConnect.current = await initWalletConnect()
      //   walletConnect.current.createSession()
      //   // Modal has already been opened once, force it to open
      //   walletConnect.current._qrcodeModal.open(
      //     walletConnect.current.uri,
      //     walletConnect.current._qrcodeModalOptions
      //   )
      // } else if (setForceOpen) {
      //   // Modal opened for the first time, force on future attempts
      //   forceOpen = true
      // }

      // const ob = new MutationObserver(([event]) => {
      //   // Check if the wallet connect wrapper was removed
      //   const removed = [...event.removedNodes].find((el) => el.id === 'walletconnect-wrapper')
      //   if (!removed) return
      //   ob.disconnect() // kill observer
      //   return walletConnect.current.connected ? getAddress() : []
      // })
      // ob.observe(document.querySelector('body'), { childList: true })
    } catch (e) {
      console.error(ERROR.FAILED_TO_CONNECT, e)
    }
  }

  useEffect(() => {
    if (walletConnect === undefined || walletConnect.current === undefined) {
      ;(async () => {
        walletConnect.current = await initWalletConnect()
      })()
    }
  }, [])

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
