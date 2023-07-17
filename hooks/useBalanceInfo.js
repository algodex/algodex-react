import algosdk from 'algosdk'
import { PeraWalletConnect } from '@perawallet/connect'
import { useContext, useEffect, useState } from 'react'
import { getActiveNetwork } from '@/services/environment'
import { WalletReducerContext } from '@/hooks/WalletsReducerProvider.js'
import { useAlgodex } from '@/hooks'

const peraWallet = new PeraWalletConnect()

function useBalanceInfo() {
  const { algodex } = useAlgodex()
  const { activeWallet } = useContext(WalletReducerContext)
  const [currentBalance, setCurrentBalance] = useState('')
  const [balanceBeforeDate, setBalanceBeforeDate] = useState(null)
  const [optedIn, setOptedIn] = useState('')
  const account1_mnemonic = process.env.NEXT_PUBLIC_PASSPHRASE
  const recoveredAccount1 = algosdk.mnemonicToSecretKey(account1_mnemonic)

  async function hasAlgxBalance(activeWalletObj) {
    if (getActiveNetwork() === 'testnet') return setCurrentBalance(true)
    const assetId = 724480511 //ALGX MNET -> 724480511 //USDC TNET -> 10458941

    try {
      const assetInfo = await algodex.http.indexer.indexer.lookupAssetByID(assetId).do()
      const assetDecimals = assetInfo?.asset?.params?.decimals
      const assetInWallet = activeWalletObj?.assets?.find((asset) => asset['asset-id'] === assetId)
      setCurrentBalance(
        typeof assetInWallet !== 'undefined'
          ? assetInWallet.amount / Math.pow(10, assetDecimals)
          : false
      )
    } catch (error) {
      setCurrentBalance(false)
      console.log(error.message)
    }
  }
  async function checkBalanceBeforeDate(activeWalletObj, beforeTime) {
    const assetId = 724480511 //ALGX MNET -> 724480511 //USDC TNET -> 10458941
    let indexerFetch = ''
    try {
      const indexerAssetInfo = await algodex.http.indexer.indexer
        .lookupAccountTransactions(activeWalletObj?.address)
        .assetID(assetId)
        .beforeTime(beforeTime)
        .limit(1)
        .do()

      if (indexerAssetInfo?.transactions[0]?.id) {
        getActiveNetwork() === 'testnet'
          ? (indexerFetch = 'https://indexer.testnet.algoexplorerapi.io/v2/transactions/')
          : (indexerFetch = 'https://indexer.algoexplorerapi.io/v2/transactions/')

        const response = await fetch(`${indexerFetch}${indexerAssetInfo?.transactions[0]?.id}`)
        const data = await response.json()
        const balance =
          data?.transaction?.sender === activeWalletObj?.address
            ? data.transaction['asset-transfer-transaction']['sender-asset-balance']
            : data.transaction['asset-transfer-transaction']['receiver-asset-balance']
        setBalanceBeforeDate(balance)
      } else {
        throw new Error('No transactions or token balance found')
      }
    } catch (error) {
      setBalanceBeforeDate(null)
      console.log(error.message)
    }
  }
  async function checkOptIn(activeWalletObj) {
    const assetId = 255830125 //ALGX MNET -> 724480511 //USDC TNET -> 10458941 //VoteToken TNET -> 255830125
    try {
      const accountAssets = await algodex.http.indexer.indexer
        .lookupAccountAssets(activeWalletObj?.address)
        .do()
      const assetOptedIn = await accountAssets.assets?.some((asset) => asset['asset-id'] == assetId)
      setOptedIn(assetOptedIn)
    } catch (error) {
      setOptedIn(false)
      console.log(error.message)
    }
  }
  async function optInTxn(activeWalletObj) {
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
      assetID: 255830125, //ALGX MNET -> 724480511 //USDC TNET -> 10458941 //VoteToken TNET -> 255830125
      initiatorAddr: activeWalletObj?.address
    })
    try {
      const signedTxnGroups = await peraWallet.signTransaction([optInTxn])
      console.log(signedTxnGroups)
      const { txId } = await algodex.algod.sendRawTransaction(signedTxnGroups).do()
      console.log(`txns signed successfully! - txID: ${txId}`)
    } catch (error) {
      console.log("Couldn't sign txn", error)
    }
  }
  async function assetTransferTxn(activeWalletObj) {
    async function generateAssetTransferTxns() {
      const suggestedParams = await algodex.algod.getTransactionParams().do()
      const ptxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: recoveredAccount1.addr,
        suggestedParams,
        assetIndex: 255830125, //ALGX MNET -> 724480511 //USDC TNET -> 10458941 //VoteToken TNET -> 255830125
        to: activeWalletObj?.address,
        amount: balanceBeforeDate
      })
      return ptxn
    }
    try {
      const unsignedTxn = await generateAssetTransferTxns()
      const signedTxn = unsignedTxn.signTxn(recoveredAccount1.sk)
      const { txId } = await algodex.algod.sendRawTransaction(signedTxn).do()
      const result = await algosdk.waitForConfirmation(algodex.algod, txId, 4)
      console.log(result)
    } catch (error) {
      console.log("Couldn't sign all txns", error)
    }
  }

  useEffect(() => {
    peraWallet.reconnectSession()
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
