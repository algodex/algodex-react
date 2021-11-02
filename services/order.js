import algodex from '@algodex/sdk'
import { convertToBaseUnits, convertToAsaUnits } from '@algodex/common/lib/utility/convert.js'

const AlgodClient = new algodex.initAlgodClient('public_test')

const OrderService = {
  placeOrder: (order, orderBook) => {
    console.log('OrderService.placeOrder', { order })
    const assetId = order.asset.id
    const address = order.address
    const minimumAmount = 0

    const asaAmount = convertToBaseUnits(order.amount, order.asset.decimals)
    const algoAmount = convertToBaseUnits(order.total)

    const price = convertToAsaUnits(order.price, order.asset.decimals)
    const { n: numerator, d: denominator } = algodex.getNumeratorAndDenominatorFromPrice(price)

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

    const isSellOrder = order.type === 'sell'
    const limitPrice = convertToAsaUnits(order.price, order.asset.decimals)

    const allOrderBookOrders = OrderService.getAllEscrowOrders(orderBook)

    if (order.execution === 'taker') {
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

    // order.execution === 'both' (default)

    console.log(`Maker/Taker ${order.type} order`, {
      isSellOrder,
      assetId,
      address,
      limitPrice,
      asaAmount,
      algoAmount
    })

    return algodex.executeOrderAsMakerAndTaker(
      AlgodClient,
      isSellOrder,
      assetId,
      address,
      limitPrice,
      asaAmount,
      algoAmount,
      allOrderBookOrders
    )
  },

  getAllEscrowOrders: (orderBook) => {
    const mapOrders = (orders, type) => {
      return orders.map((order) => ({
        orderEntry: `${order.assetLimitPriceN}-${order.assetLimitPriceD}-${order.minimumExecutionSizeInAlgo}-${order.assetId}`,
        price: order.assetLimitPriceInAlgos,
        n: order.assetLimitPriceN,
        d: order.assetLimitPriceD,
        min: order.minimumExecutionSizeInAlgo,
        version: order.version,
        escrowAddr: order.escrowAddress,
        algoBalance: order.algoAmount,
        asaBalance: order.asaAmount,
        escrowOrderType: type,
        isASAEscrow: type === 'sell',
        orderCreatorAddr: order.ownerAddress,
        assetId: order.assetId
      }))
    }
    return mapOrders(orderBook.buyOrders, 'buy').concat(mapOrders(orderBook.sellOrders, 'sell'))
  },

  /**
   * Closes an existing order and refunds the escrow account to the owner
   *
   * @param {String} escrowAccountAddr: public address of the escrow account
   * @param {String}       creatorAddr: public address of the owner of the escrow account
   * @param {String}    orderBookEntry: blockchain order book string. For example "2500-625-0-15322902" (N-D-min-assetId)
   * @param {int}              version: escrow contract version
   * @returns {Object} Promise for when the transaction is fully confirmed
   */
  closeOrder: async (escrowAccountAddr, creatorAddr, orderBookEntry, version) => {
    return await algodex.closeOrderFromOrderBookEntry(
      AlgodClient,
      escrowAccountAddr,
      creatorAddr,
      orderBookEntry,
      version
    )
  }
}

export default OrderService
