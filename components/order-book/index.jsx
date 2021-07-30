import { aggregateOrders } from './helpers'
import OrderBookView from './view'
import useStore from 'store/use-store'

export default function OrderBook() {
  const asset = useStore((state) => state.asset)
  const { sellOrders, buyOrders, decimals } = useStore((state) => state.orderBook)

  const sellData = aggregateOrders(sellOrders, decimals, 'sell')
  const buyData = aggregateOrders(buyOrders, decimals, 'buy')

  return (
    <OrderBookView
      price={asset.price}
      decimals={decimals}
      buyData={buyData}
      sellData={sellData}
      priceChange={0.001}
    />
  )
}
