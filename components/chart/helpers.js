import dayjs from 'dayjs'

const ASSET_FIXED_DECIMALS = 4

export const mapPriceData = (data) => {
  const prices =
    data?.chart_data.map(({ date, open, high, low, close }) => {
      const time = dayjs(new Date(date)).format('YYYY-MM-DD')
      return {
        time,
        open: parseFloat(open),
        high: parseFloat(high),
        low: parseFloat(low),
        close: parseFloat(close)
      }
    }) || []
  return prices.sort((a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : 0))
}

export const getOhlc = (data) => {
  const lastPriceData = data?.chart_data[0] || {}
  const ohlc =
    {
      open: parseFloat(lastPriceData?.open).toFixed(ASSET_FIXED_DECIMALS),
      high: parseFloat(lastPriceData?.high).toFixed(ASSET_FIXED_DECIMALS),
      low: parseFloat(lastPriceData?.low).toFixed(ASSET_FIXED_DECIMALS),
      close: parseFloat(lastPriceData?.close).toFixed(ASSET_FIXED_DECIMALS)
    } || {}
  return ohlc
}

export const mapVolumeData = (data, volUpColor, volDownColor) => {
  const mappedData = data?.chart_data?.map(({ date, asaVolume }) => {
    console.log('DATE: ', date)
    const time = dayjs(new Date(date)).format('YYYY-MM-DD')
    console.log('TIME: ', time)
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
