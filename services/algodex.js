/**
 * Algodex API Interface
 *
 * Includes all responses from the publicly exposed routes
 *
 * @author Alexander Trefonas
 * @author Michael Feher
 * @copyright Algodev Inc
 */

import axios from 'axios'
// TODO: Implement getLogger() from '@algodex/common'
const DEBUG = process.env.NEXT_DEBUG || process.env.DEBUG || false

export const PUBLIC_API = process.env.NEXT_PUBLIC_API || 'https://api-testnet-public.algodex.com'

export const API_HOST = `${PUBLIC_API}/algodex-backend`

DEBUG && console.debug('process.env.NEXT_PUBLIC_API: ' + process.env.NEXT_PUBLIC_API)
console.debug('API_HOST: ' + API_HOST)

let urlToEtag
let urlToLastResp

/**
 * Get ETag Response
 *
 * Check for changes in the API and update the local cache
 * when it is stale. Used to reduce request load from react-query
 * to the backend.
 *
 * @param {string} url Request URL
 * @returns {Promise<AxiosResponse<Object>>} Response or Cached Result
 */
async function getEtagResponse(url) {
  DEBUG && console.debug(`getEtagResponse(${url.replace(`${API_HOST}`, '')})`)
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

/**
 * Fetch Recent Trades
 *
 * Get a list of recent trades from the API
 *
 * @returns {Promise<Object>}
 */
export async function fetchRecentTrades() {
  DEBUG && console.debug(`fetchRecentTrades()`)
  const res = await getEtagResponse(`${API_HOST}/recent_trades.php`)
  return res.data
}

/**
 * Fetch Chart Price Data by Asset ID
 *
 * Returns OHLCV(Open, High, Low, Close, Volume) response from the API.
 * Used in lightweight-charts to display the Candlestick and Area views.
 *
 * @param {number|string} id Unique Asset Identifier
 * @param {string} interval Time interval to aggregate data on
 * @returns {Promise<Object>}
 */
export async function fetchAssetChart(id, interval) {
  DEBUG && console.debug(`fetchAssetChart(${id}, ${interval})`)
  const res = await getEtagResponse(`${API_HOST}/charts2.php?assetId=${id}&chartTime=${interval}`)
  return res.data
}

/**
 * Fetch Orders by Asset ID
 * @param {number|string} id Unique Asset Identifier
 * @returns {Promise<Object>}
 */
export async function fetchAssetOrders(id) {
  DEBUG && console.debug(`fetchAssetOrders(${id})`)
  let url = `${API_HOST}/orders.php?assetId=${id}`
  const res = await getEtagResponse(url)

  return res.data
}

/**
 *
 * Fetch Open Orders
 *
 * @TODO: Deprecate includeAssetInfo
 * @param {string} address Account Address
 * @param {boolean} includeAssetInfo Should fetch asset info
 * @returns {Promise<Object>}
 */
export async function fetchOpenOrdersByAddress(address, includeAssetInfo = true) {
  DEBUG && console.debug(`fetchOpenOrdersByAddress(${address}, ${includeAssetInfo})`)
  const res = await getEtagResponse(
    `${API_HOST}/orders.php?ownerAddr=${address}&getAssetInfo=${includeAssetInfo}`
  )
  return res.data
}

/**
 * Fetch Trade History by Asset ID
 *
 * @param {string | number} id
 * @returns {Promise<Object>}
 */
export async function fetchAssetTradeHistory(id) {
  DEBUG && console.debug(`fetchTradeHistoryByAddress(${id})`)
  const res = await getEtagResponse(`${API_HOST}/trade_history.php?assetId=${id}`)
  return res.data
}

/**
 *
 * @param {string} address
 * @param includeAssetInfo
 * @returns {Promise<Object>}
 */
export async function fetchTradeHistoryByAddress(address, includeAssetInfo = true) {
  DEBUG && console.debug(`fetchTradeHistoryByAddress(${address}, ${includeAssetInfo})`)
  const res = await getEtagResponse(
    `${API_HOST}/trade_history.php?ownerAddr=${address}&getAssetInfo=${includeAssetInfo}`
  )
  return res.data
}

export async function fetchAssetsByByAddress(walletAddress) {
  console.debug(`fetchAssetsByByAddress(${walletAddress})`)
  const res = await getEtagResponse(`${API_HOST}/wallet_assets.php?ownerAddr=${walletAddress}`)
  return res.data
}

export async function searchAssets(query) {
  console.debug(`searchAssets(${query})`)
  const res = await getEtagResponse(`${API_HOST}/asset_search.php?query=${query}`)
  return { assets: res.data }
}

export async function checkTestnetAccess(loginKey) {
  console.debug(`checkTestnetAccess(${loginKey})`)
  if (!loginKey) {
    return false
  }

  const res = await getEtagResponse(`${API_HOST}/validate_login_id.php?loginKey=${loginKey}`)

  return res.data?.success
}
export async function fetchAssets() {
  console.debug(`fetchAssets()`)
  const {
    data: { data }
  } = await getEtagResponse(`${API_HOST}/assets.php`)
  return typeof data !== 'undefined' ? data : []
}
export async function fetchAssetPrice(id) {
  console.debug(`fetchAssetPrice(${id})`)
  const {
    data: { data }
  } = await getEtagResponse(`${API_HOST}/assets.php?id=${id}`)
  return typeof data !== 'undefined' ? data[0] : {}
}

// @todo: need a dedicated asset by ID endpoint
export async function fetchAssetById(id) {
  console.debug(`fetchAssetById(${id})`)
  // Get Price Data
  const { data: result } = await getEtagResponse(`${API_HOST}/assets.php?id=${id}`)
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
