/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
