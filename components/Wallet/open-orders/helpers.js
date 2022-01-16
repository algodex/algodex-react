import dayjs from 'dayjs'
import { floatToFixed } from 'services/display'

export const mapOpenOrdersData = (data) => {
  if (!data || !data.buyASAOrdersInEscrow || !data.sellASAOrdersInEscrow || !data.allAssets) {
    return null
  }

  const {
    buyASAOrdersInEscrow: buyOrdersData,
    sellASAOrdersInEscrow: sellOrdersData,
    allAssets: assetsData
  } = data

  const assetsInfo = assetsData.reduce((allAssetsInfo, currentAssetInfo) => {
    allAssetsInfo[currentAssetInfo.index] = currentAssetInfo
    return allAssetsInfo
  }, {})

  const buyOrders = buyOrdersData.map((order) => {
    const { assetId, formattedPrice, formattedASAAmount, unix_time } = order
    return {
      /** @todo get date/time from API */
      date: dayjs.unix(unix_time).format('YYYY-MM-DD HH:mm:ss'),
      // date: moment(unix_time, 'YYYY-MM-DD HH:mm').format(),
      unix_time: unix_time,
      price: floatToFixed(formattedPrice),
      pair: `${assetsInfo[assetId].params['unit-name']}/ALGO`,
      type: 'BUY',
      status: 'OPEN',
      amount: formattedASAAmount,
      metadata: order
    }
  })

  const sellOrders = sellOrdersData.map((order) => {
    const { assetId, formattedPrice, formattedASAAmount, unix_time } = order

    return {
      /** @todo get date/time from API */
      date: dayjs.unix(unix_time).format('YYYY-MM-DD HH:mm:ss'),
      unix_time: unix_time,
      price: floatToFixed(formattedPrice),
      pair: `${assetsInfo[assetId].params['unit-name']}/ALGO`,
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
