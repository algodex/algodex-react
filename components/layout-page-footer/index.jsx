import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
// import Orders from 'components/orders'
// import TradeHistory from 'components/trade-history'
// import { demoAssetsData } from 'components/assets/demo'
// import { demoOpenOrderData } from 'components/open-orders/demo'
// import { demoOrderHistoryData } from 'components/order-history/demo'
import useStore from 'store/use-store'
// import { OrdersSection, TradeHistorySection } from './footer.css'

// const DEMO_OPEN_ORDER_DATA = demoOpenOrderData
// const DEMO_ORDER_HISTORY_DATA = demoOrderHistoryData
// const DEMO_ASSETS_DATA = demoAssetsData

function PageFooter(/*props*/) {
  const asset = useStore((state) => state.asset)
  // const isSignedIn = useStore((state) => state.isSignedIn)
  // const showOrderBook = asset.isTraded || asset.hasOrders

  const [/*gridSize,*/ setGridSize] = useState({ width: 0, height: 0 })
  const gridRef = useRef()

  // const TABS = {
  //   CHART: 'CHART',
  //   BOOK: 'BOOK',
  //   TRADE: 'TRADE',
  //   ORDERS: 'ORDERS',
  //   HISTORY: 'HISTORY'
  // }

  // const [activeMobile] = useState(TABS.CHART)

  useEffect(() => {
    const handleResize = () => {
      if (gridRef?.current) {
        const { width, height } = gridRef.current.getBoundingClientRect()
        setGridSize({ width, height })
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => removeEventListener('resize', handleResize)
  }, [])

  return (
    <div>
      {/*<OrderBookSection active={activeMobile === TABS.BOOK}>*/}
      {/*  {showOrderBook ? <OrderBook /> : <FirstOrderMsg asset={asset} isSignedIn={isSignedIn} />}*/}
      {/*</OrderBookSection>*/}
      {/*<TradeHistorySection active={activeMobile === TABS.HISTORY}>*/}
      {/*  <TradeHistory />*/}
      {/*</TradeHistorySection>*/}
      {/*<OrdersSection active={activeMobile === TABS.ORDERS}>*/}
      {/*  <Orders*/}
      {/*    openOrderData={DEMO_OPEN_ORDER_DATA}*/}
      {/*    orderHistoryData={DEMO_ORDER_HISTORY_DATA}*/}
      {/*    assetData={DEMO_ASSETS_DATA}*/}
      {/*    gridSize={gridSize}*/}
      {/*  />*/}
      {/*</OrdersSection>*/}
    </div>
  )
}

PageFooter.propTypes = {
  onWalletConnect: PropTypes.func.isRequired,
  refetchWallets: PropTypes.func.isRequired
}

export default PageFooter
