import { calculateAsaBuyAmount } from 'services/convert'
import { floatToFixed } from 'services/display'
import { convertFromAsaUnits } from 'services/convert'
import BigJS from 'big.js'

export const aggregateOrders = (orders, asaDecimals, type) => {
  const isBuyOrder = type === 'buy'
  let total = 0

  const leftPriceDecimalsLength = orders.map((order) => {
    const price = new BigJS(convertFromAsaUnits(order.asaPrice, asaDecimals))
    const left = Math.floor(price)
    const right = price.sub(left)
    return right.toString().length - 2
  })
  const decimalLength = Math.max(...leftPriceDecimalsLength)

  const sortOrdersToAggregate = (a, b) => {
    if (isBuyOrder) {
      return b.asaPrice - a.asaPrice
    }
    return a.asaPrice - b.asaPrice
  }

  const reduceAggregateData = (result, order) => {
    const _price = convertFromAsaUnits(order.asaPrice, asaDecimals)
    const price = floatToFixed(_price, decimalLength, decimalLength)
    const orderAmount = isBuyOrder ? order.algoAmount : order.asaAmount

    const amount = isBuyOrder
      ? calculateAsaBuyAmount(price, orderAmount)
      : parseFloat(order.formattedASAAmount)

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
