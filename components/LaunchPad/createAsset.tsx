import algosdk from 'algosdk'
import { activeWalletTypes } from '../types'

import { formatJsonRpcRequest } from '@json-rpc-tools/utils'

import { getActiveNetwork } from '@/services/environment'
const isUndefined = (param) => (param && param.length !== 0 ? param : undefined)

const isMyAlgo = (activeWalletObj: activeWalletTypes) => {
  return activeWalletObj.type === 'my-algo-wallet' ? true : false
}

export const hasAlgxBalance = (activeWalletObj: activeWalletTypes) => {
  if (getActiveNetwork() === 'testnet') return true
  const AlgxAssetId = 724480511
  const assetInWallet = activeWalletObj?.assets?.find(
    (asset: object) => asset['asset-id'] === AlgxAssetId
    // (asset: object) => asset['asset-id'] === 37074699
  )
  console.log({ assetInWallet }) //keep in for debugging
  return typeof assetInWallet !== 'undefined' ? assetInWallet.amount > 100000 : false
}

const signedTransaction = async (
  activeWalletObj: activeWalletTypes,
  client: algosdk.Algodv2,
  notifier: (arg0: string) => void,
  txnArr: algosdk.Transaction[]
) => {
  const walletSigningMap = {
    'my-algo-wallet': async () =>
      await activeWalletObj.connector.signTransaction(txnArr.map((txn) => txn.toByte())),
    'wallet-connect-defly': async () =>
      await activeWalletObj.deflyWallet.signTransaction([
        [
          ...txnArr.map((_txn) => {
            return { txn: _txn }
          })
        ]
      ]),
    'wallet-connect': async () =>
      await activeWalletObj.peraWallet.signTransaction([
        [
          ...txnArr.map((_txn) => {
            return { txn: _txn }
          })
        ]
      ]),

    'wallet-connect-general': async () => {
      const encodedTxns = txnArr.map((txn) => {
        const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64')
        return { txn: encodedTxn }
      })
      const request = formatJsonRpcRequest('algo_signTxn', [encodedTxns])

      const result = await activeWalletObj.connector.sendCustomRequest(request)

      return result.map((element) => new Uint8Array(Buffer.from(element, 'base64')))
    }
  }
  notifier('Awaiting Signature')

  const signedTransactions = await walletSigningMap[activeWalletObj.type]()

  const txn = await client
    .sendRawTransaction(
      isMyAlgo(activeWalletObj) ? signedTransactions.map((txn) => txn.blob) : signedTransactions
    ) /// peraWallet and wallet-connect-general returns the blob directly
    .do()

  notifier('Awaiting Confirmation')
  return await algosdk.waitForConfirmation(client, txn.txId, 4)
}

// Create asset function
export default async function createAsset(
  assetParams,
  client: algosdk.Algodv2,
  activeWalletObj: activeWalletTypes,
  notifier: (arg0: string) => void
) {
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

  const paymentTxn = algosdk.makePaymentTxnWithSuggestedParams(
    activeWalletObj.address,
    '7G6OHJTCFV2VAYAEXAYK5ZDOHIYSKQIBSZEVCHESGE4N4RBVUP4HLHDW6A',
    100000,
    undefined,
    undefined,
    params
  )

  const txnsForSigning = hasAlgxBalance(activeWalletObj)
    ? [createAssetTxn]
    : algosdk.assignGroupID([createAssetTxn, paymentTxn])

  const ptx = await signedTransaction(activeWalletObj, client, notifier, txnsForSigning)
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
    params,
    false // don't throw error if freeze, clawback, or manager are empty
  )
  await signedTransaction(activeWalletObj, client, notifier, [ctxn])
  notifier(null)
}
