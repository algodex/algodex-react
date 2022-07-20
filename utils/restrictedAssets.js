const unrestrictedAssets = {
  31566704: 'USDC', //USDC
  465865291: 'STBL', //STBL
  386192725: 'goBTC', //goBTC
  386195940: 'goETH', //goETH
  793124631: 'gALGO', //gALGO
  312769: 'USDt', //USDt
  19386452: 'goETH Testet',
  15322902: 'LAMP', // LAMP Testnet
  26707058: 'SEDU', // SEDU Testnet
  15921880: 'HEAP' // HEAP Testnet
}

const NETWORK_TYPE = process.env.NEXT_PUBLIC_ALGORAND_NETWORK
export function getIsRestricted(id) {
  if (NETWORK_TYPE !== 'mainnet') return false
  return !Object.keys(unrestrictedAssets).includes(id.toString())
}

export function getIsRestrictedCountry(query) {
  if (NETWORK_TYPE !== 'mainnet') return false
  return query?.cc === 'US' || query?.cc === 'CA'
}

export function getAssetTotalStatus(total) {
  if (NETWORK_TYPE !== 'mainnet') return false
  if (typeof total === 'undefined') return false
  if (total > 1000) {
    return true
  } else {
    return false
  }
}
