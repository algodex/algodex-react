import Big from 'big.js'

export const truncateAddress = (addr) => {
  return `${addr.substr(0, 4)}...${addr.substr(addr.length - 4)}`
}

/**
 * Takes an asset price and formats it for display. Rounds price to 3 decimals,
 * or more if there are preceding zeros. The max number of decimals is 6, since
 * this is an ALGO price
 *
 * @param {Number|String} price asset price in ALGOs
 * @returns {String} price formatted for display
 */
export const displayPrice = (price) => {
  const parsedPrice = parseFloat(price)

  if (isNaN(parsedPrice)) {
    throw new Error(`Invalid price`)
  }

  if (parsedPrice < 0.1) {
    const precise = new Big(price).toPrecision(3).toString()

    if (precise.length > 8) {
      return new Big(precise).toFixed(6)
    }
    return precise
  } else {
    return new Big(price).toFixed(3)
  }
}
