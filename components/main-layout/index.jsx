import { useEffect, useRef, useState } from 'react'
import SplitPane, { Pane } from 'react-split-pane'
import PropTypes from 'prop-types'
import AssetSearch from 'components/asset-search'
import Chart from 'components/chart'
import MobileInterface from 'components/mobile-interface'
import OrderBook from 'components/order-book'
import Orders from 'components/orders'
import PlaceOrder from 'components/place-order'
import TradeHistory from 'components/trade-history'
import Wallet from 'components/wallet'
import AssetInfo from 'components/asset-info'
import FirstOrderMsg from 'components/first-order-msg'
import { demoAssetsData } from 'components/assets/demo'
import { demoOpenOrderData } from 'components/open-orders/demo'
import { demoOrderHistoryData } from 'components/order-history/demo'
import useStore from 'store/use-store'
import OrderBookPrice from 'components/order-book-price'

import detectMobileDisplay from 'utils/detectMobileDisplay'

import {
  AssetsSection,
  ChartSection,
  Main,
  MainWrapper,
  OrderBookSection,
  OrdersSection,
  TradeHistorySection,
  TradeSection,
  WalletSection,
  MobileMenu,
  MobileMenuButton,
  MobilePriceSection,
  SearchAndChartSection
} from './main-layout.css'

import { ChartOverlay } from '../asset-search/info-flyover/info-flyover.css'

const DEMO_OPEN_ORDER_DATA = demoOpenOrderData
const DEMO_ORDER_HISTORY_DATA = demoOrderHistoryData
const DEMO_ASSETS_DATA = demoAssetsData

function MainLayout(props) {
  const { onWalletConnect, refetchWallets } = props

  // const asset = useStore((state) => state.asset)
  const asset = {}

  const isSignedIn = useStore((state) => state.isSignedIn)
  const showOrderBook = asset.isTraded || asset.hasOrders
  const showAssetInfo = useStore((state) => state.showAssetInfo)

  const [gridSize, setGridSize] = useState({ width: 0, height: 0 })
  const gridRef = useRef()

  const [showOverlay, setShowOverlay] = useState(false)

  const TABS = {
    CHART: 'CHART',
    BOOK: 'BOOK',
    TRADE: 'TRADE',
    ORDERS: 'ORDERS',
    HISTORY: 'HISTORY'
  }

  const [activeMobile, setActiveMobile] = useState(TABS.CHART)
  const showMobile = detectMobileDisplay()

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

  const renderSection = (activeMobile) => {
    switch (activeMobile) {
      case TABS.CHART:
        return (
          <SearchAndChartSection active={activeMobile === TABS.CHART}>
            <AssetsSection>
              <AssetSearch gridSize={gridSize} onInfoChange={(show) => setShowOverlay(show)} />
            </AssetsSection>
            <ChartSection>
              {asset.isTraded && !showAssetInfo ? <Chart /> : <AssetInfo />}
              <ChartOverlay isActive={showOverlay} />
            </ChartSection>
          </SearchAndChartSection>
        )
      case TABS.BOOK:
        return (
          <OrderBookSection active={activeMobile === TABS.BOOK}>
            {showOrderBook ? (
              <OrderBook />
            ) : (
              <FirstOrderMsg asset={asset} isSignedIn={isSignedIn} />
            )}
          </OrderBookSection>
        )
      case TABS.TRADE:
        return (
          <TradeSection active={activeMobile === TABS.TRADE}>
            <PlaceOrder refetchWallets={refetchWallets} />
          </TradeSection>
        )
      case TABS.ORDERS:
        return (
          <OrdersSection active={activeMobile === TABS.ORDERS}>
            <Orders
              openOrderData={DEMO_OPEN_ORDER_DATA}
              orderHistoryData={DEMO_ORDER_HISTORY_DATA}
              assetData={DEMO_ASSETS_DATA}
              gridSize={gridSize}
            />
          </OrdersSection>
        )
      case TABS.WALLET:
        return (
          <WalletSection active={activeMobile === TABS.WALLET}>
            <Wallet onWalletConnect={onWalletConnect} />
          </WalletSection>
        )
    }
  }

  const renderMobile = () => {
    return (
      <>
        {renderSection(activeMobile)}
        <MobileMenu>
          <ul>
            <li>
              <MobileMenuButton type="button" onClick={() => setActiveMobile(TABS.CHART)}>
                Chart
              </MobileMenuButton>
            </li>
            <li>
              <MobileMenuButton type="button" onClick={() => setActiveMobile(TABS.BOOK)}>
                Book
              </MobileMenuButton>
            </li>
            <li>
              <MobileMenuButton type="button" onClick={() => setActiveMobile(TABS.TRADE)}>
                Trade
              </MobileMenuButton>
            </li>
            <li>
              <MobileMenuButton type="button" onClick={() => setActiveMobile(TABS.ORDERS)}>
                Orders
              </MobileMenuButton>
            </li>
            <li>
              <MobileMenuButton type="button" onClick={() => setActiveMobile(TABS.WALLET)}>
                WALLET
              </MobileMenuButton>
            </li>
          </ul>
        </MobileMenu>
      </>
    )
  }

  return (
    <MainWrapper>
      <Main ref={gridRef}>
        {showMobile ? renderMobile() : (
      <SplitPane split="vertical">
        <SplitPane size={"75%"} split="horizontal">
          <SplitPane size={'70%'} split="vertical">
          
            <AssetsSection>
              <AssetSearch gridSize={gridSize} onInfoChange={(show) => setShowOverlay(show)} />
            </AssetsSection>
   
            <SplitPane size={"66%"}>
              <ChartSection>
                {asset.isTraded && !showAssetInfo ? <Chart /> : <AssetInfo />}
                <ChartOverlay isActive={showOverlay} />
              </ChartSection>
            </SplitPane>
          </SplitPane>

          <OrdersSection active={activeMobile === TABS.ORDERS}>
            <Orders
              openOrderData={DEMO_OPEN_ORDER_DATA}
              orderHistoryData={DEMO_ORDER_HISTORY_DATA}
              assetData={DEMO_ASSETS_DATA}
              gridSize={gridSize}
            />
          </OrdersSection>
        </SplitPane>
        <SplitPane initialSize="20%" split="horizontal">
          <OrderBookSection active={activeMobile === TABS.BOOK}>
            {showOrderBook ? (
              <OrderBook />
            ) : (
              <FirstOrderMsg asset={asset} isSignedIn={isSignedIn} />
            )}
          </OrderBookSection>
          <TradeHistorySection active={activeMobile === TABS.HISTORY}>
            <TradeHistory />
          </TradeHistorySection>
        </SplitPane>
        <SplitPane initialSize="20%" split="horizontal">
          <SplitPane size={'25%'}>
            <WalletSection active={activeMobile === TABS.WALLET}>
              <Wallet onWalletConnect={onWalletConnect} />
            </WalletSection>
          </SplitPane>
          <SplitPane>
            <TradeSection active={activeMobile === TABS.TRADE}>
              <PlaceOrder refetchWallets={refetchWallets} />
            </TradeSection>
          </SplitPane>
        </SplitPane>
      </SplitPane>
    )}
        {/* <WalletSection active={activeMobile === TABS.WALLET}>
          <Wallet onWalletConnect={onWalletConnect} />
        </WalletSection>
        <TradeSection active={activeMobile === TABS.TRADE}>
          <PlaceOrder refetchWallets={refetchWallets} />
        </TradeSection>
        <SplitPane style={{ gridArea: 'chart' }} split="horizontal">
          <SearchAndChartSection active={activeMobile === TABS.CHART}>
            <AssetsSection>
              <AssetSearch gridSize={gridSize} onInfoChange={(show) => setShowOverlay(show)} />
            </AssetsSection>
            <ChartSection>
              {asset.isTraded && !showAssetInfo ? <Chart /> : <AssetInfo />}
              <ChartOverlay isActive={showOverlay} />
            </ChartSection>
          </SearchAndChartSection>

          <OrderBookSection active={activeMobile === TABS.BOOK}>
            {showOrderBook ? (
              <OrderBook />
            ) : (
              <FirstOrderMsg asset={asset} isSignedIn={isSignedIn} />
            )}
          </OrderBookSection>
        </SplitPane>
        <TradeHistorySection active={activeMobile === TABS.HISTORY}>
          <TradeHistory />
        </TradeHistorySection>
        <OrdersSection active={activeMobile === TABS.ORDERS}>
          <Orders
            openOrderData={DEMO_OPEN_ORDER_DATA}
            orderHistoryData={DEMO_ORDER_HISTORY_DATA}
            assetData={DEMO_ASSETS_DATA}
            gridSize={gridSize}
          />
        </OrdersSection> */}
      </Main>
    </MainWrapper>
  )
}

MainLayout.propTypes = {
  onWalletConnect: PropTypes.func.isRequired,
  refetchWallets: PropTypes.func.isRequired
}

export default MainLayout
