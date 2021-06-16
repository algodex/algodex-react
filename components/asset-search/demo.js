const randomFloat = (min, max, precision = 3) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(precision))
}

const randomBool = () => {
  return Math.floor(Math.random() * 2) == 0
}

const assetNames = [
  'FAME',
  'LEAF',
  'CRAB',
  'SOP',
  'LAB',
  'POLE',
  'KORE',
  'ALL',
  'MALT',
  'SPA',
  'GUM',
  'CORE',
  'PALM',
  'GPA',
  'NEST',
  'SPOT',
  'GAR',
  'PAWS',
  'LESS',
  'STYL',
  'NBA',
  'SERF',
  'MARS',
  'REAL',
  'FAWN'
]

export default function makeData(qty = assetNames.length) {
  let result = []
  for (let i = 0; i < qty; i++) {
    const multiplier = randomBool() ? 1 : -1
    const row = {
      name: assetNames[i],
      price: randomFloat(0.125, 25.369),
      change: randomFloat(0.01, 15.0, 2) * multiplier
    }
    result.push(row)
  }
  return result
}
