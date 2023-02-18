import { useEffect, useRef } from 'react'
import signer from '@algodex/algodex-sdk/lib/wallet/signers/MyAlgoConnect'

export default function useMyAlgoConnector() {
  const connectorRef = useRef(null)
  const initMyAlgoWallet = async () => {
    // '@randlabs/myalgo-connect' is imported dynamically
    // because it uses the window object
    const MyAlgoConnect = (await import('@randlabs/myalgo-connect')).default
    MyAlgoConnect.prototype.sign = signer
    connectorRef.current = new MyAlgoConnect()
    connectorRef.current.connected = false
  }
  useEffect(() => {
    if (connectorRef.current === null) {
      initMyAlgoWallet()
    }
  }, [])

  return connectorRef.current
}
