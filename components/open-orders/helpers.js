import dayjs from 'dayjs'
import { convertFromAsaUnits, calculateAsaBuyAmount, convertFromBaseUnits } from 'services/convert'

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

  const buyOrders = buyOrdersData.map(({ asaPrice, algoAmount, assetId }) => {
    const decimals = assetsInfo[assetId].params.decimals
    /** @todo get formatted price and amounts from api */
    const price = convertFromAsaUnits(asaPrice, decimals)
    const amount = calculateAsaBuyAmount(price, algoAmount)

    return {
      date: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'), // Missing from API
      price,
      pair: `${assetsInfo[assetId].params['unit-name']}/ALGO`,
      type: 'BUY',
      role: 'MAKER',
      amount
    }
  })

  const sellOrders = sellOrdersData.map(({ asaPrice, asaAmount, assetId }) => {
    const decimals = 6
    /** @todo get formatted price and amounts from api */
    const price = convertFromAsaUnits(asaPrice, decimals)
    const amount = convertFromBaseUnits(asaAmount, decimals)

    return {
      date: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'), // Missing from API
      price,
      pair: `${assetsInfo[assetId].params['unit-name']}/ALGO`,
      type: 'SELL',
      role: 'MAKER',
      amount
    }
  })

  return [...buyOrders, ...sellOrders]
}
