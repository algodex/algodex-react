import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { fetchExplorerAssetInfo, fetchAlgorandPrice } from 'services/algoexplorer'
import { routeQueryError } from './useAlgodex'
import { useEffect } from 'react'
const DEBUG = process.env.NEXT_PUBLIC_DEBUG || process.env.DEBUG || false

const refetchInterval = 3000

/**
 * Use Asset
 * @param id
 * @param options
 * @param select
 * @returns {Object}
 * @todo: Refactor to use Algorand
 */
export const useExplorerAssetInfo = ({ id, options }) => {
  DEBUG && console.debug(`useExplorerAssetInfo(${id})`, options)
  const router = useRouter()

  const { data, isError, error, ...rest } = useQuery(
    ['explorerAsset', id],
    () => fetchExplorerAssetInfo(id),
    options
  )

  useEffect(() => {
    let mounted = true
    if (mounted) {
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
