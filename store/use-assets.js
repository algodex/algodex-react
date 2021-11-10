import { createStore } from './use-store'
import _ from 'lodash'
import { floatToFixed } from 'services/display'

/**
 * Map a Search Result to a Query Result
 *
 * Used for hydration on a fresh load
 * @param id
 * @param name
 * @param fullName
 * @param hasBeenOrdered
 * @param liquidityAlgo
 * @param liquidityAsa
 * @param rest
 * @returns {Object}
 */
export function mapToQueryResult({
  id,
  name,
  fullName,
  hasBeenOrdered,
  liquidityAlgo,
  liquidityAsa,
  ...rest
}) {
  return {
    assetId: id,
    unitName: name,
    assetName: fullName,
    hasOrders: hasBeenOrdered,
    isTraded: hasBeenOrdered,
    formattedAlgoLiquidity: liquidityAlgo,
    formattedASALiquidity: liquidityAsa,
    ...rest
  }
}

/**
 * Map a Query Result to a Search Result
 * @param assetId
 * @param assetName
 * @param formattedPrice
 * @param priceChg24Pct
 * @param hasOrders
 * @param isTraded
 * @param verified
 * @param unitName
 * @param formattedASALiquidity
 * @param formattedAlgoLiquidity
 * @returns {Object}
 */
export function mapToSearchResults({
  assetId,
  assetName,
  formattedPrice,
  priceChg24Pct,
  hasOrders,
  isTraded,
  verified,
  unitName,
  formattedASALiquidity,
  formattedAlgoLiquidity
}) {
  const price = formattedPrice ? floatToFixed(formattedPrice) : hasOrders ? '--' : null

  const change = !isNaN(parseFloat(priceChg24Pct))
    ? floatToFixed(priceChg24Pct, 2)
    : hasOrders
    ? '--'
    : null

  return {
    id: assetId,
    name: unitName,
    fullName: assetName,
    verified: verified,
    hasBeenOrdered: isTraded || hasOrders,
    liquidityAlgo: formattedAlgoLiquidity,
    liquidityAsa: formattedASALiquidity,
    price,
    change
  }
}

const assetsSearch = (set, get) => ({
  getCount: () => Object.keys(get().assets).length,
  assets: {},
  setAssets: (assets) =>
    set({
      assets: _.merge(get().assets, assets)
    })
})

const options = {
  name: 'assets',
  version: 3
}

const localstorage = true

export default createStore({ config: assetsSearch, options, localstorage })
