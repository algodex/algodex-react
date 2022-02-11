import axios from 'axios'

const DEBUG = process.env.NEXT_PUBLIC_DEBUG || process.env.DEBUG || false
export const ALGORAND_API = process.env.NEXT_PUBLIC_ALGORAND_API || 'https://testnet.algoexplorerapi.io'
export const ALGORAND_INDEXER_API =
  process.env.NEXT_PUBLIC_ALGORAND_INDEXER_API || 'https://testnet.algoexplorerapi.io/idx2'

DEBUG && console.info('ALGORAND_HOST: ' + ALGORAND_API)

/**
 * @see https://testnet.algoexplorerapi.io/idx2/v2/assets/185
 * @typedef {Object} IndexAsset
 * @property {number} index Unique asset identifier.
 * @property {number} created-at-round Round during which this asset was created.
 * @property {boolean} deleted Whether or not this asset is currently deleted.
 * @property {number} destroyed-at-round Round during which this asset was destroyed.
 * @property {IndexAssetParams} params Specifies the parameters for an asset.
 */

/**
 * @see https://testnet.algoexplorerapi.io/idx2/v2/assets/185
 * @typedef {Object} IndexAssetParams
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

function mapAlgorandToAlgodexByType(type, data) {
  switch (type) {
    case 'index-asset':
      return data.map(indexerAssetMap)
    default:
      console.log(`Not valid type ${type}`)
      throw new Error('Invalid Type')
  }
}

/**
 *
 *
 * @param {IndexAsset} asset
 * @returns {{total, deleted, decimals, name, fullName, id}}
 */
export const indexerAssetMap = ({ asset }) => ({
  id: asset.index,
  created: asset['created-at-round'],
  deleted: asset.deleted,
  name: asset.params['unit-name'],
  fullName: asset.params.name,
  decimals: asset.params.decimals,
  total: asset.params.total,
  url: asset.params.url || null
})

/**
 * Fetch all assets from Algorand
 *
 * @see https://developer.algorand.org/docs/rest-apis/indexer/#get-v2assets
 * @returns {Promise<Object>}
 */
export async function getAllAlgorandAssets() {
  DEBUG && console.debug('Get All Algorand Assets')
  let {
    data: { assets, 'next-token': token }
  } = await getAlgorandIndexAssets({ limit: 250 })

  let response = mapAlgorandToAlgodexByType('index-asset', assets)

  while (token) {
    DEBUG && console.debug(`Fetching at ${token}`)
    const {
      data: { assets: nextAssets, 'next-token': nextToken }
    } = await getAlgorandIndexAssets({ token, limit: 250 })

    response = response.concat(mapAlgorandToAlgodexByType('index-asset', nextAssets))

    token = nextToken
  }
  DEBUG && console.debug(`Return ${response.length} Algorand Assets ${response[0].id}`)
  return response
}

/**
 * Get Algorand Assets
 * @see https://developer.algorand.org/docs/rest-apis/indexer/#get-v2assets
 * @param params
 * @returns {Promise<AxiosResponse<Object>>}
 */
export async function getAlgorandIndexAssets(params) {
  DEBUG && console.debug(`getAlgorandIndexAssets(${JSON.stringify(params)})`)
  return await axios.get(`${ALGORAND_INDEXER_API}/v2/assets`, { params })
}
