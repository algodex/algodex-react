import axios from 'axios'

export async function fetchRecentTrades() {
  const res = await axios.get('https://api-testnet.algodex.com/algodex-backend/recent_trades.php')
  return res.data
}

export async function fetchOrdersInEscrow(assetId) {
  const res = await axios.get(
    `https://api-testnet.algodex.com/algodex-backend/orders.php?assetId=${assetId}`
  )
  return res.data
}

/**
 * This is a placeholder fetch call until there is a dedicated asset endpoint
 * @param {Number} id Algorand ASA ID
 * @returns asset object (assembled from recent trades response data)
 */
export async function fetchAssetById(id) {
  try {
    const res = await axios.get('https://api-testnet.algodex.com/algodex-backend/recent_trades.php')
    const tradingPair = res.data.tradingPairs.find((pair) => pair.asset_id === id)
    const { index, ...rest } = tradingPair.asset_info

    return {
      asset: {
        ...rest,
        id: index,
        price: tradingPair.asaPrice
      }
    }
  } catch (err) {
    console.error(`Error fetching asset: ${err.message}`)
  }
}
