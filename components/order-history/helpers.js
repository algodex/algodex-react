import dayjs from 'dayjs'
import { floatToFixed } from 'services/display'

export const mapTradeHistoryData = (data) => {
  if (!data || !data.transactions || !data.allAssets) {
    return null
  }

  const { transactions: tradeHistoryData, allAssets: assetsData } = data

  const assetsInfo = assetsData.reduce((allAssetsInfo, currentAssetInfo) => {
    allAssetsInfo[currentAssetInfo.index] = currentAssetInfo
    return allAssetsInfo
  }, {})

  const tradeHistory = tradeHistoryData.map(
    ({ unix_time, asset_id, tradeType, formattedPrice, formattedASAAmount }) => {
      const side = tradeType === 'buyASA' ? 'BUY' : 'SELL'

      return {
        date: dayjs(unix_time * 1000).format('YYYY-MM-DD HH:mm:ss'),
        price: floatToFixed(formattedPrice),
        pair: `${assetsInfo[asset_id].params['unit-name']}/ALGO`,
        side,
        amount: formattedASAAmount
      }
    }
  )

  return tradeHistory
}
