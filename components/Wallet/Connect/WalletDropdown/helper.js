export const subStringFn = (start, end, string) => {
  return `${string.substring(start, end)}`
}

export const setExplorerLink = (addr, network) => {
  return network === 'testnet'
    ? `https://testnet.algoexplorer.io/address/${addr}`
    : `https://algoexplorer.io/address/${addr}`
}

export const truncatedWalletAddress = (addr, size) => {
  return `${subStringFn(0, size, addr)}....${subStringFn(
    addr.length - size,
    addr.length,
    addr
  )}`
}
