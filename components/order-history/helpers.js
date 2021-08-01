import dayjs from 'dayjs'

export const mapTradeHistoryData = (data) => {
  if (!data || !data.transactions || !data.allAssets) {
    return null
  }

  const { transactions: tradeHistoryData, allAssets: assetsData } = data

  const assetsInfo = assetsData.reduce((allAssetsInfo, currentAssetInfo) => {
    allAssetsInfo[currentAssetInfo.index] = currentAssetInfo
    return allAssetsInfo
  }, {})

  const tradeHistory = tradeHistoryData.map(({ unix_time, asset_id, tradeType }) => {
    const side = tradeType === 'buyASA' ? 'BUY' : 'SELL'
    /** @todo get formatted price from API */
    const price = 'XXX'
    const amount = 'XXX'

    return {
      date: dayjs(unix_time * 1000).format('YYYY-MM-DD HH:mm:ss'),
      price,
      pair: `${assetsInfo[asset_id].params['unit-name']}/ALGO`,
      side,
      amount
    }
  })

  return tradeHistory
}
