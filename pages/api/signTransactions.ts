import algosdk from 'algosdk'

const account1_mnemonic = process.env.NEXT_PUBLIC_PASSPHRASE
const recoveredAccount1 = algosdk.mnemonicToSecretKey(account1_mnemonic)

export default async function handler(req, res) {
  try {
    const { ptxn } = req.body
    const { ftxn } = req.body
    const { network } = req.body

    const algodToken = ''
    const algodServer =
      network === 'testnet'
        ? 'https://node.testnet.algoexplorerapi.io'
        : 'https://node.algoexplorerapi.io/'
    const algodPort = ''

    const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort)
    const restoredPaymentTxn = algosdk.decodeUnsignedTransaction(Buffer.from(ptxn, 'base64'))
    const restoredFreezeTxn = algosdk.decodeUnsignedTransaction(Buffer.from(ftxn, 'base64'))

    const txnArray = [restoredPaymentTxn, restoredFreezeTxn]
    const txnGroup = algosdk.assignGroupID(txnArray)

    const paymentSignedTxn = txnGroup[0].signTxn(recoveredAccount1.sk)
    const freezeSignedTxn = txnGroup[1].signTxn(recoveredAccount1.sk)

    const signedTxns = [paymentSignedTxn, freezeSignedTxn]

    const { txId } = await algodClient.sendRawTransaction(signedTxns).do()

    const result = await algosdk.waitForConfirmation(algodClient, txId, 3)

    return res.status(200).json(result)
  } catch (error) {
    console.error('Error:', error.message)
    return res.status(500).json({ error: error.message })
  }
}
