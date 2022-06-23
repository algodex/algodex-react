import BigJS from 'big.js'
import { calculateAsaBuyAmount } from 'services/convert'
import { convertFromAsaUnits } from 'services/convert'
import { floatToFixed } from 'services/display'

export const customAggregator = (order, decimals) => {
  console.log(order, decimals, 'both hhere')
  return []
}

export const aggregateOrders = (orders, asaDecimals, type) => {
  const isBuyOrder = type === 'buy'
  const leftPriceDecimalsLength = orders.map((order) => {
    const price = new BigJS(convertFromAsaUnits(order.asaPrice, asaDecimals))
    const left = Math.floor(price)
    const right = price.sub(left)

    return right !== 0 && right.toString().length > 2 ? right.toString().length - 2 : 0
  })

  const decimalLength =
    leftPriceDecimalsLength.length === 0 ? 0 : Math.max(...leftPriceDecimalsLength)

  const sortOrdersToAggregate = (a, b) => {
    if (isBuyOrder) {
      return b.asaPrice - a.asaPrice
    }
    return a.asaPrice - b.asaPrice
  }

  const reduceAggregateData = (result, order) => {
    const _price = convertFromAsaUnits(order.asaPrice, asaDecimals)
    const price = floatToFixed(_price, 6, decimalLength)
    const orderAmount = isBuyOrder ? order.algoAmount : order.asaAmount

    const amount = isBuyOrder
      ? calculateAsaBuyAmount(price, orderAmount)
      : parseFloat(order.formattedASAAmount)

    const index = result.findIndex((obj) => obj.price === price)

    if (index !== -1) {
      result[index].amount += amount
      result[index].total += amount
      return result
    }

    const model = {
      price,
      amount
    }

    result.push(model)
    return result
  }

  const sortRowsByPrice = (a, b) => {
    return b.price - a.price
  }

  return orders.sort(sortOrdersToAggregate).reduce(reduceAggregateData, []).sort(sortRowsByPrice)
}
