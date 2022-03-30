import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { fetchExplorerAssetInfo, fetchAlgorandPrice } from 'services/algoexplorer'
import routeQueryError from './useRouteQueryError'
import { useEffect } from 'react'

const refetchInterval = 3000

/**
 * Use Asset
 * @param id
 * @param options
 * @param select
 * @returns {Object}
 * @todo: Refactor to use Algorand
 */
export const useExplorerAssetInfo = ({ asset = {}, options }) => {
  console.log(`useExplorerAssetInfo(`, asset, `)`)
  const router = useRouter()
  const { id } = asset
  const { data, isError, error, ...rest } = useQuery(
    ['explorerAsset', id],
    () => fetchExplorerAssetInfo(id),
    options
  )
  //console.log(data)
  useEffect(() => {
    let mounted = true
    if (mounted && typeof id !== 'undefined') {
      routeQueryError({ isError, error, router })
    }
    return () => (mounted = false)
  }, [router, data, isError, error])

  return { data, isError, error, ...rest }
}

/**
 * Use Search Results Query
 * @param {Object} props The props of the parent
 * @param {string} props.query Search Query
 * @param {Object} [props.options] useQuery Options
 * @returns {UseQueryResult<{assets: *}, unknown>}
 */
export const useAlgorandPriceQuery = ({
  query = '',
  options = {
    refetchInterval: query === '' ? refetchInterval : 20000
  }
} = {}) => useQuery(['fetchAlgorandPrice', { query }], () => fetchAlgorandPrice(query), options)
