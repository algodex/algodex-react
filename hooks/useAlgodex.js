import {
  fetchAssetChart,
  fetchAssetOrders,
  fetchAssetPrice,
  fetchAssetTradeHistory,
  fetchWalletAssets,
  fetchWalletOrders,
  fetchWalletTradeHistory,
  searchAssets
} from 'services/algodex'

import WalletService from 'services/wallet'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { routeQueryError } from 'hooks/withQuery'
import { useEffect, useState } from 'react'
import { floatToFixed } from '../services/display'
import { calculateAsaBuyAmount } from '../services/convert'

const refetchInterval = 3000

/**
 * Use Search Results Query
 * @param {Object} props The props of the parent
 * @param {string} props.query Search Query
 * @param {Object} [props.options] useQuery Options
 * @returns {UseQueryResult<{assets: *}, unknown>}
 */
export function useSearchResultsQuery({
  query = '',
  options = {
    refetchInterval: query === '' ? refetchInterval : 20000
  }
} = {}) {
  const router = useRouter()
  const { data, isError, error, ...rest } = useQuery(
    ['searchResults', { query }],
    () => searchAssets(query),
    options
  )
  routeQueryError({ isError, error, router })

  return { data, isError, error, ...rest }
}

/**
 * Use Asset Price Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {Object} [props.options] useQuery Options
 * @todo: Consolidate with Search
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
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {string} props.chartInterval Interval to aggregate chart by
 * @param {Object} [props.options] useQuery Options
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
 * @todo aggregate Orders in the API
 * @param orders
 * @param asaDecimals
 * @param type
 * @returns {*}
 */
const aggregateOrders = (orders, asaDecimals, type) => {
  const isBuyOrder = type === 'buy'
  let total = 0

  const sortOrdersToAggregate = (a, b) => {
    if (isBuyOrder) {
      return b.asaPrice - a.asaPrice
    }
    return a.asaPrice - b.asaPrice
  }

  const reduceAggregateData = (result, order) => {
    const price = floatToFixed(order.formattedPrice)

    const orderAmount = isBuyOrder ? order.algoAmount : order.asaAmount

    const amount = isBuyOrder
      ? calculateAsaBuyAmount(price, orderAmount)
      : parseFloat(order.formattedASAAmount)

    total += amount

    const index = result.findIndex((obj) => obj.price === price)

    if (index !== -1) {
      result[index].amount += amount
      result[index].total += amount
      return result
    }

    result.push({
      price,
      amount,
      total
    })
    return result
  }

  const sortRowsByPrice = (a, b) => {
    return b.price - a.price
  }

  return orders.sort(sortOrdersToAggregate).reduce(reduceAggregateData, []).sort(sortRowsByPrice)
}
/**
 * Use Asset Orders Query
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {Object} [props.options] useQuery Options
 * @returns {object} React Query Results
 */
export function useAssetOrdersQuery({
  asset,
  options = {
    refetchInterval
  }
} = {}) {
  const { id, decimals } = asset
  const [sell, setSellOrders] = useState([])
  const [buy, setBuyOrders] = useState([])

  // Orderbook Query
  const { data, isLoading, ...rest } = useQuery(
    ['assetOrders', { id }],
    () => fetchAssetOrders(id),
    options
  )

  // Massage Orders
  useEffect(() => {
    if (
      data &&
      !isLoading &&
      typeof data.sellASAOrdersInEscrow !== 'undefined' &&
      typeof data.buyASAOrdersInEscrow !== 'undefined'
    ) {
      setSellOrders(aggregateOrders(data.sellASAOrdersInEscrow, decimals, 'sell'))
      setBuyOrders(aggregateOrders(data.buyASAOrdersInEscrow, decimals, 'buy'))
    }
  }, [isLoading, data, setSellOrders, setBuyOrders, decimals])

  // Return OrderBook
  return { data: { orders: { sell, buy } }, isLoading, ...rest }
}

/**
 * Use Asset Trade History Query
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {Object} [props.options] useQuery Options
 * @returns {UseQueryResult<Object, unknown>}
 */
export const useAssetTradeHistoryQuery = ({
  asset: { id },
  options = {
    enabled: typeof id !== 'undefined',
    // enabled: false,
    refetchInterval: 5000,
    staleTime: 3000
  }
}) => useQuery(['assetTradeHistory', { id }], () => fetchAssetTradeHistory(id), options)

/**
 * Use Wallet Assets Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @todo: Fetch Wallet Assets from on-chain
 * @returns {UseQueryResult<T, unknown>}
 */
export const useWalletAssetsQuery = ({
  wallet: { address },
  options = {
    enabled: typeof address !== 'undefined',
    refetchInterval
  }
}) => useQuery(['walletAssets', { address }], () => fetchWalletAssets(address), options)

/**
 * Use Wallet Orders Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @returns {UseQueryResult<Object, unknown>}
 */
export const useWalletOrdersQuery = ({
  wallet: { address },
  options = { enabled: typeof address !== 'undefined', refetchInterval }
}) => useQuery(['walletOrders', { address }], () => fetchWalletOrders(address), options)

/**
 * Use Wallet Trade History
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @returns {UseQueryResult<Object, unknown>}
 */
export const useWalletTradeHistory = ({
  wallet: { address },
  options = {
    enabled: typeof address !== 'undefined',
    refetchInterval
  }
}) => useQuery(['walletTradeHistory', { address }], () => fetchWalletTradeHistory(address), options)

/**
 * Use Wallet Minimum Balance Query
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @returns {UseQueryResult<*, unknown>}
 */
export const useWalletMinBalanceQuery = ({
  wallet,
  options = {
    enabled: typeof wallet !== 'undefined' && typeof wallet.address !== 'undefined'
  }
}) =>
  useQuery(
    ['walletMinBalance', { address: wallet?.address }],
    async () => await WalletService.getMinWalletBalance(wallet),
    options
  )

/**
 * Use Wallets Query
 * @param {Object} props The props of the parent
 * @param {Object} props.wallets A list of Wallet Addresses
 * @param {Object} [props.options] useQuery Options
 * @returns {UseQueryResult<{}|{wallets: unknown[]}|undefined, unknown>}
 */
export const useWalletsQuery = ({
  wallets,
  options = {
    enabled: typeof wallets !== 'undefined',
    refetchInterval
  }
}) => useQuery('wallets', () => WalletService.fetchWallets(wallets), options)
