import { aggregateOrders } from './helpers'
import OrderBookView from './view'
import useStore from 'store/use-store'

export default function OrderBook() {
  const asset = useStore((state) => state.asset)
  const { sellOrders, buyOrders } = useStore((state) => state.orderBook)

  const sellData = aggregateOrders(sellOrders, asset.decimals, 'sell')
  const buyData = aggregateOrders(buyOrders, asset.decimals, 'buy')

  return (
    <OrderBookView
      price={asset.price}
      decimals={asset.decimals}
      buyData={buyData}
      sellData={sellData}
      priceChange={asset.priceChange24hr}
    />
  )
}
