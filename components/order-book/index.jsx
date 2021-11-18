import { useState } from 'react'
import { aggregateOrders } from './helpers'
import OrderBookView from './view'
import useStore from 'store/use-store'
import { useQuery } from 'react-query'
import { fetchOrdersInEscrow } from 'services/algodex'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import FirstOrderMsg from '../first-order-msg'
import Spinner from '../spinner'
import Error from '../error'

/**
 * @param asset
 * @returns {JSX.Element}
 * @constructor
 */
export default function OrderBook({ explorerAsset }) {
  const [sellOrders, setSellOrders] = useState()
  const [buyOrders, setBuyOrders] = useState()
  const isSignedIn = useStore((state) => state.isSignedIn)
  // const hasBeenOrdered = asset?.isTraded || asset?.hasOrders

  // Orderbook Query
  const { data, isLoading, isError } = useQuery(
    ['orderBook', { assetId: explorerAsset?.id }],
    () => fetchOrdersInEscrow(explorerAsset?.id),
    {
      enabled: typeof explorerAsset?.id !== 'undefined'
    }
  )

  // Massage Orders
  useEffect(() => {
    if (
      data &&
      !isLoading &&
      typeof data.sellASAOrdersInEscrow !== 'undefined' &&
      typeof data.buyASAOrdersInEscrow !== 'undefined'
    ) {
      setSellOrders(aggregateOrders(data.sellASAOrdersInEscrow, explorerAsset.decimals, 'sell'))
      setBuyOrders(aggregateOrders(data.buyASAOrdersInEscrow, explorerAsset.decimals, 'buy'))
    }
  }, [data, setSellOrders, setBuyOrders, explorerAsset])

  // Invalid
  if (!explorerAsset?.id || isLoading) {
    return <Spinner flex />
  }

  // Is in error
  if (isError || (!explorerAsset?.id && !isLoading)) {
    return <Error message={'Issue fetching Orderbook'} />
  }

  // Has no orders
  if (typeof sellOrders !== 'undefined' && typeof buyOrders !== 'undefined') {
    if (sellOrders.length === 0 && buyOrders.length === 0) {
      return <FirstOrderMsg asset={explorerAsset} isSignedIn={isSignedIn} />
    }
  }

  // Return OrderBook
  return <OrderBookView asset={explorerAsset} buyData={buyOrders} sellData={sellOrders} />
}
OrderBook.propTypes = {
  explorerAsset: PropTypes.object.isRequired
}
