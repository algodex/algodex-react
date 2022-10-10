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

import { searchAssets } from '@/services/cms'
import {
  getAssetTotalStatus,
  getIsRestricted,
  getIsRestrictedCountry
} from '@/utils/restrictedAssets'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
// import { routeQueryError } from './useRouteQueryError'
const refetchInterval = 3000

/**
 * Use Search Results Query
 * @param {Object} props The props of the parent
 * @param {string} props.query Search Query
 * @param {Object} [props.options] useQuery Options
 * @returns {object}
 */
export function useSearchResultsQuery({
  query = '',
  options = {
    refetchInterval: query === '' ? refetchInterval : 20000
  }
} = {}) {
  const router = useRouter()
  const {
    data: queryData,
    isError,
    error,
    ...rest
  } = useQuery(['searchResults', { query }], () => searchAssets(query), options)
  // routeQueryError({ isError, error, router })
  const data = useMemo(() => {
    if (typeof queryData !== 'undefined' && typeof queryData.assets !== 'undefined') {
      return {
        assets: queryData.assets.map((asset) => {
          const isRestricted =
            getIsRestricted(`${asset.assetId}`) && getAssetTotalStatus(asset.total)
          return {
            ...asset,
            isRestricted,
            isGeoBlocked: getIsRestrictedCountry(router.query) && isRestricted
          }
        })
      }
    } else {
      return queryData
    }
  }, [queryData])
  return { data, isError, error, ...rest }
}
