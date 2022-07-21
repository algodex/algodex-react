export const formatUSDPrice = (amount) => {
  return amount > 10000 ? Math.round(amount).toLocaleString() : amount.toFixed(2).toLocaleString()
}

export const assetVeryShortNameFn = (asset) => {
  return asset?.name && asset.name.length >= 1 ? asset.name : 'NO-NAME'
}
