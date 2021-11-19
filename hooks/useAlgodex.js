import { useQuery } from 'react-query'
import {
  fetchAssetPrice,
  fetchAssetChart,
  searchAssets,
  fetchAssetOrders,
  fetchAssetTradeHistory
} from 'services/algodex'
import { floatToFixed } from 'services/display'

const refetchInterval = 3000
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
 * Use Search Results Query
 * @param {object} props The props of the parent
 * @param {string} props.query Search Query
 * @param {object} props.options useQuery Options
 * @returns {UseQueryResult<{assets: *}, unknown>}
 */
export const useSearchResultsQuery = ({
  query = '',
  options = {
    refetchInterval: query === '' ? refetchInterval : 20000
  }
} = {}) => useQuery(['searchResults', { query }], () => searchAssets(query), options)

/**
 * Use Asset Price Query
 *
 * @param {object} props The props of the parent
 * @param {object} props.asset An instance of an Asset
 * @param {object} props.options useQuery Options
 * @returns {UseQueryResult<*, unknown>}
 */
export const useAssetPriceQuery = ({
  asset: { id },
  options = {
    refetchInterval,
    enabled: typeof id !== 'undefined'
  }
} = {}) => useQuery(['assetPrice', { id }], () => fetchAssetPrice(id), options)

/**
 * Use Asset Chart Query
 * @param {object} props The props of the parent
 * @param {object} props.asset An instance of an Asset
 * @param {string} props.chartInterval Interval to aggregate chart by
 * @param {object} props.options useQuery Options
 * @returns {UseQueryResult<Object, unknown>}
 */
export const useAssetChartQuery = ({
  chartInterval,
  asset: { id },
  options = {
    refetchInterval,
    enabled: typeof id !== 'undefined'
  }
}) => useQuery(['assetChart', { id }], () => fetchAssetChart(id, chartInterval), options)

/**
 * Use Asset Orders Query
 * @param {object} props The props of the parent
 * @param {object} props.asset An instance of an Asset
 * @param {object} props.options useQuery Options
 * @returns {UseQueryResult<Object, unknown>}
 */
export const useAssetOrdersQuery = ({
  asset: { id },
  options = {
    refetchInterval,
    enabled: typeof id !== 'undefined'
  }
}) => useQuery(['assetOrders', { id }], () => fetchAssetOrders(id), options)

export const useAssetTradeQuery = ({
  asset: { id },
  options = {
    enabled: typeof id !== 'undefined',
    refetchInterval: 5000,
    staleTime: 3000
  }
}) => useQuery(['assetTradeHistory', { id }], () => fetchAssetTradeHistory(id), options)
