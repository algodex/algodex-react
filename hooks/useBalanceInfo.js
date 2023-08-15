import algosdk from 'algosdk'
import { PeraWalletConnect } from '@perawallet/connect'
import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { useContext, useEffect, useState } from 'react'
import { getActiveNetwork } from '@/services/environment'
import { WalletReducerContext } from '@/hooks/WalletsReducerProvider.js'
import { useAlgodex } from '@/hooks'

const peraWallet = new PeraWalletConnect()
const deflyWallet = new DeflyWalletConnect()
function useBalanceInfo() {
  const { algodex } = useAlgodex()
  const { activeWallet } = useContext(WalletReducerContext)
  const [currentBalance, setCurrentBalance] = useState('')
  const [balanceBeforeDate, setBalanceBeforeDate] = useState(null)
  const [optedIn, setOptedIn] = useState(false)
  const account1_mnemonic = process.env.NEXT_PUBLIC_PASSPHRASE
  if (!account1_mnemonic) {
    throw new Error('Environment variable "PUBLIC_PASSPHRASE" is not defined')
  }
  const recoveredAccount1 = algosdk.mnemonicToSecretKey(account1_mnemonic)

  async function hasAlgxBalance(activeWalletObj) {
    // if (getActiveNetwork() === 'testnet') return setCurrentBalance(true)
    let assetId = getActiveNetwork() === 'testnet' ? 10458941 : 724480511 //ALGX MNET -> 724480511 //USDC TNET -> 10458941
    try {
      const assetInfo = await algodex.http.indexer.indexer.lookupAssetByID(assetId).do()
      const assetDecimals = assetInfo?.asset?.params?.decimals
      const assetInWallet = activeWalletObj?.assets?.find((asset) => asset['asset-id'] === assetId)
      setCurrentBalance(
        typeof assetInWallet !== 'undefined'
          ? Number((assetInWallet.amount / Math.pow(10, assetDecimals)).toFixed(2))
          : false
      )
    } catch (error) {
      setCurrentBalance(false)
      console.log(error.message)
    }
  }
  async function checkBalanceBeforeDate(activeWalletObj, beforeTime) {
    let assetId = getActiveNetwork() === 'testnet' ? 10458941 : 724480511 //ALGX MNET -> 724480511 //USDC TNET -> 10458941
    let indexerFetch =
      getActiveNetwork() === 'testnet'
        ? 'https://indexer.testnet.algoexplorerapi.io/v2/transactions/'
        : 'https://indexer.algoexplorerapi.io/v2/transactions/'
    try {
      const indexerAssetInfo = await algodex.http.indexer.indexer
        .lookupAccountTransactions(activeWalletObj?.address)
        .assetID(assetId)
        .beforeTime(beforeTime)
        .limit(1)
        .do()

      if (indexerAssetInfo?.transactions[0]?.id) {
        const response = await fetch(`${indexerFetch}${indexerAssetInfo?.transactions[0]?.id}`)
        const data = await response.json()

        const balance =
          data?.transaction?.sender === activeWalletObj?.address
            ? data.transaction['asset-transfer-transaction']['sender-asset-balance']
            : data.transaction['asset-transfer-transaction']['receiver-asset-balance']
        setBalanceBeforeDate(balance)
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
      const signedTxnGroups =
        activeWallet.type === 'wallet-connect'
          ? await peraWallet.signTransaction([optInTxn])
          : activeWallet.type === 'wallet-connect-defly'
          ? await deflyWallet.signTransaction([optInTxn])
          : null
      console.log(signedTxnGroups)
      const { txId } = await algodex.algod.sendRawTransaction(signedTxnGroups).do()
      console.log(`txns signed successfully! - txID: ${txId}`)
      setOptedIn(true)
    } catch (error) {
      console.log("Couldn't sign txn", error)
    }
  }
  async function assetTransferTxn(activeWalletObj, assetId) {
    const suggestedParams = await algodex.algod.getTransactionParams().do()
    const ptxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: recoveredAccount1.addr,
      suggestedParams,
      assetIndex: assetId,
      to: activeWalletObj?.address,
      amount: balanceBeforeDate
    })
    const freezeTxn = algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject({
      from: recoveredAccount1.addr,
      suggestedParams,
      assetIndex: assetId,
      freezeState: true,
      freezeTarget: activeWalletObj?.address
    })
    const txnArray = [ptxn, freezeTxn]
    const txnGroup = algosdk.assignGroupID(txnArray)
    try {
      const pSignedTxn = txnGroup[0].signTxn(recoveredAccount1.sk)
      const freezeSignedTxn = txnGroup[1].signTxn(recoveredAccount1.sk)
      const signedTxns = [pSignedTxn, freezeSignedTxn]
      const { txId } = await algodex.algod.sendRawTransaction(signedTxns).do()
      const result = await algosdk.waitForConfirmation(algodex.algod, txId, 3)
      setOptedIn('received')
      console.log(result)
    } catch (error) {
      console.log("Couldn't sign all txns", error)
    }
  }

  useEffect(() => {
    peraWallet.reconnectSession()
    deflyWallet.reconnectSession()
  }, [activeWallet])

  return {
    activeWallet,
    currentBalance,
    balanceBeforeDate,
    optInTxn,
    assetTransferTxn,
    checkBalanceBeforeDate,
    hasAlgxBalance,
    checkOptIn,
    optedIn
  }
}

export default useBalanceInfo
