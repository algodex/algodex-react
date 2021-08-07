import axios from 'axios'

const API_HOST = process.env.NEXT_PUBLIC_API

export async function fetchRecentTrades() {
  const res = await axios.get(`${API_HOST}/algodex-backend/recent_trades.php`)
  return res.data
}

export async function fetchPriceData(assetId) {
  const res = await axios.get(`${API_HOST}/algodex-backend/charts.php?assetId=${assetId}`)
  return res.data
}

export async function fetchOrdersInEscrow(assetId) {
  const res = await axios.get(`${API_HOST}/algodex-backend/orders.php?assetId=${assetId}`)
  return res.data
}

export async function fetchOpenOrdersByAddress(walletAddress, includeAssetInfo = true) {
  const res = await axios.get(
    `https://api-testnet.algodex.com/algodex-backend/orders.php?ownerAddr=${walletAddress}&getAssetInfo=${includeAssetInfo}`
  )
  return res.data
}

export async function fetchTradeHistory(assetId) {
  const res = await axios.get(`${API_HOST}/algodex-backend/trade_history.php?assetId=${assetId}`)
  return res.data
}

export async function fetchTradeHistoryByAddress(walletAddress, includeAssetInfo = true) {
  const res = await axios.get(
    `https://api-testnet.algodex.com/algodex-backend/trade_history.php?ownerAddr=${walletAddress}&getAssetInfo=${includeAssetInfo}`
  )
  return res.data
}

export async function fetchAssetsByByAddress(walletAddress) {
  const res = await axios.get(
    `http://api-testnet.algodex.com/algodex-backend/wallet_assets.php?ownerAddr=${walletAddress}`
  )
  return res.data
}

export async function searchAssets(query) {
  const res = await axios.get(`${API_HOST}/algodex-backend/asset_search.php?query=${query}`)
  return res.data
}

// @todo: need a dedicated asset by ID endpoint
export async function fetchAssetById(id) {
  const res = await axios.get(`${API_HOST}/algodex-backend/asset_search.php?query=${id}`)

  if (!res.data.length) {
    throw new Error(`Error fetching asset: ${id} not found`)
  }

  const asset = res.data[0]

  return {
    asset: {
      id: asset.assetId,
      name: asset.unitName,
      decimals: asset.decimals,
      isTraded: asset.isTraded,
      price: asset.isTraded ? parseFloat(asset.formattedPrice) : null,
      priceChange24hr: asset.isTraded ? asset.priceChg24Pct : null
    }
  }
}
