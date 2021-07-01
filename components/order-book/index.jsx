import { useQuery } from 'react-query'
import { fetchOrdersInEscrow } from 'lib/api'
import { aggregateOrders } from './helpers'
import Spinner from 'components/spinner'
import Error from 'components/error'
import OrderBookView from './view'
import useStore from 'store/use-store'

export default function OrderBook() {
  const asset = useStore((state) => state.asset)

  const { status, data } = useQuery(['ordersInEscrow', { assetId: asset.id }], () =>
    fetchOrdersInEscrow(asset.id)
  )

  if (status === 'loading') {
    return <Spinner flex />
  }
  if (status === 'error') {
    return <Error message="Error loading order book" flex />
  }

  const sellData = aggregateOrders(asset, data.sellASAOrdersInEscrow, 'sell')
  const buyData = aggregateOrders(asset, data.buyASAOrdersInEscrow, 'buy')

  return (
    <>
      <OrderBookView asset={asset} buyData={buyData} sellData={sellData} priceChange={0.001} />
    </>
  )
}
