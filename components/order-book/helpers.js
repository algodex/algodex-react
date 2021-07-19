import {
  convertFromBaseUnits,
  calculateAsaBuyAmount,
  convertFromAsaLimitPrice
} from 'services/convert'

export const aggregateOrders = (asset, orders, type) => {
  const isBuyOrder = type === 'buy'
  let total = 0

  const sortOrdersToAggregate = (a, b) => {
    if (isBuyOrder) {
      return b.assetLimitPriceInAlgos - a.assetLimitPriceInAlgos
    }
    return a.assetLimitPriceInAlgos - b.assetLimitPriceInAlgos
  }

  const reduceAggregateData = (result, order) => {
    const price = convertFromAsaLimitPrice(order.assetLimitPriceInAlgos, asset.decimals)

    const orderAmount = isBuyOrder ? order.algoAmount : order.asaAmount
    const decimals = isBuyOrder ? 6 : asset.decimals

    const amount = isBuyOrder
      ? calculateAsaBuyAmount(price, orderAmount, decimals)
      : convertFromBaseUnits(orderAmount, decimals)

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

  return orders.sort(sortOrdersToAggregate).reduce(reduceAggregateData, []).sort(sortRowsByPrice)
}
