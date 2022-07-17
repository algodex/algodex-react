import { calculateAsaBuyAmount, convertFromAsaUnits } from '@/services/convert'
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
import {
  getAssetTotalStatus,
  getIsRestricted,
  getIsRestrictedCountry
} from '@/utils/restrictedAssets'
import { useEffect, useMemo, useState } from 'react'

import Big from 'big.js'
import WalletService from '@/services/wallet'
import dayjs from 'dayjs'
import { floatToFixed } from '@/services/display'
import millify from 'millify'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'

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
    // router.push('/restricted')
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
  asset: algorandAsset,
  options = {
    refetchInterval,
    enabled: typeof algorandAsset !== 'undefined' && typeof algorandAsset.id !== 'undefined',
    initialData: algorandAsset?.price_info
  }
} = {}) {
  //console.log(`useAssetPriceQuery(`, arguments[0], `)`)
  const { id } = algorandAsset
  const { data: dexAsset, ...rest } = useQuery(
    ['assetPrice', { id }],
    () => fetchAssetPrice(id),
    options
  )
  const asset = useMemo(() => {
    return {
      ...algorandAsset,
      price_info: dexAsset
    }
  }, [algorandAsset, dexAsset])

  return { data: { asset }, ...rest }
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
 * @param {string} props.interval Interval to aggregate chart by
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

  const leftPriceDecimalsLength = orders.map((order) => {
    const price = new Big(convertFromAsaUnits(order.asaPrice, asaDecimals))
    const left = Math.floor(price)
    const right = price.sub(left)
    return right !== 0 && right.toString().length > 2 ? right.toString().length - 2 : 0
  })

  const decimalLength =
    leftPriceDecimalsLength.length === 0 ? 0 : Math.max(...leftPriceDecimalsLength)

  const sortOrdersToAggregate = (a, b) => {
    if (isBuyOrder) {
      return b.asaPrice - a.asaPrice
    }
    return a.asaPrice - b.asaPrice
  }

  const reduceAggregateData = (result, order) => {
    const _price = convertFromAsaUnits(order.asaPrice, asaDecimals)
    const price = floatToFixed(_price, 6, decimalLength)

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
      groupId: encodeURIComponent(txn.group_id),
      timestamp: txn.unix_time * 1000
    })) || []

  return { data: { orders: tradesData }, ...rest }
}
/**
 * @deprecated
 * @param data
 * @returns {null|*}
 */
export const mapAssetsData = (data) => {
  if (!data || !data.allAssets || !data.allAssets.length) {
    return null
  }

  const { allAssets: assetsData } = data

  return assetsData.map(
    ({
      unit_name,
      name,
      formattedTotalASAAmount,
      formattedASAAvailable,
      formattedASAInOrder,
      formattedTotalAlgoEquiv,
      assetId
    }) => {
      return {
        unit: unit_name,
        id: assetId,
        name,
        total: formattedTotalASAAmount || '',
        available: formattedASAAvailable || '',
        'in-order': formattedASAInOrder || '',
        'algo-value': formattedTotalAlgoEquiv || ''
      }
    }
  )
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
  const { data, ...rest } = useQuery(
    ['walletAssets', { address }],
    () => fetchWalletAssets(address),
    options
  )
  const assets = useMemo(() => mapAssetsData(data), [data])
  return { data: { assets }, ...rest }
}

const useFormattedPair = (asaId, assetsList) => {
  const cachedAssetsList = useMemo(() => {
    return (
      assetsList &&
      assetsList.data &&
      assetsList.data.assets.reduce((previous, currentValue) => {
        const key = currentValue.assetId
        const updated = {
          [key]: currentValue
        }
        return Object.assign(previous, updated)
      }, {})
    )
  }, [assetsList])
  return cachedAssetsList && cachedAssetsList[asaId]?.unitName
}

const mapOpenOrdersData = (data, assetList = []) => {
  // if (!data || !data.buyASAOrdersInEscrow || !data.sellASAOrdersInEscrow || !data?.allAssets) {
  if (!data || !data.buyASAOrdersInEscrow || !data.sellASAOrdersInEscrow) {
    return null
  }
  const {
    buyASAOrdersInEscrow: buyOrdersData,
    sellASAOrdersInEscrow: sellOrdersData,
    allAssets: assetsData
  } = data
  const assetsInfo = (assetsData || []).reduce((allAssetsInfo, currentAssetInfo) => {
    allAssetsInfo[currentAssetInfo.index] = currentAssetInfo
    return allAssetsInfo
  }, {})
  const buyOrders = buyOrdersData.map((order) => {
    const { assetId, formattedPrice, formattedASAAmount, unix_time } = order
    return {
      asset: { id: assetId },
      date: dayjs.unix(unix_time).format('YYYY-MM-DD HH:mm:ss'),
      // date: moment(unix_time, 'YYYY-MM-DD HH:mm').format(),
      unix_time: unix_time,
      price: floatToFixed(formattedPrice),
      pair: `${
        assetsInfo[assetId]?.params['unit-name'] || useFormattedPair(assetId, assetList)
      }/ALGO`,
      type: 'BUY',
      status: 'OPEN',
      amount: formattedASAAmount,
      metadata: order
    }
  })

  const sellOrders = sellOrdersData.map((order) => {
    const { assetId, formattedPrice, formattedASAAmount, unix_time } = order

    return {
      asset: { id: assetId },
      date: dayjs.unix(unix_time).format('YYYY-MM-DD HH:mm:ss'),
      unix_time: unix_time,
      price: floatToFixed(formattedPrice),
      pair: `${
        assetsInfo[assetId]?.params['unit-name'] || useFormattedPair(assetId, assetList)
      }/ALGO`,
      type: 'SELL',
      status: 'OPEN',
      amount: formattedASAAmount,
      metadata: order
    }
  })
  const allOrders = [...buyOrders, ...sellOrders]
  allOrders.sort((a, b) => (a.unix_time < b.unix_time ? 1 : -1))

  return allOrders
}

/**
 * Use Wallet Orders Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @returns {object}
 */
export function useWalletOrdersQuery({ wallet, options = { refetchInterval } }) {
  const { address } = wallet
  const { data, ...rest } = useQuery(
    ['walletOrders', { address }],
    () => fetchWalletOrders(address),
    options
  )
  const assetsList = useSearchResultsQuery()
  const orders = useMemo(() => mapOpenOrdersData(data, assetsList), [data, assetsList])

  return { data: { orders }, ...rest }
}
/**
 * Use Wallet Trade History
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @returns {object}
 */
export function useWalletTradeHistoryQuery({
  wallet,
  options = {
    refetchInterval
  }
}) {
  const { address } = wallet
  const mapTradeHistoryData = (data) => {
    const buyText = 'BUY'
    const sellText = 'SELL'
    if (!data || !data.transactions || !data.allAssets) {
      return null
    }

    const { transactions: tradeHistoryData, allAssets: assetsData } = data

    const assetsInfo = assetsData.reduce((allAssetsInfo, currentAssetInfo) => {
      allAssetsInfo[currentAssetInfo.index] = currentAssetInfo
      return allAssetsInfo
    }, {})
    return tradeHistoryData.map(
      ({ unix_time, group_id, asset_id, tradeType, formattedPrice, formattedASAAmount }) => {
        const side = tradeType === 'buyASA' ? buyText : sellText

        return {
          id: asset_id,
          groupId: encodeURIComponent(group_id),
          date: dayjs(unix_time * 1000).format('YYYY-MM-DD HH:mm:ss'),
          price: floatToFixed(formattedPrice),
          pair: `${assetsInfo[asset_id].params['unit-name']}/ALGO`,
          side,
          amount: formattedASAAmount
        }
      }
    )
  }
  const { data, ...rest } = useQuery(
    ['walletTradeHistory', { address }],
    () => fetchWalletTradeHistory(address),
    options
  )
  const orders = useMemo(() => mapTradeHistoryData(data), [data])
  return { data: { orders }, ...rest }
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
