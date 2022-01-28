/**
 * Algodex API Interface
 *
 * Includes all responses from the publicly exposed routes
 *
 * TODO: Make deterministic in @algodex/sdk or @algodex/common.
 * Refactor the api client to accept a URL. The consumers of the api client should handle their
 * own ENV variables. For this project it would be ./hooks/useAlgodex
 *
 * @author Alexander Trefonas
 * @author Michael Feher
 * @copyright Algodev Inc
 */

import axios from 'axios'

// TODO: Implement getLogger() from '@algodex/common'
const DEBUG = process.env.NEXT_PUBLIC_DEBUG || process.env.DEBUG || false

const NEXT_API = process.env.NEXT_PUBLIC_API
const NODE_ENV = process.env.NODE_ENV
export const PUBLIC_API =
  typeof window === 'undefined' && NODE_ENV !== 'test' && NEXT_API
    ? NEXT_API
    : `${window.location.protocol}//${window.location.host}`

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
  DEBUG && console.debug(`getEtagResponse(${API_HOST})`)
  if (typeof urlToEtag === 'undefined') {
    urlToEtag = {}
  }
  if (typeof urlToLastResp === 'undefined') {
    urlToLastResp = {}
  }

  const authToken = process.env.GEO_PASSWORD
  const authHeader = `Bearer ${authToken}`

  let headers = { headers: { Authorization: authHeader } }
  if (urlToEtag[url]) {
    headers = { headers: { Authorization: authHeader, 'if-none-match': urlToEtag[url] } }
  }

  if (!authToken) {
    delete headers.headers.Authorization
  }

  DEBUG && console.debug({ headers })
  DEBUG && console.debug('url: ' + url)
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
      } else if (error && !errorResp) {
        console.debug('preflight failing?')
      } else if (errorResp && errorResp.status === 451) {
        console.debug('Error 451!')
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
 * Fetch Asset's Chart
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
 * Fetch Asset's Orders
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
 * Fetch Wallet's Orders
 *
 * @TODO: Deprecate includeAssetInfo
 * @param {string} address Account Address
 * @param {boolean} includeAssetInfo Should fetch asset info
 * @returns {Promise<Object>}
 */
export async function fetchWalletOrders(address, includeAssetInfo = true) {
  DEBUG && console.debug(`fetchOpenOrdersByAddress(${address}, ${includeAssetInfo})`)
  const res = await getEtagResponse(
    `${API_HOST}/orders.php?ownerAddr=${address}&getAssetInfo=${includeAssetInfo}`
  )
  return res.data
}

/**
 * Fetch Asset's Trade History
 *
 * @param {string | number} id
 * @returns {Promise<Object>}
 */
export async function fetchAssetTradeHistory(id) {
  DEBUG && console.debug(`fetchAssetTradeHistory(${id})`)
  const res = await getEtagResponse(`${API_HOST}/trade_history.php?assetId=${id}`)
  return res.data
}

/**
 * Fetch Wallet's Trade History
 * @param {string} address
 * @param {boolean} includeAssetInfo
 * @returns {Promise<Object>}
 */
export async function fetchWalletTradeHistory(address, includeAssetInfo = true) {
  DEBUG && console.debug(`fetchWalletTradeHistory(${address}, ${includeAssetInfo})`)
  const res = await getEtagResponse(
    `${API_HOST}/trade_history.php?ownerAddr=${address}&getAssetInfo=${includeAssetInfo}`
  )
  return res.data
}

/**
 * Fetch Wallet's Assets
 * @param {string} address
 * @returns {Promise<Object>}
 */
export async function fetchWalletAssets(address) {
  console.debug(`fetchWalletAssets(${address})`)
  const res = await getEtagResponse(`${API_HOST}/wallet_assets.php?ownerAddr=${address}`)
  return res.data
}

/**
 * Search for Assets
 * @param {string} query
 * @returns {Promise<{assets: any}>}
 */
export async function searchAssets(query) {
  console.debug(`searchAssets(${query})`)
  const res = await getEtagResponse(`${API_HOST}/asset_search.php?query=${query}`)
  return { assets: res.data }
}

/**
 * Fetch Assets
 * @returns {Promise<*|*[]>}
 */
export async function fetchAssets() {
  console.debug(`fetchAssets()`)
  const {
    data: { data }
  } = await getEtagResponse(`${API_HOST}/assets.php`)
  return typeof data !== 'undefined' ? data : []
}

/**
 * Fetch Asset's Price
 * @param {string|number} id
 * @returns {Promise<*>}
 */
export async function fetchAssetPrice(id) {
  console.debug(`fetchAssetPrice(${id})`)
  const {
    data: { data }
  } = await getEtagResponse(`${API_HOST}/assets.php?id=${id}`)
  return typeof data !== 'undefined' ? data[0] : {}
}
