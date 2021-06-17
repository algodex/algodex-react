export const randomInt = (min, max) => {
  return min + Math.floor(Math.random() * (max - min))
}

export const generateBookData = (startPrice, increment, qty = 24) => {
  let result = []
  let total = 0
  for (let i = 0; i < qty; i++) {
    const amount = randomInt(1, 500)
    total = total + amount
    const row = {
      price: (i * increment + startPrice).toFixed(4),
      amount,
      total
    }
    result.push(row)
  }
  return result.sort((a, b) => b.price - a.price)
}
