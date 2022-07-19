import {
  fetchAlgorandPrice,
  fetchExplorerAssetInfo,
  fetchCurrentAssetPrices
} from 'services/algoexplorer'

import { routeQueryError } from './useAlgodex'
import { useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'

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

/**
 * Use Search Results Query
 * Use Asset
 * @param {Object} props The props of the parent
 * @param {string} props.query Search Query
 * @param {Object} [props.options] useQuery Options
 * @returns {UseQueryResult<{assets: *}, unknown>}
 */
export const useCurrentAssetPricesQuery = ({
  assetId = -1,
  options = {
    refetchInterval: 20000
  }
} = {}) =>
  useQuery(
    ['fetchCurrentAssetPrices', { assetId }],
    () => fetchCurrentAssetPrices(assetId),
    options
  )

/**
 * Use Search Results Query
 * @param {Object} props The props of the parent
 * @param {Object} [props.options] useQuery Options
 * @returns {UseQueryResult<{assets: *}, unknown>}
 */
// export function useCurrentAssetPricesQuery({ options = { refetchInterval: 30000 } }) {
//   // return useQuery(['currentAssetPrices'], () => fetchCurrentAssetPrices(), options)
//   const { data: _prices } = useQuery(
//     ['currentAssetPrices'],
//     () => fetchCurrentAssetPrices(),
//     options
//   )

//   const currentPrices = useMemo(() => {
//     return _prices
//   }, [_prices])

//   return currentPrices
// }
