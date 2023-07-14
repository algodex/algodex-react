import algosdk from 'algosdk'
import { PeraWalletConnect } from '@perawallet/connect'
import useWalletConnect from 'hooks/useWalletConnect'
import { peraSigner } from 'hooks/usePeraConnection'
import { useContext, useEffect, useState } from 'react'
import { getActiveNetwork } from '@/services/environment'
import { WalletReducerContext } from '@/hooks/WalletsReducerProvider.js'
import { useAlgodex } from '@/hooks'

//trnsactions
const rehyrdratedPeraWallet = new PeraWalletConnect({ chainId: '416002' })

function useBalanceInfo() {
  const { http } = useAlgodex()
  const { activeWallet } = useContext(WalletReducerContext)
  const { connector } = useWalletConnect()
  const [currentBalance, setCurrentBalance] = useState('')
  const [balanceBeforeDate, setBalanceBeforeDate] = useState('')
  let myAddress = ''

  const { setAddressesNew, setActiveWallet, peraWallet, setPeraWallet } =
    useContext(WalletReducerContext)

  const account1_mnemonic = process.env.NEXT_PUBLIC_PASSPHRASE
  const recoveredAccount1 = algosdk.mnemonicToSecretKey(account1_mnemonic)

  const algodToken = ''
  const algodServer = 'https://testnet-api.algonode.cloud'
  const algodPort = 443

  const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort)

  async function optInTxn() {
    async function generateOptIntoAssetTxns({ assetID, initiatorAddr }) {
      const suggestedParams = await algodClient.getTransactionParams().do()
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
      assetID: 10458941,
      initiatorAddr: peraWallet.address
    })
    try {
      const signedTxnGroups = await rehyrdratedPeraWallet.signTransaction([optInTxn])
      console.log(signedTxnGroups)
      const { txId } = await algodClient.sendRawTransaction(signedTxnGroups).do()
      console.log(`txns signed successfully! - txID: ${txId}`)
    } catch (error) {
      console.log("Couldn't sign txn", error)
    }
  }
  async function assetTransferTxn() {
    async function generateAssetTransferTxns() {
      const suggestedParams = await algodClient.getTransactionParams().do()
      const ptxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: recoveredAccount1.addr,
        suggestedParams,
        assetIndex: 10458941,
        to: peraWallet.address,
        amount: 10000
      })
      return ptxn
    }
    try {
      const unsignedTxn = await generateAssetTransferTxns()
      const signedTxn = unsignedTxn.signTxn(recoveredAccount1.sk)
      const { txId } = await algodClient.sendRawTransaction(signedTxn).do()
      const result = await algosdk.waitForConfirmation(algodClient, txId, 4)
      console.log(result)
    } catch (error) {
      console.log("Couldn't sign all txns", error)
    }
  }
  const hasAlgxBalance = (activeWalletObj) => {
    //if (getActiveNetwork() === 'testnet') return true
    const AlgxAssetId = 724480511
    const assetInWallet = activeWalletObj?.assets?.find(
      (asset) => asset['asset-id'] === AlgxAssetId
    )
    console.log({ assetInWallet }) //keep in for debugging
    return typeof assetInWallet !== 'undefined' ? assetInWallet.amount : false
  }
  const checkBalanceBeforeDate = async (myAddress, beforeTime) => {
    const assetId = 724480511
    try {
      const assetInfo = await http.indexer.indexer.lookupAssetByID(assetId).do()
      const assetDecimals = assetInfo?.asset?.params?.decimals

      const indexerAssetInfo = await http.indexer.indexer
        .lookupAccountTransactions(myAddress)
        .assetID(assetId)
        .beforeTime(beforeTime)
        .limit(1)
        .do()

      if (indexerAssetInfo?.transactions[0]?.id) {
        const response = await fetch(
          `https://indexer.testnet.algoexplorerapi.io/v2/transactions/${indexerAssetInfo?.transactions[0]?.id}`
        )
        const data = await response.json()

        const balance =
          data?.transaction?.sender === myAddress
            ? data.transaction['asset-transfer-transaction']['sender-asset-balance'] /
              Math.pow(10, assetDecimals)
            : data.transaction['asset-transfer-transaction']['receiver-asset-balance'] /
              Math.pow(10, assetDecimals)

        setBalanceBeforeDate(balance)
      } else {
        throw new Error('No transactions or token balance found')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (activeWallet) {
      myAddress = activeWallet.address
      setCurrentBalance(hasAlgxBalance(activeWallet))
      //checkBalanceBeforeDate(myAddress)
    }

    const _peraWallet = JSON.parse(localStorage.getItem('peraWallet'))

    if (_peraWallet?.type === 'wallet-connect' && peraWallet === null) {
      rehyrdratedPeraWallet.reconnectSession().then((accounts) => {
        // Setup the disconnect event listener
        // peraWallet.connector?.on("disconnect", handleDisconnectWalletClick)})
        const _rehyrdratedPeraWallet = {
          ..._peraWallet,
          connector: { ..._rehyrdratedPeraWallet, connected: true, sign: peraSigner }
        }
        setPeraWallet(_rehyrdratedPeraWallet)
        setAddressesNew({ type: 'peraWallet', addresses: [_rehyrdratedPeraWallet] })
        setActiveWallet(_rehyrdratedPeraWallet)
        console.log(accounts)
      })
    }
  }, [connector])

  return {
    activeWallet,
    currentBalance,
    balanceBeforeDate,
    optInTxn,
    assetTransferTxn
  }
}

export default useBalanceInfo
