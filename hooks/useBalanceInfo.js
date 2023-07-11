import { useContext, useEffect, useState } from 'react'
import { getActiveNetwork } from '@/services/environment'
import { WalletReducerContext } from '@/hooks/WalletsReducerProvider.js'
import { useAlgodex } from '@/hooks'

function useBalanceInfo() {
  const { http } = useAlgodex()
  const { activeWallet } = useContext(WalletReducerContext)
  const [currentBalance, setCurrentBalance] = useState('')
  const [balanceBeforeDate, setBalanceBeforeDate] = useState('')
  let myAddress = ''

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
  }, [activeWallet])

  return {
    activeWallet,
    currentBalance,
    balanceBeforeDate
  }
}

export default useBalanceInfo
