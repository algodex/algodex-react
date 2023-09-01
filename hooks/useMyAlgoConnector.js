import { useEffect, useState } from 'react'
import signer from '@algodex/algodex-sdk/lib/wallet/signers/MyAlgoConnect'

export default function useMyAlgoConnector() {
  // const connectorRef = useRef(null)
  const [connector, setConnector] = useState(null)
  const initMyAlgoWallet = async () => {
    // '@randlabs/myalgo-connect' is imported dynamically
    // because it uses the window object
    const MyAlgoConnect = (await import('@randlabs/myalgo-connect')).default
    MyAlgoConnect.prototype.sign = signer
    const _connector = new MyAlgoConnect()
    _connector.connected = false
    setConnector(_connector)
  }
  useEffect(() => {
    if (connector === null) {
      initMyAlgoWallet()
    }
  }, [])

  return connector
}
