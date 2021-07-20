import Big from 'big.js'

/**
 * Converts an asset amount from base units to whole units
 *
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
 *
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
 * @returns {Number} whole unit ASA amount being ordered
 */
export const calculateAsaBuyAmount = (price, totalCost) => {
  const wholeUnitCost = new Big(convertFromBaseUnits(totalCost))
  const algoDecimals = 6
  return wholeUnitCost.div(price).round(algoDecimals).toNumber()
}

/**
 * Converts limit price or balance in ALGOs to ASA units (for ASAs with
 * different `decimal` properties than ALGO).
 *
 * Formula: asa_units = algo_units * (10 ^ (6 - decimals))
 *
 * @param {Number} toConvert a price/balance in ALGOs
 * @param {Number} decimals ASA's `decimals` property
 * @returns {Number} converted price/balance
 */
export const convertToAsaUnits = (toConvert, decimals) => {
  if (!toConvert) {
    return 0
  }
  const multiplier = new Big(10).pow(6 - decimals)
  const algoUnits = new Big(toConvert)
  return algoUnits.times(multiplier).toNumber()
}

/**
 * Converts limit price or balance in ASA units to ALGOs (for ASAs with
 * different `decimal` properties than ALGO).
 *
 * Formula: algo_units = asa_price * (10 ^ (decimals - 6))
 *
 * @param {Number} toConvert a price/balance in ASA units
 * @param {Number} decimals ASA's `decimals` property
 * @returns {Number} converted price/balance
 */
export const convertFromAsaUnits = (toConvert, decimals) => {
  if (!toConvert) {
    return 0
  }
  const multiplier = new Big(10).pow(decimals - 6)
  const asaUnits = new Big(toConvert)
  return asaUnits.times(multiplier).toNumber()
}
