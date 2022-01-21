import axios from 'axios'
import { indexerAssetMap } from './algorand'
export const EXPLORER_API = process.env.NEXT_PUBLIC_EXPLORER_API || 'https://node.testnet.algoexplorerapi.io'
export const EXPLORER_INDEXER_API =
  process.env.NEXT_PUBLIC_EXPLORER_INDEXER_API || 'https://algoindexer.testnet.algoexplorerapi.io'
export const ALGO_EXPLORER_V1_API = 
  process.env.NEXT_PUBLIC_ALGO_EXPLORER_V1_API || 'https://testnet.algoexplorerapi.io'
export const EXPLORER_ALGORAND_PRICE = 'https://price.algoexplorerapi.io/price/algo-usd'

console.debug('NEXT_PUBLIC_EXPLORER_API: ' + process.env.NEXT_PUBLIC_EXPLORER_API)
console.debug('EXPLORER_API: ' + EXPLORER_API)
console.debug('NEXT_PUBLIC_EXPLORER_INDEXER_API: ' + process.env.NEXT_PUBLIC_EXPLORER_INDEXER_API)
console.debug('EXPLORER_INDEXER_API: ' + EXPLORER_INDEXER_API)
console.debug('EXPLORER_ALGORAND_PRICE: ' + EXPLORER_ALGORAND_PRICE)

/**
 * @see https://algoindexer.testnet.algoexplorerapi.io/v2/assets/185
 * @typedef {Object} ExplorerIndexAsset
 * @property {number} assetId Unique asset identifier.
 * @property {boolean} destroyed Whether or not this asset is currently deleted.
 * @property {number} destroyed-at-round Round during which this asset was destroyed.
 * @property {IndexAssetParams} params Specifies the parameters for an asset.
 */

/**
 * @see https://algoindexer.testnet.algoexplorerapi.io/v2/assets/185
 * @typedef {Object} ExplorerIndexVerifedInfo
 * @property {string} clawback Address of account used to clawback holdings of this asset.  If empty, clawback is not permitted.
 * @property {string} creator The address that created this asset. This is the address where the parameters for this asset can be found, and also the address where unwanted asset units can be sent in the worst case.
 * @property {number} decimals The number of digits to use after the decimal point when displaying this asset. If 0, the asset is not divisible. If 1, the base unit of the asset is in tenths. If 2, the base unit of the asset is in hundredths, and so on. This value must be between 0 and 19 (inclusive).
 * @property {boolean} default-frozen Whether holdings of this asset are frozen by default.
 * @property {string} freeze Address of account used to freeze holdings of this asset.  If empty, freezing is not permitted.
 * @property {string} manager Address of account used to manage the keys of this asset and to destroy it.
 * @property {string} metadata-hash A commitment to some unspecified asset metadata. The format of this metadata is up to the application.
 * @property {string} name Name of this asset, as supplied by the creator.
 * @property {string} reserve Address of account holding reserve (non-minted) units of this asset.
 * @property {number} total The total number of units of this asset.
 * @property {string} unit-name Name of a unit of this asset, as supplied by the creator.
 * @property {string} url URL where more information about the asset can be retrieved.
 *
 */

/**
 *
 * @see https://testnet.algoexplorerapi.io/v1/asset/408947/info
 * @param {ExplorerIndexAsset} explorerIndexAsset The asset response
 * @returns {{circulating, total, deleted, decimals, name, verified, txid, fullName, id, url, timestamp, txns}}
 */
const toExplorerAsset = ({
  assetID: id,
  txid,
  timestamp,
  decimals,
  assetName: fullName,
  unitName: name,
  txCount: txns,
  circulatingSupply: circulating,
  destroyed: deleted,
  verified,
  url,
  verified_info,
  totalSupply: total
}) => {
  let res = {
    id,
    deleted,
    txid,
    timestamp,
    decimals,
    name: name || fullName || null,
    txns,
    fullName,
    circulating,
    verified,
    url: url || null,
    total
  }
  if (verified && verified_info) {
    res.verified_info = verified_info
  }
  return res
}

export async function fetchExplorerSearchv1(search) {
  const { data } = await axios.get(`${ALGO_EXPLORER_V1_API}/v1/search/${search}`)
  return data
}

/**
 * Fetch Asset Info
 *
 * Uses Algodex Explorer V1 Asset Info API
 *
 * @param id
 * @returns {Promise<{circulating, total, decimals, name, verified, txid, fullName, id, url, timestamp, txns}>}
 */
export async function fetchExplorerAssetInfo(id) {
  //console.debug(`Fetching ${id || 'Nothing'}`)
  if (typeof id === 'undefined') {
    throw new Error('Must have ID')
  }
  //console.debug(`${ALGO_EXPLORER_V1_API}/v1/asset/${id}/info`)
  const { data } = await axios.get(`${ALGO_EXPLORER_V1_API}/v1/asset/${id}/info`)
  //console.debug(`Fetched ${id} with ${data.txCount} transactions`)
  return toExplorerAsset(data)
}

/**
 * Map Explorer Index V2
 *
 * DO NOT USE! Not accurate, see fetchAssetInfo instead
 *
 * @param asset
 * @returns {{score: *, circulating, total, deleted, decimals, name, verified: *, fullName, id, txns}}
 */
const toExplorerAssetV2 = (asset) => {
  return {
    ...indexerAssetMap({ asset }),
    txns: asset['asset-tx-counter'],
    score: asset.params.score,
    circulating: asset.params['circulating-supply'],
    verified: asset.params.verified
  }
}
/**
 * Get Asset Info v2
 *
 * DO NOT USE! Not accurate see fetchAssetInfo
 *
 * Retrieve Asset Info from the Algorand Indexer
 * It is experimental and not accurate state.
 *
 * @see https://indexer.testnet.algoexplorerapi.io/v2/assets/408947?include-all=true
 * @param id
 * @returns {Promise<{total, deleted, decimals, name, fullName, id}>}
 */
export async function fetchAssetInfoV2(id) {
  if (typeof id === 'undefined') {
    throw new Error('Must have ID')
  }
  const {
    data: { asset }
  } = await axios.get(`${EXPLORER_INDEXER_API}/v2/assets/${id}?include-all=true`)
  return toExplorerAssetV2(asset)
}

/**
 * Get Algorand price
 *
 * Retrieve price of Algorand from the Algorand Indexer
 *
 * @see https://price.algoexplorerapi.io/price/algo-usd
 */
export async function fetchAlgorandPrice() {
  const { data } = await axios.get(`${EXPLORER_ALGORAND_PRICE}`)
  return { algoPrice: data.price }
}
