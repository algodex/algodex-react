const accumulateOrders = (orders, type) => {
  return orders
    .reduce((result, order) => {
      const amount = type === 'buy' ? order.algoAmount : order.asaAmount
      const price = parseFloat(order.assetLimitPriceInAlgos)

      const idx = result.findIndex((obj) => obj.price === price)

      if (idx !== -1) {
        result[idx].amount += amount
      } else {
        result.push({
          price,
          amount
        })
      }
      return result
    }, [])
    .sort((a, b) => {
      if (type === 'buy') {
        return b.price - a.price
      }
      return a.price - b.price
    })
}

const aggregateTotals = (arr) => {
  let total = 0
  let result = []

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    total += item.amount
    result.push({
      ...item,
      total
    })
  }

  return result
}

export const generateBookData = (orders, type) => {
  const accumulated = accumulateOrders(orders, type)

  return aggregateTotals(accumulated).sort((a, b) => b.price - a.price)
}
