const convertAmount = (amount, decimals = 6) => {
  return amount / 10 ** decimals
}

// const convertAsaPrice = (price, decimals) => {
//   return price * (10 ^ (decimals - 6))
// }

const aggregateOrders = (asset, orders, type) => {
  const isBuyOrder = type === 'buy'
  let total = 0

  const sortOrdersToAggregate = (a, b) => {
    if (isBuyOrder) {
      return b.assetLimitPriceInAlgos - a.assetLimitPriceInAlgos
    }
    return a.assetLimitPriceInAlgos - b.assetLimitPriceInAlgos
  }

  const reduceAggregateData = (result, order) => {
    const price = order.assetLimitPriceInAlgos

    const orderAmount = isBuyOrder ? order.algoAmount : order.asaAmount
    const decimals = isBuyOrder ? 6 : asset.params.decimals
    const amount = convertAmount(orderAmount, decimals)

    total += amount

    const index = result.findIndex((obj) => obj.price === price)

    if (index !== -1) {
      result[index].amount += amount
      result[index].total += amount
      return result
    }

    result.push({
      price,
      amount,
      total
    })
    return result
  }

  const sortRowsByPrice = (a, b) => {
    return b.price - a.price
  }

  const mapToFixedDecimals = (row) => {
    return {
      ...row,
      price: row.price.toFixed(3),
      amount: row.amount.toFixed(3),
      total: row.total.toFixed(3)
    }
  }

  return orders
    .sort(sortOrdersToAggregate)
    .reduce(reduceAggregateData, [])
    .sort(sortRowsByPrice)
    .map(mapToFixedDecimals)
}

export const generateBookData = (orders, type) => {
  const asset = {
    params: {
      decimals: 6
    }
  }
  return aggregateOrders(asset, orders, type)
}
