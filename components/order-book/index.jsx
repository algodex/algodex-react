import { aggregateOrders } from './helpers'
import OrderBookView from './view'
import useStore from 'store/use-store'
import { useQuery } from 'react-query'
import { fetchOrdersInEscrow } from '../../lib/api'
import { useEffect } from 'react'

export default function OrderBook() {
  const asset = useStore((state) => state.asset)
  const { sellOrders, buyOrders } = useStore((state) => state.orderBook)
  const setOrderBook = useStore((state) => state.setOrderBook)
  const hasBeenOrdered = asset?.isTraded || asset?.hasOrders

  const orderBookQuery = useQuery(
    ['orderBook', { assetId: asset?.id }],
    () => fetchOrdersInEscrow(asset?.id),
    {
      enabled: !!asset?.id && hasBeenOrdered
    }
  )

  useEffect(() => {
    if (orderBookQuery.data) {
      setOrderBook(orderBookQuery.data)
    }
  }, [orderBookQuery.data, setOrderBook])

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
