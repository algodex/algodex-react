import { useEffect, useState } from 'react'

import Big from 'big.js'
import { useStorePersisted } from 'store/use-store'
import { useWalletMinBalanceQuery } from 'hooks/useAlgodex'

export const useMaxSpendableAlgo = () => {
  const wallets = useStorePersisted((state) => state.wallets)
  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)
  const activeWallet = wallets.find((wallet) => wallet.address === activeWalletAddress)
  const algoBalance = activeWallet?.balance || 0
  const [maxSpendableAlgo, setMaxSpendableAlgo] = useState(algoBalance)

  const {
    data: minBalance,
    isLoading: isWalletBalanceLoading,
    isError: isWalletBalanceError
  } = useWalletMinBalanceQuery({
    wallet: wallets.find((wallet) => wallet.address === activeWalletAddress)
  })

  useEffect(() => {
    try {
      if (!isWalletBalanceLoading && !isWalletBalanceError) {
        const total = new Big(algoBalance)
        const min = new Big(minBalance).div(1000000)
        const max = total.minus(min).minus(0.1).round(6, Big.roundDown).toNumber()
        setMaxSpendableAlgo(Math.max(0, max))
      }
    } catch (error) {
      console.debug('Wallet not connected')
    }
  }, [minBalance, algoBalance, isWalletBalanceLoading, isWalletBalanceError])
  return maxSpendableAlgo
}
