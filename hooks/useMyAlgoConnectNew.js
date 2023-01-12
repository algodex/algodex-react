// import MyAlgoConnect from '@randlabs/myalgo-connect'
// import signer from '@algodex/algodex-sdk/lib/wallet/signers/MyAlgoConnect'
// import { useEffect } from 'react'

// let myAlgoConnect
// if (typeof myAlgoConnect === 'undefined') {
//   myAlgoConnect = new MyAlgoConnect({ disableLedgerNano: false })
//   myAlgoConnect.prototype.sign = signer
// }

// // const accounts = await myAlgoConnect.connect(settings);

// export default function useMyAlgoConnectNew() {
//   connect = async () => {
//     const settings = {
//       shouldSelectOneAccount: false,
//       openManager: false
//     }
//     const accounts = await myAlgoConnect.connect(settings)
//     const _addresses = accounts.map((acct) => {
//       acct.type = 'my-algo-wallet'
//       acct.connector = myAlgoWallet.current
//       acct.connector.connected = true
//       return acct
//     })
//     return _addresses
//   }

//   useEffect(() => {
//     const initMyAlgoWallet = async () => {
//       // '@randlabs/myalgo-connect' is imported dynamically
//       // because it uses the window object
//       const MyAlgoConnect = (await import('@randlabs/myalgo-connect')).default
//       MyAlgoConnect.prototype.sign = signer
//       myAlgoWallet.current = new MyAlgoConnect()
//       myAlgoWallet.current.connected = false
//     }

//     initMyAlgoWallet()
//   }, [])
// }
