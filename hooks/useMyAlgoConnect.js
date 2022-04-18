import { useEffect, useRef } from 'react'

import { useAlgodex } from '@algodex/algodex-hooks'

const ERROR = {
  FAILED_TO_INIT: 'MyAlgo Wallet failed to initialize.',
  FAILED_TO_CONNECT: 'MyAlgo Wallet failed to connect.'
}

/**
 * useMyAlgoConnect
 * @return {WalletEffect}
 */
export function useMyAlgoConnect() {
  // State Setter
  const { setAddresses, algodex, setWallet } = useAlgodex()

  // Instance reference
  const myAlgoWallet = useRef()

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
      console.debug('Setting Address form myAlgoConnect', _addresses)
      // Set Addresses
      setAddresses(_addresses, { validate: false, merge: true })
    } catch (e) {
      console.error(ERROR.FAILED_TO_CONNECT, e)
    }
  }

  const disconnect = () => {
    setAddresses(
      algodex.addresses.filter((addr) => addr.type !== 'my-algo-wallet'),
      { merge: false, validate: false }
    )
    if (algodex.addresses.length) {
      setWallet(algodex.addresses[0], { validate: false, merge: true })
    }
  }

  useEffect(() => {
    const initMyAlgoWallet = async () => {
      // '@randlabs/myalgo-connect' is imported dynamically
      // because it uses the window object
      const MyAlgoConnect = (await import('@randlabs/myalgo-connect')).default
      MyAlgoConnect.prototype.sign = await import(
        '@algodex/algodex-sdk/lib/wallet/signers/MyAlgoConnect'
      )
      myAlgoWallet.current = new MyAlgoConnect()
      myAlgoWallet.current.connected = false
    }

    initMyAlgoWallet()
  }, [])

  return { connect, disconnect }
}
