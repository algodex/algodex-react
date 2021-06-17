import axios from 'axios'

export async function fetchRecentTrades() {
  const res = await axios.get('https://api-testnet.algodex.com/algodex-backend/recent_trades.php')
  return res.data
}

export async function fetchChartData() {
  const res = await axios.get(
    'https://api-testnet.algodex.com/algodex-backend/charts.php?assetId=15322902'
  )
  return res.data
}
