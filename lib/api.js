import axios from 'axios'

export const API_HOST = process.env.NEXT_PUBLIC_API || 'https://api-testnet.algodex.com'

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
    `${API_HOST}/algodex-backend/orders.php?ownerAddr=${walletAddress}&getAssetInfo=${includeAssetInfo}`
  )
  return res.data
}

export async function fetchTradeHistory(assetId) {
  const res = await axios.get(`${API_HOST}/algodex-backend/trade_history.php?assetId=${assetId}`)
  return res.data
}

export async function fetchTradeHistoryByAddress(walletAddress, includeAssetInfo = true) {
  const res = await axios.get(
    `${API_HOST}/algodex-backend/trade_history.php?ownerAddr=${walletAddress}&getAssetInfo=${includeAssetInfo}`
  )
  return res.data
}

export async function fetchAssetsByByAddress(walletAddress) {
  const res = await axios.get(
    `https://api-testnet.algodex.com/algodex-backend/wallet_assets.php?ownerAddr=${walletAddress}`
  )
  return res.data
}

export async function searchAssets(query) {
  const res = await axios.get(`${API_HOST}/algodex-backend/asset_search.php?query=${query}`)
  return res.data
}

export async function checkTestnetAccess(loginKey) {
  if (!loginKey) {
    return false
  }

  const res = await axios.get(
    `${API_HOST}/algodex-backend/validate_login_id.php?loginKey=${loginKey}`
  )

  return res.data?.success
}

// @todo: need a dedicated asset by ID endpoint
export async function fetchAssetById(id) {
  const res = await axios.get(`${API_HOST}/algodex-backend/asset_by_id.php?assetId=${id}`)

  const asset = res.data

  return {
    asset: {
      id: asset.index,
      name: asset.params['unit-name'],
      decimals: asset.params.decimals,
      price: asset.isTraded ? parseFloat(asset.formattedPrice) : null,
      priceChange24hr: asset.isTraded ? asset.priceChg24Pct : null,
      isTraded: asset.isTraded,
      hasOrders: asset.hasOrders,
      verified: asset.verified,
      info: {
        fullName: asset.params.name,
        url: asset.params.url,
        algoExplorerUrl: `https://testnet.algoexplorer.io/asset/${asset.index}`,
        supply: {
          circulating: asset.formattedCirculatingSupply,
          total: asset.formattedTotalSupply
        }
      }
    }
  }
}
