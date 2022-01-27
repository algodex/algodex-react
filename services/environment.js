export const getAlgodexEnvironment = () => {
  return process.env.NEXT_PUBLIC_ALGODEX_ENV || 'public_test'
}

export const getActiveNetwork = () => {
  return process.env.NEXT_PUBLIC_ALGORAND_NETWORK &&
    process.env.NEXT_PUBLIC_ALGORAND_NETWORK.toLowerCase() === 'mainnet'
    ? 'mainnet'
    : 'testnet'
}

export const getDefaultAsset = () => {
  // Default to LAMP (available on Testnet only)
  return process.env.NEXT_PUBLIC_DEFAULT_ASSET || 15322902
}
