import axios from 'axios'

export async function fetchRecentTrades() {
  const res = await axios.get('https://api-testnet.algodex.com/algodex-backend/recent_trades.php')
  return res.data
}
