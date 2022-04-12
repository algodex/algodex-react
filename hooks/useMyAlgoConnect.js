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
  const { setAddresses, setWallet, wallet } = useAlgodex()

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

      console.log('MYALGO ADDRESES', accounts, _addresses)
      setAddresses(_addresses, { validate: false, merge: true })
      if (typeof wallet === 'undefined' || typeof wallet.address === 'undefined') {
        setWallet(_addresses[0], { merge: true, validate: false })
      }
    } catch (e) {
      console.error(ERROR.FAILED_TO_CONNECT, e)
    }
  }

  useEffect(() => {
    const initMyAlgoWallet = async () => {
      // '@randlabs/myalgo-connect' is imported dynamically
      // because it uses the window object
      myAlgoWallet.current = (
        await import('@algodex/algodex-sdk/lib/wallet/connectors/MyAlgoConnect')
      ).default
    }

    initMyAlgoWallet()
  }, [])

  return connect
}
