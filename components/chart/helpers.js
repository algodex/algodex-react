import Big from 'big.js'
import dayjs from 'dayjs'
import { floatToFixed } from 'services/display'

export const mapPriceData = (data) => {
  const prices =
    data?.chart_data.map(
      ({ date, formatted_open, formatted_high, formatted_low, formatted_close, unixTime }) => {
        const time = dayjs(new Date(date)).format('YYYY-MM-DD')
        //const time = unixTime
        return {
          time,
          open: floatToFixed(formatted_open),
          high: floatToFixed(formatted_high),
          low: floatToFixed(formatted_low),
          close: floatToFixed(formatted_close)
        }
      }
    ) || []
  return prices.sort((a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : 0))
}

export const getOhlc = (data) => {
  const lastPriceData = data?.chart_data[0]

  const ohlc = lastPriceData
    ? {
        open: floatToFixed(lastPriceData.formatted_open),
        high: floatToFixed(lastPriceData.formatted_high),
        low: floatToFixed(lastPriceData.formatted_low),
        close: floatToFixed(lastPriceData.formatted_close)
      }
    : {}
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
