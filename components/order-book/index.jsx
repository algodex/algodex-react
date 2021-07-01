import { aggregateOrders } from './helpers'
import OrderBookView from './view'
import useStore from 'store/use-store'

export default function OrderBook() {
  const asset = useStore((state) => state.asset)
  const orderBook = useStore((state) => state.orderBook)

  const sellData = aggregateOrders(asset, orderBook.sellOrders, 'sell')
  const buyData = aggregateOrders(asset, orderBook.buyOrders, 'buy')

  return (
    <>
      <OrderBookView asset={asset} buyData={buyData} sellData={sellData} priceChange={0.001} />
    </>
  )
}
