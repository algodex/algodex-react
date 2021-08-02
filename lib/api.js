import axios from 'axios'

export async function fetchRecentTrades() {
  const res = await axios.get('https://api-testnet.algodex.com/algodex-backend/recent_trades.php')
  return res.data
}

export async function fetchPriceData(assetId) {
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

export async function searchAssets(query) {
  const res = await axios.get(
    `https://api-testnet.algodex.com/algodex-backend/asset_search.php?query=${query}`
  )
  return res.data
}

// @todo: need a dedicated asset by ID endpoint
export async function fetchAssetById(id) {
  const res = await axios.get(
    `https://api-testnet.algodex.com/algodex-backend/asset_search.php?query=${id}`
  )

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
      priceChange24hr: asset.isTraded ? asset['24HourPriceChgPct'] : null
    }
  }
}
