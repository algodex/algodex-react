import axios from 'axios'
import { API_HOST } from './constants'

export async function fetchConditionalResource(path, etag, method = 'get') {
  const endpoint = API_HOST + path

  const response = await axios[method](endpoint, {
    headers: {
      'if-none-match': etag
    }
  })

  const data = {
    ...response.data,
    metadata: {
      headers: response.headers
    }
  }

  console.log(path, data)

  return data
}

export function getPriceData({ queryKey }) {
  const { etag, assetId } = queryKey[1]
  const path = `/algodex-backend/charts.php?assetId=${assetId}`

  return fetchConditionalResource(path, etag)
}

export function getRecentTrades({ queryKey }) {
  const { etag } = queryKey[1]
  const path = `/algodex-backend/recent_trades.php`

  return fetchConditionalResource(path, etag)
}

export function getOrdersInEscrow({ queryKey }) {
  const { etag, assetId } = queryKey[1]
  const path = `/algodex-backend/orders.php?assetId=${assetId}`

  return fetchConditionalResource(path, etag)
}

export function getOpenOrdersByAddress({ queryKey }) {
  const { etag, address, includeAssetInfo = true } = queryKey[1]
  const path = `/algodex-backend/orders.php?ownerAddr=${address}&getAssetInfo=${includeAssetInfo}`

  return fetchConditionalResource(path, etag)
}

export function getTradeHistory({ queryKey }) {
  const { etag, assetId } = queryKey[1]
  const path = `/algodex-backend/trade_history.php?assetId=${assetId}`

  return fetchConditionalResource(path, etag)
}

// trade history
export async function fetchTradeHistoryByAddress(walletAddress, includeAssetInfo = true) {
  const res = await axios.get(
    `${API_HOST}/algodex-backend/trade_history.php?ownerAddr=${walletAddress}&getAssetInfo=${includeAssetInfo}`
  )
  return res.data
}

// wallet assets
export async function fetchAssetsByByAddress(walletAddress) {
  const res = await axios.get(
    `https://api-testnet.algodex.com/algodex-backend/wallet_assets.php?ownerAddr=${walletAddress}`
  )
  return res.data
}

// asset search
export async function searchAssets(query) {
  const res = await axios.get(`${API_HOST}/algodex-backend/asset_search.php?query=${query}`)
  return res.data
}

// validate login id
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
