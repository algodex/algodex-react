import axios from 'axios'

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
