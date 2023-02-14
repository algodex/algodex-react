import algosdk from 'algosdk'

export default async function createAsset(assetParams, client, activeWalletObj, notifier) {
  const params = await client.getTransactionParams().do()

  const createAssetTxn = algosdk.makeAssetCreateTxnWithSuggestedParams(
    activeWalletObj.address,
    undefined, // no note for time being
    Number(assetParams.totalSupply), // hardCoded issuance for time being
    Number(assetParams.decimals), // hardCoded decimals for time
    false,
    activeWalletObj.address,
    undefined,
    activeWalletObj.address,
    activeWalletObj.address,
    assetParams.tokenName,
    assetParams.unitName,
    undefined,
    undefined,
    params
  )
  notifier('awaiting signature')
  const signedTransaction = await activeWalletObj.connector.signTransaction(createAssetTxn.toByte())
  const txn = await client.sendRawTransaction(signedTransaction.blob).do()
  notifier('awaiting confirmation')
  const ptx = await algosdk.waitForConfirmation(client, txn.txId, 4)
  notifier(null)
  const assetId = ptx['asset-index']

  return assetId
}
