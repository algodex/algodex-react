import { useEffect, useMemo, useState } from 'react'
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
import Big from 'big.js'
import millify from 'millify'

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

function mapPriceData(data) {
  const prices =
    data?.chart_data.map(
      ({ formatted_open, formatted_high, formatted_low, formatted_close, unixTime }) => {
        const time = parseInt(unixTime)
        return {
          time: time,
          open: floatToFixed(formatted_open),
          high: floatToFixed(formatted_high),
          low: floatToFixed(formatted_low),
          close: floatToFixed(formatted_close)
        }
      }
    ) || []
  return prices.sort((a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : 0))
}

function getOhlc(data) {
  const lastPriceData = data?.chart_data[0]

  return lastPriceData
    ? {
        open: floatToFixed(lastPriceData.formatted_open),
        high: floatToFixed(lastPriceData.formatted_high),
        low: floatToFixed(lastPriceData.formatted_low),
        close: floatToFixed(lastPriceData.formatted_close)
      }
    : {}
}

function mapVolumeData(data, volUpColor, volDownColor) {
  const mappedData = data?.chart_data?.map(({ asaVolume, unixTime }) => {
    const time = parseInt(unixTime)
    return {
      time: time,
      value: asaVolume
    }
  })
  const volumeColors = data?.chart_data.map(({ open, close }) =>
    open > close ? volDownColor : volUpColor
  )
  return mappedData?.map((md, i) => ({ ...md, color: volumeColors[i] })) || []
}

function getBidAskSpread(orderBook) {
  const { buyOrders, sellOrders } = orderBook

  const bidPrice = buyOrders.sort((a, b) => b.asaPrice - a.asaPrice)?.[0]?.formattedPrice || 0
  const askPrice = sellOrders.sort((a, b) => a.asaPrice - b.asaPrice)?.[0]?.formattedPrice || 0

  const bid = floatToFixed(bidPrice)
  const ask = floatToFixed(askPrice)
  const spread = floatToFixed(new Big(ask).minus(bid).abs())

  return { bid, ask, spread }
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
  interval,
  asset,
  options = {
    refetchInterval
  }
}) {
  // console.log(`useAssetChartQuery(${JSON.stringify({ interval, asset })})`)
  const { id } = asset
  const {
    data: assetOrders,
    isLoading: isOrdersLoading,
    isError: isOrdersError
  } = useAssetOrdersQuery({ asset })

  // console.log(`ASSETORDERS`, { isOrdersLoading, isOrdersError, ...assetQueryRest })

  const VOLUME_UP_COLOR = '#2fb16c2c'
  const VOLUME_DOWN_COLOR = '#e53e3e2c'
  const orderBook = useMemo(
    () => ({
      buyOrders: assetOrders?.buyASAOrdersInEscrow || [],
      sellOrders: assetOrders?.sellASAOrdersInEscrow || []
    }),
    [assetOrders]
  )

  const { bid, ask, spread } = useMemo(() => getBidAskSpread(orderBook), [orderBook])

  const {
    isLoading: isChartLoading,
    isError: isChartError,
    data,
    ...rest
  } = useQuery(['assetChart', { id, interval }], () => fetchAssetChart(id, interval), options)
  // console.log(`ASSETCHART`, { isChartLoading, isChartError, ...rest })

  const priceData = useMemo(() => mapPriceData(data), [data])
  const volumeData = useMemo(() => mapVolumeData(data, VOLUME_UP_COLOR, VOLUME_DOWN_COLOR), [data])
  const ohlcOverlay = useMemo(() => getOhlc(data), [data])

  const volume = millify(data?.chart_data[data?.chart_data.length - 1]?.asaVolume || 0)

  const isLoading = isOrdersLoading || isChartLoading
  const isError = isOrdersError || isChartError

  return {
    data: {
      overlay: {
        ohlc: ohlcOverlay,
        orderbook: { bid, ask, spread },
        volume
      },
      volume: volumeData,
      ohlc: priceData,
      isLoading,
      isError
    },
    isLoading,
    isError,
    ...rest
  }
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
export function useAssetOrderbookQuery({
  asset,
  options = {
    refetchInterval
  }
} = {}) {
  // console.log(`useAssetOrderbookQuery(${JSON.stringify({ asset })})`)
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
  return { data: { orders: { sell, buy }, isLoading }, isLoading, ...rest }
}

export function useAssetOrdersQuery({ asset, options = {} }) {
  // console.log(`useAssetOrdersQuery(${JSON.stringify({ asset })})`)
  const { id } = asset
  return useQuery(['assetOrders', { id }], () => fetchAssetOrders(id), options)
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
