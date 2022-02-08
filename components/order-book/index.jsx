import { useState } from 'react'
import { aggregateOrders } from './helpers'
import OrderBookView from './view'
import useStore from 'store/use-store'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import FirstOrderMsg from 'components/first-order-msg'
import Spinner from 'components/spinner'
import Error from 'components/error'
import { useAssetOrdersQuery, useAssetPriceQuery } from 'hooks/useAlgodex'

/**
 * @param asset
 * @returns {JSX.Element}
 * @constructor
 */
export default function OrderBook({ asset }) {
  const [sellOrders, setSellOrders] = useState()
  const [buyOrders, setBuyOrders] = useState()
  const isSignedIn = useStore((state) => state.isSignedIn)

  // Orderbook Query
  const {
    data,
    isLoading: isAssetOrdersLoading,
    isError: isAssetOrdersError
  } = useAssetOrdersQuery({ asset })
  const { data: price, isLoading: isAssetPriceLoading } = useAssetPriceQuery({
    asset
  })
  const isLoading = isAssetPriceLoading || isAssetOrdersLoading

  // Massage Orders
  useEffect(() => {
    if (
      data &&
      !isLoading &&
      typeof data.sellASAOrdersInEscrow !== 'undefined' &&
      typeof data.buyASAOrdersInEscrow !== 'undefined'
    ) {
      setSellOrders(aggregateOrders(data.sellASAOrdersInEscrow, asset.decimals, 'sell'))
      setBuyOrders(aggregateOrders(data.buyASAOrdersInEscrow, asset.decimals, 'buy'))
    }
  }, [isLoading, data, setSellOrders, setBuyOrders, asset])

  // Invalid
  if (!asset?.id || isLoading) {
    return <Spinner flex />
  }

  // Is in error
  if (isAssetOrdersError || (!asset?.id && !isLoading)) {
    return <Error message={'Issue fetching Orderbook'} />
  }

  // Has no orders
  if (typeof sellOrders !== 'undefined' && typeof buyOrders !== 'undefined') {
    if (sellOrders.length === 0 && buyOrders.length === 0 && !price.isTraded) {
      return <FirstOrderMsg asset={asset} isSignedIn={isSignedIn} />
    }
  }

  // Return OrderBook
  return <OrderBookView asset={asset} buyData={buyOrders} sellData={sellOrders} />
}
OrderBook.propTypes = {
  asset: PropTypes.object.isRequired
}
