import { useEffect, useRef } from 'react'

import signer from '@algodex/algodex-sdk/lib/wallet/signers/MyAlgoConnect'

const ERROR = {
  FAILED_TO_INIT: 'MyAlgo Wallet failed to initialize.',
  FAILED_TO_CONNECT: 'MyAlgo Wallet failed to connect.'
}

/**
 * useMyAlgoConnect
 * @param {Function} onConnect On Connect Callback
 * @param {Function} onDisconnect On Disconnect Callback
 * @return {WalletEffect}
 */
export default function useMyAlgoConnect(onConnect, onDisconnect) {
  // Instance reference
  const myAlgoWallet = useRef()

  const disconnect = (wallet) => {
    onDisconnect([wallet.address])
  }
  const connect = async () => {
    try {
      // Something went wrong!
      if (!myAlgoWallet.current) {
        console.error(ERROR.FAILED_TO_INIT)
        return
      }

      // Get Accounts from MyAlgo
      const accounts = await myAlgoWallet.current.connect()

      // Map the connector to the address list
      const _addresses = accounts.map((acct) => {
        acct.type = 'my-algo-wallet'
        acct.connector = myAlgoWallet.current
        acct.connector.connected = true
        return acct
      })
      // Set Addresses
      onConnect(_addresses)
    } catch (e) {
      console.error(ERROR.FAILED_TO_CONNECT, e)
    }
  }
  useEffect(() => {
    console.log('Initialize MyAlgo Connect')
    const initMyAlgoWallet = async () => {
      // '@randlabs/myalgo-connect' is imported dynamically
      // because it uses the window object
      const MyAlgoConnect = (await import('@randlabs/myalgo-connect')).default
      MyAlgoConnect.prototype.sign = signer
      myAlgoWallet.current = new MyAlgoConnect()
      myAlgoWallet.current.connected = false
    }

    initMyAlgoWallet()
  }, [])

  return { connect, disconnect, connector: myAlgoWallet.current }
}
