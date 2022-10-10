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

import { useQuery } from 'react-query'
import { useAlgodex } from '@algodex/algodex-hooks'

/**
 *
 * @param {Wallet} wallet Wallet to search
 * @param {Object} [options] Options for Query
 * @return {UseQueryResult<Wallet, unknown>}
 */
export default function useAccountInfo(
  wallet,
  options = {
    refetchInterval: 3000
  }
) {
  if (typeof wallet === 'undefined' || typeof wallet.address === 'undefined') {
    throw new TypeError('Must have a valid wallet!')
  }

  const { algodex } = useAlgodex()
  return useQuery(
    ['fetchAccountInfo', wallet.address],
    () => algodex.http.indexer.fetchAccountInfo(wallet),
    options
  )
}
