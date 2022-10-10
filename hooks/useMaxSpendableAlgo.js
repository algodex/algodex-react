import { useEffect, useState } from 'react'

import Big from 'big.js'
import { useAlgodex } from '@algodex/algodex-hooks'
import { useWalletMinBalanceQuery } from '@algodex/algodex-hooks'

export const useMaxSpendableAlgo = () => {
  const { wallet } = useAlgodex()
  const algoBalance = wallet?.amount || 0
  const [maxSpendableAlgo, setMaxSpendableAlgo] = useState(algoBalance)

  const {
    data: minBalance,
    isLoading: isWalletBalanceLoading,
    isError: isWalletBalanceError
  } = useWalletMinBalanceQuery({
    wallet
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
