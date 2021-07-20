import algodex from '@algodex/algodex-sdk'
import { convertToBaseUnits, convertToAsaLimitPrice } from './convert'

const OrderService = {
  placeOrder: (order, orderBook) => {
    console.log('OrderService.placeOrder', { order })
    const assetId = order.asset.id
    const address = order.address
    const minimumAmount = 0

    const asaAmount = convertToBaseUnits(order.amount, order.asset.decimals)
    const algoAmount = convertToBaseUnits(order.total)

    const price = convertToAsaLimitPrice(order.price, order.asset.decimals)
    const { n: numerator, d: denominator } = algodex.getNumeratorAndDenominatorFromPrice(price)

    const AlgodClient = new algodex.initAlgodClient('test')

    if (order.execution === 'maker') {
      if (order.type === 'buy') {
        console.log('Maker buy order', {
          address,
          price,
          assetId,
          algoAmount
        })
        return algodex.placeAlgosToBuyASAOrderIntoOrderbook(
          AlgodClient,
          address,
          numerator,
          denominator,
          minimumAmount,
          assetId,
          algoAmount
        )
      } else if (order.type === 'sell') {
        console.log('Maker sell order', {
          address,
          price,
          assetId,
          asaAmount
        })
        return algodex.placeASAToSellASAOrderIntoOrderbook(
          AlgodClient,
          address,
          numerator,
          denominator,
          minimumAmount,
          assetId,
          asaAmount
        )
      }
    }

    if (order.execution === 'taker') {
      const isSellOrder = order.type === 'sell'
      const limitPrice = convertToAsaLimitPrice(order.price, order.asset.decimals)

      const allOrderBookOrders = OrderService.getAllEscrowOrders(orderBook)

      console.log(`Taker ${order.type} order`, {
        isSellOrder,
        assetId,
        address,
        limitPrice,
        asaAmount,
        algoAmount
      })

      return algodex.executeOrderAsTaker(
        AlgodClient,
        isSellOrder,
        assetId,
        address,
        limitPrice,
        asaAmount,
        algoAmount,
        allOrderBookOrders
      )
    }
  },

  getAllEscrowOrders: (orderBook) => {
    const mapOrders = (orders, type) => {
      return orders.map((order) => ({
        orderEntry: `${order.assetLimitPriceN}-${order.assetLimitPriceD}-${order.minimumExecutionSizeInAlgo}-${order.assetId}`,
        price: order.assetLimitPriceInAlgos,
        n: order.assetLimitPriceN,
        d: order.assetLimitPriceD,
        min: order.minimumExecutionSizeInAlgo,
        escrowAddr: order.escrowAddress,
        algoBalance: order.algoAmount,
        asaBalance: order.asaAmount,
        escrowOrderType: type,
        isASAEscrow: type === 'sell',
        orderCreatorAddr: order.ownerAddress,
        assetId: order.assetId
      }))
    }

    return [...mapOrders(orderBook.buyOrders, 'buy'), ...mapOrders(orderBook.sellOrders, 'sell')]
  }
}

export default OrderService
