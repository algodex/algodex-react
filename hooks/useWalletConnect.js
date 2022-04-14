import { useCallback, useEffect, useRef } from 'react'

import QRCodeModal from 'algorand-walletconnect-qrcode-modal'
import { useAlgodex } from '@algodex/algodex-hooks'

const ERROR = {
  FAILED_TO_INIT: 'MyAlgo Wallet failed to initialize.',
  FAILED_TO_CONNECT: 'MyAlgo Wallet failed to connect.'
}

/**
 * Use Wallet Connect query
 * @return {object}
 */
export function useWalletConnect() {
  /**
   * State Setter
   */
  const { setAddresses, algodex, setWallet } = useAlgodex()

  /**
   * Instance referenc
   */
  const walletConnect = useRef()

  const connect = async () => {
    try {
      // Something went wrong!
      if (!walletConnect.current) {
        console.error(ERROR.FAILED_TO_INIT)
        return
      }

      // Check if connection is already established
      if (!walletConnect.current.connected) {
        // create new session
        walletConnect.current.createSession()
      } else {
        QRCodeModal.close()
      }
      // Map the connector to the address list
      const _addresses = walletConnect.current.accounts.map((acct) => {
        return {
          name: 'WalletConnect',
          address: acct,
          type: 'wallet-connect',
          connector: walletConnect.current
        }
      })
      setAddresses(_addresses, { validate: false, merge: true, throws: false })
      setWallet(_addresses[0], { validate: false, merge: true })
    } catch (e) {
      console.error(ERROR.FAILED_TO_CONNECT, e)
    }
  }
  const disconnect = () => {
    console.log('hello', walletConnect.current)
    if (walletConnect.current.connected) {
      walletConnect.current.killSession()
    }
  }
  useEffect(() => {
    const initWalletConnect = async () => {
      const WalletConnect = (await import('@walletconnect/client')).default
      WalletConnect.prototype.sign = (
        await import('@algodex/algodex-sdk/lib/wallet/signers/WalletConnect')
      ).default
      walletConnect.current = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org', // Required
        qrcodeModal: QRCodeModal
      })
      console.log(walletConnect.current, 'all here')
      walletConnect.current.connected = false
    }
    initWalletConnect()
  }, [])

  const handleDisconnect = useCallback(
    (err) => {
      console.log('DISCONNECTED')
      if (err) throw err
      if (typeof algodex !== 'undefined' && Array.isArray(algodex.addresses)) {
        setAddresses(
          algodex.addresses.filter((addr) => addr.type !== 'wallet-connect'),
          { merge: false, validate: false }
        )
      }
    },
    [setAddresses, algodex.addresses]
  )

  const handleConnected = (err, payload) => {
    console.log('CONNECTED')
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

    setAddresses(_addresses, { merge: true, validate: false })

    QRCodeModal.close()
  }
  useEffect(() => {
    // let listener;
    if (typeof walletConnect.current !== 'undefined') {
      walletConnect.current.on('connect', handleConnected)
      walletConnect.current.on('session_update', handleConnected)
      walletConnect.current.on('disconnect', handleDisconnect)
    }
    return () => {
      walletConnect.current.off('connect')
      walletConnect.current.off('session_update')
      walletConnect.current.off('disconnect')
    }
  }, [walletConnect.current])
  return { connect, disconnect }
}
