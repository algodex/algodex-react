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

import { useAlgodex } from '@/hooks'
import { useQuery } from 'react-query'

/**
 * Use Search Results Query
 * @param {Object} props The props of the parent
 * @param {string} props.query Search Query
 * @param {Object} [props.options] useQuery Options
 * @return {object}
 */
export function useOrders({
  type = 'wallet',
  id,
  options = {
    refetchInterval: 3000
  }
} = {}) {
  const { http } = useAlgodex()
  const { data, isError, error, ...rest } = useQuery(
    ['fetchOrders', { type, id }],
    () => http.dexd.fetchOrders(type, id),
    options
  )

  return { data, isError, error, ...rest }
}
export default useOrders
