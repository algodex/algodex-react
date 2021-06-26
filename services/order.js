import algodex from '@algodex/algodex-sdk'
import { convertOrderAmount } from './convert'

const OrderService = {
  placeOrder: (order) => {
    const assetId = order.asset.id
    const address = order.address
    const minimumAmount = 0

    const asaAmount = convertOrderAmount(parseFloat(order.amount), order.asset.decimals)
    const algoAmount = convertOrderAmount(parseFloat(order.total))

    const price = parseFloat(order.price)
    const { n: numerator, d: denominator } = algodex.getNumeratorAndDenominatorFromPrice(price)

    const AlgodClient = new algodex.initAlgodClient('test')

    if (order.execution === 'maker') {
      if (order.type === 'buy') {
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
  }
}

export default OrderService
