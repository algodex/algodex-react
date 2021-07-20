import axios from 'axios'
import { convertFromAsaLimitPrice } from 'services/convert'

export async function fetchRecentTrades() {
  const res = await axios.get('https://api-testnet.algodex.com/algodex-backend/recent_trades.php')
  return res.data
}

export async function fetchPriceData({ queryKey }) {
  const [_key, { assetId }] = queryKey
  const res = await axios.get(
    `https://api-testnet.algodex.com/algodex-backend/charts.php?assetId=${assetId}`
  )
  return res.data
}

export async function fetchOrdersInEscrow(assetId) {
  const res = await axios.get(
    `https://api-testnet.algodex.com/algodex-backend/orders.php?assetId=${assetId}`
  )
  return res.data
}

export async function fetchTradeHistory(assetId) {
  const res = await axios.get(
    `https://api-testnet.algodex.com/algodex-backend/trade_history.php?assetId=${assetId}`
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
    const {
      asaPrice,
      asset_info: { index, params }
    } = tradingPair

    return {
      asset: {
        id: index,
        name: params['unit-name'],
        decimals: params.decimals,
        price: convertFromAsaLimitPrice(asaPrice, params.decimals)
      }
    }
  } catch (err) {
    console.error(`Error fetching asset: ${err.message}`)
  }
}
