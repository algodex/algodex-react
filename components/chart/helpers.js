import dayjs from 'dayjs'
import { convertFromAsaLimitPrice } from 'services/convert'
import { displayPrice } from 'services/display'

const displayConverted = (price, decimals) => {
  if (!price || !decimals) {
    return null
  }
  const converted = convertFromAsaLimitPrice(price, decimals)
  return displayPrice(converted)
}

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

export const getAssetInfo = (data) => {
  return data?.asset_info || {}
}

export const relDiff = (a, b) => {
  return 100 * Math.abs((a - b) / ((a + b) / 2))
}
