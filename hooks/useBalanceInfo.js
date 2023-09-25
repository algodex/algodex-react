import algosdk from 'algosdk'
import { useContext, useState } from 'react'
import { getActiveNetwork } from '@/services/environment'
import { WalletReducerContext } from '@/hooks/WalletsReducerProvider.js'
import { useAlgodex } from '@/hooks'
import toast from 'react-hot-toast'
function useBalanceInfo() {
  const { algodex } = useAlgodex()
  const { activeWallet } = useContext(WalletReducerContext)
  const [currentBalance, setCurrentBalance] = useState('')
  const [balanceBeforeDate, setBalanceBeforeDate] = useState(null)
  const [optedIn, setOptedIn] = useState(false)
  const [loading, setLoading] = useState(false)

  let lastToastId
  const notifier = (msg, type) => {
    if (lastToastId) {
      toast.dismiss(lastToastId)
    }
    if (type === 'loading') lastToastId = toast.loading(msg)
    if (type === 'success') lastToastId = toast.success(msg, { duration: 3000 })
    if (type === 'error') lastToastId = toast.error(msg, { duration: 3000 })
  }
  async function hasAlgxBalance(activeWalletObj) {
    // if (getActiveNetwork() === 'testnet') return setCurrentBalance(true)
    let assetId = getActiveNetwork() === 'testnet' ? 10458941 : 724480511 //ALGX MNET -> 724480511 //USDC TNET -> 10458941
    try {
      const assetInfo = await algodex.http.indexer.indexer.lookupAssetByID(assetId).do()
      const { assets } = await algodex.http.indexer.indexer
        .lookupAccountAssets(activeWalletObj?.address)
        .assetId(assetId)
        .do()
      const assetDecimals = assetInfo?.asset?.params?.decimals
      setCurrentBalance(
        assets.length ? (assets[0].amount / Math.pow(10, assetDecimals)).toFixed(2) : false
      )
    } catch (error) {
      setCurrentBalance(false)
      console.log(error.message)
    }
  }
  async function checkBalanceBeforeDate(activeWalletObj) {
    const snapshotDate = '2023-12-01T16:00:00.000Z'
    let assetId = getActiveNetwork() === 'testnet' ? 10458941 : 724480511 //ALGX MNET -> 724480511 //USDC TNET -> 10458941
    const minBalance = getActiveNetwork() === 'testnet' ? 10 : 10000000000
    let indexerFetch =
      getActiveNetwork() === 'testnet'
        ? 'https://indexer.testnet.algoexplorerapi.io/v2/transactions/'
        : 'https://indexer.algoexplorerapi.io/v2/transactions/'
    try {
      const indexerAssetInfo = await algodex.http.indexer.indexer
        .lookupAccountTransactions(activeWalletObj?.address)
        .assetID(assetId)
        .beforeTime(snapshotDate)
        .limit(1)
        .do()

      if (indexerAssetInfo?.transactions[0]?.id) {
        const response = await fetch(`${indexerFetch}${indexerAssetInfo?.transactions[0]?.id}`)
        const data = await response.json()

        const balance =
          data?.transaction?.sender === activeWalletObj?.address
            ? data.transaction['asset-transfer-transaction']['sender-asset-balance']
            : data.transaction['asset-transfer-transaction']['receiver-asset-balance']
        balance > minBalance ? setBalanceBeforeDate(balance) : setBalanceBeforeDate(null)
      } else {
        throw new Error('checkBalanceBeforeDate: No transactions or token balance found')
      }
    } catch (error) {
      setBalanceBeforeDate(null)
      console.log(error.message)
    }
  }
  async function checkOptIn(activeWalletObj, assetId) {
    try {
      const accountAssetTransfers = await algodex.http.indexer.indexer
        .lookupAccountTransactions(activeWalletObj?.address)
        .assetID(assetId)
        .do()
      const accountAssets = await algodex.http.indexer.indexer
        .lookupAccountAssets(activeWalletObj?.address)
        .do()
      if (
        accountAssetTransfers.transactions?.length &&
        accountAssetTransfers.transactions?.some(
          (transfer) =>
            transfer['sender'] === activeWalletObj?.address &&
            transfer['asset-transfer-transaction'].amount > 0
        )
      ) {
        return setOptedIn('received')
      }
      if (
        accountAssets.assets?.some((asset) => asset['asset-id'] === assetId && asset['amount'] > 0)
      ) {
        return setOptedIn('received')
      }
      if (accountAssets.assets?.some((asset) => asset['asset-id'] === assetId)) {
        return setOptedIn(true)
      }
      throw new Error('checkOptIn: No transactions or token balance found')
    } catch (error) {
      setOptedIn(false)
      console.log(error.message)
    }
  }
  async function optInTxn(activeWalletObj, assetId) {
    async function generateOptIntoAssetTxns({ assetID, initiatorAddr }) {
      const suggestedParams = await algodex.algod.getTransactionParams().do()
      const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: initiatorAddr,
        to: initiatorAddr,
        assetIndex: assetID,
        amount: 0,
        suggestedParams
      })
      return [{ txn: optInTxn, signers: [initiatorAddr] }]
    }
    const optInTxn = await generateOptIntoAssetTxns({
      assetID: assetId,
      initiatorAddr: activeWalletObj?.address
    })
    try {
      notifier('Awaiting signature', 'loading')
      const signedTxnGroups =
        (await activeWalletObj?.peraWallet?.signTransaction([optInTxn])) ||
        (await activeWalletObj?.deflyWallet?.signTransaction([optInTxn]))
      console.log(signedTxnGroups)
      notifier('Awaiting Confirmation', 'loading')
      const { txId } = await algodex.algod.sendRawTransaction(signedTxnGroups).do()
      console.log(`txns signed successfully! - txID: ${txId}`)
      notifier('Successfully opted in!', 'success')
      setOptedIn(true)
    } catch (error) {
      notifier(`Couldn't opt in: ${error}`, 'error')
      console.log("Couldn't sign txn", error)
    }
  }
  async function assetTransferTxn(activeWalletObj, assetId) {
    const suggestedParams = await algodex.algod.getTransactionParams().do()
    const ptxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: 'D6J7GPYO3S7XLMJ7HZBRBLG26DU6CQW6YCTV2LKG6RHKBGETXU6WRKRQ3A',
      suggestedParams,
      assetIndex: assetId,
      to: activeWalletObj?.address,
      amount: balanceBeforeDate
    })
    const freezeTxn = algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject({
      from: 'D6J7GPYO3S7XLMJ7HZBRBLG26DU6CQW6YCTV2LKG6RHKBGETXU6WRKRQ3A',
      suggestedParams,
      assetIndex: assetId,
      freezeState: true,
      freezeTarget: activeWalletObj?.address
    })

    try {
      setLoading(true)
      notifier('Awaiting Confirmation', 'loading')
      const txnBytes = algosdk.encodeUnsignedTransaction(ptxn)
      const ptxnB64 = Buffer.from(txnBytes).toString('base64')
      const ftxnBytes = algosdk.encodeUnsignedTransaction(freezeTxn)
      const ftxnB64 = Buffer.from(ftxnBytes).toString('base64')
      const response = await fetch('/api/signTransactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ptxn: ptxnB64, ftxn: ftxnB64, network: getActiveNetwork() })
      })
      const confirmationResult = await response.json()
      notifier('Successfully sent the tokens!', 'success')
      setOptedIn('received')
      setLoading(false)
      console.log(confirmationResult)
    } catch (error) {
      setLoading(false)
      notifier(`Tokens were not sent: ${error}`, 'error')
      console.log("Couldn't sign all txns", error)
    }
  }

  return {
    activeWallet,
    currentBalance,
    balanceBeforeDate,
    optInTxn,
    assetTransferTxn,
    checkBalanceBeforeDate,
    hasAlgxBalance,
    checkOptIn,
    optedIn,
    loading
  }
}

export default useBalanceInfo
