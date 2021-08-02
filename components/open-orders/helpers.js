import dayjs from 'dayjs'

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

  const buyOrders = buyOrdersData.map(({ assetId, formattedPrice, formattedASAAmount }) => {
    return {
      /** @todo get date/time from API */
      date: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      price: formattedPrice,
      pair: `${assetsInfo[assetId].params['unit-name']}/ALGO`,
      type: 'BUY',
      amount: formattedASAAmount
    }
  })

  const sellOrders = sellOrdersData.map(({ assetId, formattedPrice, formattedASAAmount }) => {
    return {
      /** @todo get date/time from API */
      date: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      price: formattedPrice,
      pair: `${assetsInfo[assetId].params['unit-name']}/ALGO`,
      type: 'SELL',
      amount: formattedASAAmount
    }
  })

  return [...buyOrders, ...sellOrders]
}
