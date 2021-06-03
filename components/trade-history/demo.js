export const randomInt = (min, max) => {
  return min + Math.floor(Math.random() * (max - min))
}

export const generateTradesData = (startPrice, increment, qty = 48) => {
  let result = []
  const now = new Date()
  for (let i = 0; i < qty; i++) {
    const amount = randomInt(1, 300)
    let timestamp = new Date(+now)
    timestamp = timestamp.getTime() - 1000 * i
    const row = {
      price: (i * increment + startPrice).toFixed(4),
      amount,
      timestamp
    }
    result.push(row)
  }
  return result
}
