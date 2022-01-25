import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'

import {
  fetchAssetChart,
  fetchAssetOrders,
  fetchAssetPrice,
  fetchAssetTradeHistory,
  fetchWalletAssets,
  fetchWalletOrders,
  fetchWalletTradeHistory,
  searchAssets
} from '@/services/algodex'

import { floatToFixed } from '@/services/display'
import { calculateAsaBuyAmount } from '@/services/convert'
import WalletService from '@/services/wallet'

/**
 * Route based on Error
 * @param isError
 * @param error
 * @param router
 * @returns {function(): boolean}
 */
export function routeQueryError({ isError, error, router }) {
  if (isError && error.message.match(404)) {
    router.push('/404')
  } else if (isError && error.message.match(500)) {
    // Do nothing. The component will handle this.
  } else if (isError) {
    // router.push('/500')
    console.error({ error })
    router.push('/restricted')
  }
}
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
 * @returns {object} Massaged Query
 */
export function useAssetPriceQuery({
  asset,
  options = {
    refetchInterval
  }
} = {}) {
  const { id } = asset
  const { data: dexAsset, ...rest } = useQuery(
    ['assetPrice', { id }],
    () => fetchAssetPrice(id),
    options
  )

  return { data: { price: dexAsset }, ...rest }
}
/**
 * Use Asset Chart Query
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {string} props.chartInterval Interval to aggregate chart by
 * @param {Object} [props.options] useQuery Options
 * @returns {object}
 */
export function useAssetChartQuery({
  chartInterval,
  asset: { id },
  options = {
    refetchInterval,
    enabled: typeof id !== 'undefined'
  }
}) {
  return useQuery(['assetChart', { id }], () => fetchAssetChart(id, chartInterval), options)
}
/**
 * @todo aggregate Orders in the API
 * @param orders
 * @param asaDecimals
 * @param type
 * @returns {*}
 */
function aggregateOrders(orders, asaDecimals, type) {
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
 * @returns {object} Massaged React-Query
 */
export function useAssetTradeHistoryQuery({
  asset,
  options = {
    refetchInterval: 5000,
    staleTime: 3000
  }
}) {
  const { id } = asset
  const { data, ...rest } = useQuery(
    ['assetTradeHistory', { id }],
    () => fetchAssetTradeHistory(id),
    options
  )

  const tradesData =
    data?.transactions.map((txn) => ({
      id: txn.PK_trade_history_id,
      type: txn.tradeType,
      price: floatToFixed(txn.formattedPrice),
      amount: txn.formattedASAAmount,
      timestamp: txn.unix_time * 1000
    })) || []

  return { data: { orders: tradesData }, ...rest }
}
/**
 * Use Wallet Assets Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @todo: Fetch Wallet Assets from on-chain
 * @returns {object}
 */
export function useWalletAssetsQuery({
  wallet: { address },
  options = {
    enabled: typeof address !== 'undefined',
    refetchInterval
  }
}) {
  return useQuery(['walletAssets', { address }], () => fetchWalletAssets(address), options)
}
/**
 * Use Wallet Orders Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @returns {object}
 */
export function useWalletOrdersQuery({
  wallet: { address },
  options = { enabled: typeof address !== 'undefined', refetchInterval }
}) {
  return useQuery(['walletOrders', { address }], () => fetchWalletOrders(address), options)
}
/**
 * Use Wallet Trade History
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @returns {object}
 */
export function useWalletTradeHistory({
  wallet: { address },
  options = {
    enabled: typeof address !== 'undefined',
    refetchInterval
  }
}) {
  return useQuery(
    ['walletTradeHistory', { address }],
    () => fetchWalletTradeHistory(address),
    options
  )
}
/**
 * Use Wallet Minimum Balance Query
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @returns {object}
 */
export function useWalletMinBalanceQuery({
  wallet,
  options = {
    enabled: typeof wallet !== 'undefined' && typeof wallet.address !== 'undefined'
  }
}) {
  return useQuery(
    ['walletMinBalance', { address: wallet?.address }],
    async () => await WalletService.getMinWalletBalance(wallet),
    options
  )
}
/**
 * Use Wallets Query
 * @param {Object} props The props of the parent
 * @param {Object} props.wallets A list of Wallet Addresses
 * @param {Object} [props.options] useQuery Options
 * @returns {object}
 */
export function useWalletsQuery({
  wallets,
  options = {
    enabled: typeof wallets !== 'undefined',
    refetchInterval
  }
}) {
  return useQuery('wallets', () => WalletService.fetchWallets(wallets), options)
}
