import { useState, useEffect, useRef } from 'react'

const ERROR = {
  FAILED_TO_INIT: 'MyAlgo Wallet failed to initialize.',
  FAILED_TO_CONNECT: 'MyAlgo Wallet failed to connect.'
}

export default function useMyAlgo() {
  const [addresses, setAddresses] = useState()

  const myAlgoWallet = useRef()

  const connect = async () => {
    try {
      if (!myAlgoWallet.current) {
        console.error(ERROR.FAILED_TO_INIT)
        return
      }

      const accounts = await myAlgoWallet.current.connect()
      const _addresses = accounts.map((acct) => acct.address)
      setAddresses(_addresses)
    } catch (e) {
      console.error(ERROR.FAILED_TO_CONNECT, e)
    }
  }

  useEffect(() => {
    const initMyAlgoWallet = async () => {
      // '@randlabs/myalgo-connect' is imported dynamically because it uses the window object
      const MyAlgoWallet = (await import('@randlabs/myalgo-connect')).default
      myAlgoWallet.current = new MyAlgoWallet()
    }

    initMyAlgoWallet()
  }, [])

  return {
    connect,
    addresses
  }
}
