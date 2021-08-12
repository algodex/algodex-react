export const mapAssetsData = (data) => {
  if (!data || !data.allAssets || !data.allAssets.length) {
    return null
  }

  const { allAssets: assetsData } = data

  const assets = assetsData.map(
    ({
      unit_name,
      name,
      formattedTotalASAAmount,
      formattedASAAvailable,
      formattedASAInOrder,
      formattedTotalAlgoEquiv
    }) => {
      return {
        coin: unit_name,
        name,
        total: formattedTotalASAAmount || '',
        available: formattedASAAvailable || '',
        'in-order': formattedASAInOrder || '',
        'algo-value': formattedTotalAlgoEquiv || ''
      }
    }
  )

  return assets
}
