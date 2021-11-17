import axios from 'axios'
const DEBUG = process.env.NEXT_DEBUG || false
export const API_HOST = process.env.NEXT_PUBLIC_API || 'https://api-testnet-public.algodex.com'
console.debug('process.env.NEXT_PUBLIC_API: ' + process.env.NEXT_PUBLIC_API)
console.debug('API_HOST: ' + API_HOST)
let urlToEtag
let urlToLastResp

async function getEtagResponse(url) {
  DEBUG && console.debug(`getEtagResponse(${url.replace(`${API_HOST}/algodex-backend`, '')})`)
  if (typeof urlToEtag === 'undefined') {
    urlToEtag = {}
  }
  if (typeof urlToLastResp === 'undefined') {
    urlToLastResp = {}
  }

  let headers = {}

  if (urlToEtag[url]) {
    headers = { headers: { 'if-none-match': urlToEtag[url] } }
  }

  return await axios
    .get(url, headers)
    .then((res) => {
      if (res && res.status === 200) {
        let etag = res.headers.etag
        urlToLastResp[url] = res
        urlToEtag[url] = etag
        return res
      } else {
        throw new Error('Unexpected Status')
      }
    })
    .catch(function (error) {
      const errorResp = error.response
      if (errorResp && errorResp.status === 304) {
        return urlToLastResp[url]
      } else {
        throw new Error(`Invalid response: ${error.message}`)
      }
    })
}

export async function fetchRecentTrades() {
  console.debug(`fetchRecentTrades()`)
  const res = await getEtagResponse(`${API_HOST}/algodex-backend/recent_trades.php`)
  return res.data
}
// export async function fetchAssets(ids) {
//   const res = await getEtagResponse(
//     `${API_HOST}/algodex-backend/assets.php?assetId=${assetId}&chartTime=${chartTime}`
//   )
//   return res.data
// }
export async function fetchPriceData(assetId, chartTime) {
  console.debug(`fetchPriceData(${assetId}, ${chartTime})`)
  const res = await getEtagResponse(
    `${API_HOST}/algodex-backend/charts2.php?assetId=${assetId}&chartTime=${chartTime}`
  )
  return res.data
}

export async function fetchOrdersInEscrow(assetId) {
  console.debug(`fetchOrdersInEscrow(${assetId})`)
  let url = `${API_HOST}/algodex-backend/orders.php?assetId=${assetId}`
  const res = await getEtagResponse(url)

  return res.data
}

export async function fetchOpenOrdersByAddress(walletAddress, includeAssetInfo = true) {
  console.debug(`fetchOpenOrdersByAddress(${walletAddress}, ${includeAssetInfo})`)
  const res = await getEtagResponse(
    `${API_HOST}/algodex-backend/orders.php?ownerAddr=${walletAddress}&getAssetInfo=${includeAssetInfo}`
  )
  return res.data
}

export async function fetchTradeHistory(assetId) {
  console.debug(`fetchTradeHistoryByAddress(${assetId})`)
  const res = await getEtagResponse(
    `${API_HOST}/algodex-backend/trade_history.php?assetId=${assetId}`
  )
  return res.data
}

export async function fetchTradeHistoryByAddress(walletAddress, includeAssetInfo = true) {
  console.debug(`fetchTradeHistoryByAddress(${walletAddress}, ${includeAssetInfo})`)
  const res = await getEtagResponse(
    `${API_HOST}/algodex-backend/trade_history.php?ownerAddr=${walletAddress}&getAssetInfo=${includeAssetInfo}`
  )
  return res.data
}

export async function fetchAssetsByByAddress(walletAddress) {
  console.debug(`fetchAssetsByByAddress(${walletAddress})`)
  const res = await getEtagResponse(
    `${API_HOST}/algodex-backend/wallet_assets.php?ownerAddr=${walletAddress}`
  )
  return res.data
}

export async function searchAssets(query) {
  console.debug(`searchAssets(${query})`)
  const res = await getEtagResponse(`${API_HOST}/algodex-backend/asset_search.php?query=${query}`)
  return res.data
}

export async function checkTestnetAccess(loginKey) {
  console.debug(`checkTestnetAccess(${loginKey})`)
  if (!loginKey) {
    return false
  }

  const res = await getEtagResponse(
    `${API_HOST}/algodex-backend/validate_login_id.php?loginKey=${loginKey}`
  )

  return res.data?.success
}
export async function fetchAssets() {
  console.debug(`fetchAssets()`)
  const {
    data: { data }
  } = await getEtagResponse(`${API_HOST}/algodex-backend/assets.php`)
  return typeof data !== 'undefined' ? data : []
}
export async function fetchAssetPrice(id) {
  console.debug(`fetchAssetPrice(${id})`)
  const {
    data: { data }
  } = await getEtagResponse(`${API_HOST}/algodex-backend/assets.php?id=${id}`)
  return typeof data !== 'undefined' ? data[0] : {}
}

// @todo: need a dedicated asset by ID endpoint
export async function fetchAssetById(id) {
  console.debug(`fetchAssetById(${id})`)
  // Get Price Data
  const { data: result } = await getEtagResponse(`${API_HOST}/algodex-backend/assets.php?id=${id}`)
  console.log(result)
  // const { price, price24Change: priceChange24hr, isTraded, unix_time } = result.data[0]
  // const hasOrders = typeof isTraded !== 'undefined'

  // Get Asset Params
  // const { asset: assetInfo } = await fetchAssetInfo(id)
  // console.log(assetInfo)
  // const {
  //   params: { decimals, total, name: fullName, 'unit-name': name, description, url }
  // } = assetInfo
  // console.log(assetInfo)
  // Check verified status
  // const {
  //   assetInfo: { verified }
  // } = await fetchExplorerSearchv1(id)
  // console.log(decimals)
  // return {
  //   asset: {
  //     id: parseInt(id),
  //     name,
  //     description: description || 'N/A',
  //     decimals: decimals || 0,
  //     price: price || null,
  //     priceChange24hr: priceChange24hr || null,
  //     isTraded: isTraded || false,
  //     hasOrders: hasOrders || false,
  //     unix_time: unix_time || null,
  //     verified: verified || false,
  //     total: total || null,
  //     fullName: fullName || null,
  //     url: url || isTraded ? `/trade/${id}` : `/asset/${id}`,
  //     algoExplorerUrl: `${EXPLORER_HTML_HOST}/asset/${id}`
  //   }
  // }
}
