import dayjs from 'dayjs'

export const mapOrderHistoryData = (data) => {
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

  const buyOrders = buyOrdersData.map(({ assetLimitPriceInAlgos, asaAmount, assetId }) => {
    return {
      date: dayjs(1624296854921).format('YYYY-MM-DD HH:mm:ss'), // Missing from API
      price: assetLimitPriceInAlgos,
      pair: `${assetsInfo[assetId].params['unit-name']}/ALGO`,
      type: 'BUY',
      role: 'MAKER', // Missing from API
      amount: asaAmount, // Bug
      filled: '125' // Missing from API
    }
  })

  const sellOrders = sellOrdersData.map(({ assetLimitPriceInAlgos, asaAmount, assetId }) => {
    return {
      date: dayjs(1624296854921).format('YYYY-MM-DD HH:mm:ss'), // Missing from API
      price: assetLimitPriceInAlgos,
      pair: `${assetsInfo[assetId].params['unit-name']}/ALGO`,
      type: 'SELL',
      role: 'MAKER', // Missing from API
      amount: asaAmount, // Bug
      filled: '125' // Missing from API
    }
  })

  return [...buyOrders, ...sellOrders]
}
