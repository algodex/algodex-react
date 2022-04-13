export const formatUSDPrice = (amount) => {
  return amount > 10000 ? Math.round(amount).toLocaleString() : amount.toFixed(2).toLocaleString()
}

export const truncatedWalletAddress = (addr, size) => {
  return `${subStringFn(0, size, addr)}....${subStringFn(addr.length - size, addr.length, addr)}`
}

export const subStringFn = (start, end, string) => {
  return `${string.substring(start, end)}`
}
