import Big from 'big.js'
import dayjs from 'dayjs'
import { convertFromAsaUnits } from 'services/convert'
import { floatToFixed } from 'services/display'

// @todo shouldn't need this anymore
const displayConverted = (price = 0, decimals = 6) => {
  const converted = convertFromAsaUnits(price, decimals)
  return floatToFixed(converted)
}

// @todo use formattedPrice for OHLC when available
export const mapPriceData = (data) => {
  const decimals = data?.asset_info.asset.params.decimals
  const prices =
    data?.chart_data.map(({ date, open, high, low, close }) => {
      const time = dayjs(new Date(date)).format('YYYY-MM-DD')
      return {
        time,
        open: displayConverted(open, decimals),
        high: displayConverted(high, decimals),
        low: displayConverted(low, decimals),
        close: displayConverted(close, decimals)
      }
    }) || []
  return prices.sort((a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : 0))
}

// @todo use formattedPrice for OHLC when available
export const getOhlc = (data) => {
  const lastPriceData = data?.chart_data[0] || {}
  const decimals = data?.asset_info.asset.params.decimals
  const ohlc =
    {
      open: displayConverted(lastPriceData?.open, decimals),
      high: displayConverted(lastPriceData?.high, decimals),
      low: displayConverted(lastPriceData?.low, decimals),
      close: displayConverted(lastPriceData?.close, decimals)
    } || {}
  return ohlc
}

export const mapVolumeData = (data, volUpColor, volDownColor) => {
  const mappedData = data?.chart_data?.map(({ date, asaVolume }) => {
    // console.log('DATE: ', date)
    const time = dayjs(new Date(date)).format('YYYY-MM-DD')
    // console.log('TIME: ', time)
    return {
      time,
      value: asaVolume
    }
  })
  const volumeColors = data?.chart_data.map(({ open, close }) =>
    open > close ? volDownColor : volUpColor
  )
  const volumeData = mappedData?.map((md, i) => ({ ...md, color: volumeColors[i] })) || []
  return volumeData
}

export const getBidAskSpread = (orderBook) => {
  const { buyOrders, sellOrders } = orderBook

  const bidPrice = buyOrders.sort((a, b) => b.asaPrice - a.asaPrice)?.[0]?.formattedPrice || 0
  const askPrice = sellOrders.sort((a, b) => a.asaPrice - b.asaPrice)?.[0]?.formattedPrice || 0

  const bid = floatToFixed(bidPrice)
  const ask = floatToFixed(askPrice)
  const spread = floatToFixed(new Big(ask).minus(bid).abs())

  return { bid, ask, spread }
}
