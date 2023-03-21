import algosdk from 'algosdk'
import { activeWalletTypes } from '../types'

const isUndefined = (param) => (param.length !== 0 ? param : undefined)

const isMyAlgo = (activeWalletObj: activeWalletTypes) => {
  return activeWalletObj.type === 'my-algo-wallet'
    ? true
    : activeWalletObj.type === 'wallet-connect'
    ? false
    : null /// True for myAlgo, false for wallet-connect, if null then throw error and exit early
}

const signedTransaction = async (activeWalletObj, client, notifier, ctxn) => {
  notifier('Awaiting Signature')
  const signedTransaction = isMyAlgo
    ? await activeWalletObj.connector.signTransaction(ctxn.toByte())
    : await activeWalletObj.peraWallet.signTransaction([[{ txn: ctxn }]])

  const txn = await client
    .sendRawTransaction(isMyAlgo ? signedTransaction.blob : signedTransaction) /// peraWallet returns the blob directly
    .do()

  notifier('Awaiting Confirmation')
  return await algosdk.waitForConfirmation(client, txn.txId, 4)
}

// Create asset function
export default async function createAsset(assetParams, client, activeWalletObj, notifier) {
  const params = await client.getTransactionParams().do()

  if (isMyAlgo(activeWalletObj) === null) throw Error('Invalid wallet type')

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
    assetParams.unitName,
    assetParams.tokenName,
    isUndefined(assetParams.assetURL),
    isUndefined(assetParams.assetMetadata),
    params
  )

  const ptx = await signedTransaction(activeWalletObj, client, notifier, createAssetTxn)
  notifier(null)
  const assetId = ptx['asset-index']

  return assetId
}

// Manage asset function //
export async function manageAsset(
  assetParams: {
    assetId: number
    managerAddr: string
    reserveAddr: string
    freezeAddr: string
    clawbackAddr: string
  },
  client: algosdk.Algodv2,
  activeWalletObj: activeWalletTypes,
  notifier: (arg0: string) => void
) {
  const params = await client.getTransactionParams().do()

  if (isMyAlgo(activeWalletObj) === null) throw Error('Invalid wallet type')

  const ctxn = algosdk.makeAssetConfigTxnWithSuggestedParams(
    activeWalletObj.address,
    undefined, // no note for time being
    assetParams.assetId,
    isUndefined(assetParams.managerAddr),
    isUndefined(assetParams.reserveAddr),
    isUndefined(assetParams.freezeAddr),
    isUndefined(assetParams.clawbackAddr),
    params
  )

  await signedTransaction(activeWalletObj, client, notifier, ctxn)
  notifier(null)
}
