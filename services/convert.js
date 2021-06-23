export const convertAmount = (amount, decimals = 6) => {
  return amount / 10 ** decimals
}
