import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import { fetchOrdersInEscrow } from 'lib/api'
import { generateBookData } from './helpers'
import Spinner from 'components/spinner'
import Error from 'components/error'
import OrderBookView from './view'

function OrderBook(props) {
  const { assetId, ...rest } = props

  const { status, data } = useQuery(['ordersInEscrow', { assetId }], () =>
    fetchOrdersInEscrow(assetId)
  )

  if (status === 'loading') {
    return <Spinner flex />
  }
  if (status === 'error') {
    return <Error message="Error loading order book" flex />
  }

  const sellData = generateBookData(data.sellASAOrdersInEscrow, 'sell')
  const buyData = generateBookData(data.buyASAOrdersInEscrow, 'buy')

  return <OrderBookView buyData={buyData} sellData={sellData} {...rest} />
}

OrderBook.propTypes = {
  assetName: PropTypes.string.isRequired,
  currentPrice: PropTypes.number.isRequired,
  priceChange: PropTypes.number.isRequired,
  assetId: PropTypes.number.isRequired
}

export default OrderBook
