import algosdk from 'algosdk'

const isUndefined = (param) => (param.length !== 0 ? param : undefined)
export default async function createAsset(assetParams, client, activeWalletObj, notifier) {
  const params = await client.getTransactionParams().do()

  const isMyAlgo =
    activeWalletObj.type === 'my-algo-wallet'
      ? true
      : activeWalletObj.type === 'wallet-connect'
      ? false
      : null /// True for myAlgo, false for wallet-connect, if null then throw error and exit early
  if (isMyAlgo === null) throw Error('Invalid wallet type')

  const createAssetTxn = algosdk.makeAssetCreateTxnWithSuggestedParams(
    activeWalletObj.address,
    undefined, // no note for time being
    Number(assetParams.totalSupply), // hardCoded issuance for time being
    Number(assetParams.decimals), // hardCoded decimals for time
    false,
    isUndefined(assetParams.managerAddr),
    isUndefined(assetParams.reserveAddr),
    isUndefined(assetParams.freezeAddr),
    isUndefined(assetParams.clawbackAddr),
    assetParams.tokenName,
    assetParams.unitName,
    isUndefined(assetParams.assetURL),
    isUndefined(assetParams.assetMetadata),
    params
  )
  notifier('Awaiting Signature')
  const signedTransaction = isMyAlgo
    ? await activeWalletObj.connector.signTransaction(createAssetTxn.toByte())
    : await activeWalletObj.peraWallet.signTransaction([[{ txn: createAssetTxn }]])

  const txn = await client
    .sendRawTransaction(isMyAlgo ? signedTransaction.blob : signedTransaction) /// peraWallet returns the blob directly
    .do()

  notifier('Awaiting Confirmation')
  const ptx = await algosdk.waitForConfirmation(client, txn.txId, 4)
  notifier(null)
  const assetId = ptx['asset-index']

  return assetId
}
