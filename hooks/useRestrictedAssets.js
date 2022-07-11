
import {
  searchAssets
} from '@/services/cms'
import {
  getAssetTotalStatus,
  getIsRestricted,
  getIsRestrictedCountry
} from '@/utils/restrictedAssets'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'


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
  routeQueryError({ isError, error, router })
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


