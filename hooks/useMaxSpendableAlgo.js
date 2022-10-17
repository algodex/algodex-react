/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
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

import { useMemo, useState } from 'react'

import Big from 'big.js'
import { useAlgodex } from '@algodex/algodex-hooks'

import {useQuery} from 'react-query';

const refetchInterval = 2000;

/**
 *
 * @param {AlgodexApi} algodex The Algodex API
 * @param {Object} accountInfo
 * @param {boolean} includesFullAccountInfo
 * @return {Promise<number>}
 */
async function getMinWalletBalance(
    algodex,
    accountInfo,
    includesFullAccountInfo = false,
) {
  if (!includesFullAccountInfo) {
    try {
      // get full account info
      accountInfo = await algodex.http.indexer.fetchAccountInfo(
          accountInfo.address,
      );
    } catch (e) {
      return 1000000;
    }
  }
  if (!accountInfo || !accountInfo.address) {
    return 1000000;
  }

  // logger.debug('in getMinWalletBalance. Checking: ' + accountInfo.address);
  // logger.debug({accountInfo});

  let minBalance = 0;

  if (accountInfo['created-apps']) {
    minBalance += 100000 * (accountInfo['created-apps'].length); // Apps
  }
  if (accountInfo['assets']) {
    minBalance += accountInfo['assets'].length * 100000;
  }
  if (
    accountInfo['apps-total-schema'] !== undefined &&
    accountInfo['apps-total-schema']['num-uint']
  ) {
    // Total Ints
    minBalance += (25000+3500) * accountInfo['apps-total-schema']['num-uint'];
  }
  if (
    accountInfo['apps-total-schema'] !== undefined &&
    accountInfo['apps-total-schema']['num-byte-slice']
  ) {
    const numByteSlice = accountInfo['apps-total-schema']['num-byte-slice'];
    minBalance += (25000+25000) * numByteSlice; // Total Bytes
  }
  minBalance += 1000000;

  return minBalance;
}
/**
 * Use Wallet Minimum Balance Query
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @return {object}
 */
export function useWalletMinBalanceQuery({
  wallet,
  options = {
    refetchInterval,
    enabled: typeof wallet !== 'undefined' &&
      typeof wallet.address !== 'undefined',
    
  },
}) {
  const {algodex} = useAlgodex();
  return useQuery(
      ['walletMinBalance', {address: wallet?.address}],
      async () => await getMinWalletBalance(algodex, wallet),
      options,
  );
}

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

  useMemo(() => {
    try {
      if (!isWalletBalanceLoading && !isWalletBalanceError) {
        const total = new Big(algoBalance)
        const min = new Big(minBalance)
        const max = total.minus(min).round(6, Big.roundDown).toNumber()
        setMaxSpendableAlgo(Math.max(0, max))
      }
    } catch (error) {
      console.debug('Wallet not connected')
    }
  }, [minBalance, algoBalance, isWalletBalanceLoading, isWalletBalanceError])
  return maxSpendableAlgo
}
