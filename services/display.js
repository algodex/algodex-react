import Big from 'big.js'

export const truncateAddress = (addr) => {
  return `${addr.substr(0, 4)}...${addr.substr(addr.length - 4)}`
}

/**
 * This is a custom implementation of Number.prototype.toFixed()
 *
 * It accepts a float (string or number) and formats it for display using
 * fixed-point notation. It rounds the number to `minDigits` digits after the
 * decimal point (or more, if necessary to show a number that isn't zero).
 *
 * Returns a string representing the given number using fixed-point notation.
 *
 * The default values for `minDigits` and `maxDigits` are for rounding a price
 * in ALGOs to at least 4 decimals (but no more than 6).
 *
 * @param {Number|String} float number to format
 * @param {Number} minDigits minimum number of digits after decimal point
 * @param {Number} maxDigits maximum number of digits after decimal point
 * @returns {String}
 */
export const floatToFixed = (float, minDigits = 4, maxDigits = 6) => {
  float =  float || 0
  let numDigits
  const absValue = new Big(float).abs().toNumber()

  // checks for fractional numbers less than zero with preceding zeros after decimal point
  if (absValue > 0 && absValue < 0.1) {
    // if number is 0.0001, fractionalStr is '0001'
    const fractionalStr = new Big(float).toFixed(maxDigits).toString().split('.')[1]

    let precedingZeros
    for (let i = 0; i < fractionalStr.length; i++) {
      if (fractionalStr[i] !== '0') {
        precedingZeros = i
        break
      }
    }

    if (precedingZeros >= minDigits && precedingZeros < maxDigits) {
      numDigits = precedingZeros + 1
    } else {
      numDigits = minDigits
    }
  } else {
    numDigits = minDigits
  }

  return new Big(float).toFixed(numDigits)
}
