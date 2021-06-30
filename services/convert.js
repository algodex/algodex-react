import Big from 'big.js'

/**
 * Converts an asset amount from base units to whole units
 * Formula: amount / (10 ^ decimals)
 *
 * @param {Number} amount the asset amount in base units
 * @param {Number} decimals asset's `decimals` property (default = 6 for ALGO)
 * @returns {Number} the asset amount in whole units, e.g. 2.187
 */
export const convertFromBaseUnits = (amount, decimals = 6) => {
  const divisor = new Big(10).pow(decimals)
  const baseUnits = new Big(amount).round(decimals)
  return baseUnits.div(divisor).toNumber()
}

/**
 * Converts an asset amount from whole units to base units
 * Formula: amount * (10 ^ decimals)
 *
 * @param {Number} amount the asset amount in whole units
 * @param {Number} decimals asset's `decimals` property (default = 6 for ALGO)
 * @returns {Number} the asset amount in base units, e.g. 2187000
 */
export const convertToBaseUnits = (amount, decimals = 6) => {
  const multiplier = new Big(10).pow(decimals)
  const wholeUnits = new Big(amount).round(decimals)
  return wholeUnits.times(multiplier).toNumber()
}

/**
 * Calculates the ASA amount of a buy order given the asset price and total
 * ordered amount in base units
 *
 * @param {Number} price the asset price in whole unit ALGOs
 * @param {Number} totalCost order's total cost in microalgos
 * @param {Number} decimals asset's `decimals` property
 * @returns {Number} whole unit ASA amount being ordered
 */
export const calculateAsaBuyAmount = (price, totalCost, decimals) => {
  const wholeUnits = new Big(convertFromBaseUnits(totalCost, decimals))
  return wholeUnits.div(price).toNumber()
}

/**
 * Converts limit price for ASAs with different `decimal` properties than ALGO
 * Formula: price * (10 ^ (decimals - 6))
 *
 * @param {Number} price the asset price in whole unit ALGOs
 * @param {Number} decimals ASA's `decimals` property
 * @returns {Number} price in whole unit ALGOs
 */
export const convertAsaLimitPrice = (price, decimals) => {
  const multiplier = new Big(10).pow(decimals - 6)
  const limitPrice = new Big(price)
  return limitPrice.times(multiplier).toNumber()
}
