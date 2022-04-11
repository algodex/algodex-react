export const formatUSDPrice = (amount) => {
  return amount > 10000 ? Math.round(amount).toLocaleString() : amount.toFixed(2).toLocaleString()
}
