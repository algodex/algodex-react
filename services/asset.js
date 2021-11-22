/**
 * @typedef {Object} explorerAsset
 * @property {number} assetId Unique asset identifier.
 * @property {boolean} destroyed Whether or not this asset is currently deleted.
 * @property {number} destroyed-at-round Round during which this asset was destroyed.
 * @property {IndexAssetParams} params Specifies the parameters for an asset.
 * @todo: Strongly Type/Prop Validation
 */

export const Asset = {
  id: String,
  deleted: Boolean,
  txid: String,
  timestamp: Number,
  decimals: Number,
  name: String || null,
  txns: Number,
  fullName: String,
  circulating: Number,
  verified: Boolean,
  url: String || null,
  total: Number
}
