import toast from 'react-hot-toast'

export const formatUSDPrice = (amount) => {
  return amount > 10000 ? Math.round(amount).toLocaleString() : amount.toFixed(2).toLocaleString()
}

export const truncatedWalletAddress = (addr, size) => {
  return `${subStringFn(0, size, addr)}....${subStringFn(addr.length - size, addr.length, addr)}`
}

export const subStringFn = (start, end, string) => {
  return `${string.substring(start, end)}`
}

export const copyAddress = (address) => {
  window.navigator.clipboard.writeText(address).then(
    () => {
      toast.success('Copied wallet address to clipboard!')
    },
    () => {
      toast.error('Failed to copy wallet address to clipboard')
    }
  )
}

export const setExplorerLink = (addr, network) => {
  return network === 'testnet'
    ? `https://testnet.algoexplorer.io/address/${addr}`
    : `https://algoexplorer.io/address/${addr}`
}

export const roundValue = (value, decimalLimit) => {
  if (value === '' || value.slice(-1) === '0') {
    return value
  }

  const split = value.toString().split('.')
  const hasDecimals = split.length > 1

  if (hasDecimals && split[1].length >= decimalLimit) {
    return parseFloat(value).toFixed(decimalLimit).toString()
  }

  return value
}
