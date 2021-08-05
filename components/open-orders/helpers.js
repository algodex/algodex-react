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
    const { assetId, formattedPrice, formattedASAAmount, decimals } = order

    return {
      /** @todo get date/time from API */
      date: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      price: floatToFixed(formattedPrice),
      pair: `${assetsInfo[assetId].params['unit-name']}/ALGO`,
      type: 'BUY',
      status: 'OPEN',
      amount: floatToFixed(formattedASAAmount, decimals, decimals),
      metadata: order
    }
  })

  const sellOrders = sellOrdersData.map((order) => {
    const { assetId, formattedPrice, formattedASAAmount, decimals } = order

    return {
      /** @todo get date/time from API */
      date: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      price: floatToFixed(formattedPrice),
      pair: `${assetsInfo[assetId].params['unit-name']}/ALGO`,
      type: 'SELL',
      status: 'OPEN',
      amount: floatToFixed(formattedASAAmount, decimals, decimals),
      metadata: order
    }
  })

  return [...buyOrders, ...sellOrders]
}
