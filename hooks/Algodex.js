import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { fetchAssetPrice, searchAssets } from 'services/algodex'
import withQuery, { routeQueryError } from 'hooks/withQuery'
import { floatToFixed } from 'services/display'
/**
 * Map a Query Result to a Search Result
 * @todo: Fix API response and don't map on client
 * @param assetId
 * @param assetName
 * @param formattedPrice
 * @param priceChg24Pct
 * @param hasOrders
 * @param isTraded
 * @param verified
 * @param unitName
 * @param formattedASALiquidity
 * @param formattedAlgoLiquidity
 * @returns {Object}
 */
export const mapToSearchResults = ({
  assetId,
  assetName,
  formattedPrice,
  priceChg24Pct,
  hasOrders,
  isTraded,
  verified,
  unitName,
  formattedASALiquidity,
  formattedAlgoLiquidity
}) => {
  const price = formattedPrice ? floatToFixed(formattedPrice) : hasOrders ? '--' : null

  const change = !isNaN(parseFloat(priceChg24Pct))
    ? floatToFixed(priceChg24Pct, 2)
    : hasOrders
    ? '--'
    : null

  return {
    id: assetId,
    name: unitName,
    fullName: assetName,
    verified: verified,
    hasBeenOrdered: isTraded || hasOrders,
    liquidityAlgo: formattedAlgoLiquidity,
    liquidityAsa: formattedASALiquidity,
    price,
    change
  }
}

/**
 * Composable Search Results
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {Object} props Starting props to pass to Component
 * @param {Object} props.query The Search Query
 * @param {Object} props.options React-Query Options
 * @returns {JSX.Element | Function}
 */
export const withSearchResults = (Component, { query = '', options }) =>
  withQuery(
    Component,
    { query },
    {
      hook: useSearchResults,
      args: [{ query, options }]
    }
  )

/**
 * Use Search Results
 * @param query
 * @param options
 * @returns {Object}
 */
export const useSearchResults = ({ query = '', options = {} } = {}) =>
  useQuery(['searchResults', { query }], () => searchAssets(query), options)

export const useAssetPrice = ({ id, options } = {}) => {
  const router = useRouter()

  const { data, isError, error, ...rest } = useQuery(
    ['dexAsset', id],
    () => fetchAssetPrice(id),
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

export default {
  withSearchResults,
  useAssetPrice,
  useSearchResults
}
