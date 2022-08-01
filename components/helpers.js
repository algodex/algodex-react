export const formatUSDPrice = (amount) => {
  return amount > 10000 ? Math.round(amount).toLocaleString() : amount.toFixed(2).toLocaleString()
}

export const formatAmountFn = (amount, decimals) => {
  try {
    let splited_amount = amount.toFixed(decimals).split('.') // Split amount based on decimal
    let strip_amount = parseInt(splited_amount[1], 10).toString() // Strip Preceding zeros
    // let index = splited_amount[1].indexOf(strip_amount[0]) // Get index of first value greater than 0

    if (strip_amount.length > 6) return amount.toFixed(6)
    let exponent = splited_amount[1]?.length - strip_amount.length
    if (exponent >= 5) {
      let formatted_result = strip_amount.padStart(6, '0').concat(`e-${decimals - 6}`)
      return `${Math.round(splited_amount[0])}.`.concat(formatted_result)
    }
    return amount.toFixed(Math.min(decimals))
  } catch (error) {
    console.debug(error, 'An error occured')
  }
}

export const assetVeryShortNameFn = (asset) => {
  return asset?.name && asset.name.length >= 1 ? asset.name : 'NO-NAME'
}
