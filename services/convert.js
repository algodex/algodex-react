export const convertAmount = (amount, decimals = 6) => {
  return amount / 10 ** decimals
}

export const calculateBuyAmount = (price, totalCost, decimals) => {
  return convertAmount(totalCost, decimals) / price
}

export const convertAsaPrice = (price, decimals) => {
  return price * (10 ^ (decimals - 6))
}
