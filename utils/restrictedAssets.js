const unrestrictedAssets = {
  31566704: 'USDC', //USDC
  465865291: 'STBL', //STBL
  386192725: 'goBTC', //goBTC
  386195940: 'goETH', //goETH
  312769: 'USDt', //USDt
  19386452: 'goETH Testet',
  15322902: 'LAMP', // LAMP Testnet
  26707058: 'SEDU', // SEDU Testnet
  15921880: 'HEAP' // HEAP Testnet
}

export function getIsRestricted(id) {
  return !Object.keys(unrestrictedAssets).includes(id.toString())
}

export function getIsRestrictedCountry(query) {
  return query?.cc === 'US' || query?.cc === 'CA'
}
