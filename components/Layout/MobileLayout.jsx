import { useRef, useState } from 'react'

import MobileAssetSearch from '@/components/Nav/MobileSearchSidebar'
import Button from '@/components/Button'
import HistoryAndOrderBook from '@/components/Asset/HistoryAndOrders'
// import OrderBook from '@/components/Asset/OrderBook'
import Orders from '@/components/Wallet/WalletTabs'
import PlaceOrder from '@/components/Wallet/PlaceOrder/Original'
import PropTypes from 'prop-types'
import Spinner from '@/components/Spinner'
// import TradeHistory from '@/components/Asset/TradeHistory'
import Wallet from '@/components/Wallet/Connect/WalletConnect'
import styled from '@emotion/styled'
import { useEvent } from 'hooks/useEvents'
import useTranslation from 'next-translate/useTranslation'

const WalletSection = styled.section`
  grid-area: 1 / 1 / 3 / 3;
  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
  display: ${({ active }) => (active ? 'flex' : 'none')};
`

const PlaceOrderSection = styled.section`
  grid-area: 1 / 1 / 3 / 3;

  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
  display: ${({ active }) => (active ? 'flex' : 'none')};
`

const ContentSection = styled.section`
  position: relative;
  height: auto;
  overflow-y: scroll;
`

const AssetsSection = styled.section`
  // overflow: hidden;
`

const SearchAndChartSection = styled.section`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
  position: relative;
  display: ${({ active }) => (active ? 'grid' : 'none')};
  grid-template-rows: 50px 1fr;
`

const AssetOrderBookSection = styled.section`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};
  display: ${({ active }) => (active ? 'flex' : 'none')};
`
const AssetTradeHistorySection = styled.section`
  display: flex;
  flex-direction: column;
  display: ${({ active }) => (active ? 'flex' : 'none')};
  height: calc(100% - 50px);
`

const WalletOrdersSection = styled.section`
  border-top: 1px solid ${({ theme }) => theme.colors.gray['700']};
  display: ${({ active }) => (active ? 'flex' : 'none')};
`

const MainWrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: 500px;
`

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  height: 100%;
}
`

const MobileMenu = styled.nav`
  height: 50px;
  width: 100%;

  & > ul {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  & > ul > li {
    flex: 1 0 auto;
    height: 100%;
  }

  z-index: 99;
`

const MobileMenuButton = styled(Button)`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray['800']};
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.gray['700']};
  max-width: ${({ characterLength }) => (characterLength > 8 ? '4rem' : '7rem')};
  min-width: ${({ characterLength }) => (characterLength > 8 ? '3.5rem' : '3.5rem')};
  font-size: ${({ characterLength }) => (characterLength > 6 ? '10px' : '0.875rem')};
  overflow-wrap: anywhere;
`

/**
 * @param asset
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function MainLayout({ asset, children }) {
  console.debug(`Main Mobile Layout Render ${asset?.id || 'Missing'}`)
  const { t } = useTranslation('common')
  const gridRef = useRef()
  const searchTableRef = useRef()
  const TABS = {
    CHART: 'CHART',
    BOOK: 'BOOK',
    TRADE: 'TRADE',
    ORDERS: 'ORDERS',
    HISTORY: 'HISTORY'
  }

  const [activeMobile, setActiveMobile] = useState(TABS.CHART)
  /**
   * Use Clicked Events
   *
   * This is only used to switch to MobileMenu Chart view
   * when the Next/Router navigates to a shallow route
   */
  useEvent('clicked', (data) => {
    if (data === 'asset') {
      setActiveMobile(TABS.CHART)
    }
    if (data === 'order') {
      setActiveMobile(TABS.TRADE)
    }
  })
  if (!asset) {
    return <Spinner flex={true} />
  }
  // console.log(isMobile)
  return (
    <MainWrapper>
      <Main ref={gridRef}>
        <WalletSection active={activeMobile === TABS.WALLET}>
          <Wallet />
        </WalletSection>
        <PlaceOrderSection active={activeMobile === TABS.TRADE}>
          <PlaceOrder asset={asset} />
        </PlaceOrderSection>
        <SearchAndChartSection active={activeMobile === TABS.CHART}>
          <AssetsSection ref={searchTableRef}>
            <MobileAssetSearch
              style={{ height: '6rem' }}
              className="h-24"
              searchTableRef={searchTableRef}
              gridRef={gridRef}
            />
          </AssetsSection>
          <ContentSection>{children}</ContentSection>
        </SearchAndChartSection>

        <AssetOrderBookSection active={activeMobile === TABS.BOOK}>
          {activeMobile === TABS.BOOK && <HistoryAndOrderBook isMobile={true} asset={asset} />}
        </AssetOrderBookSection>
        <AssetTradeHistorySection active={activeMobile === TABS.HISTORY}></AssetTradeHistorySection>
        <WalletOrdersSection active={activeMobile === TABS.ORDERS}>
          {activeMobile === TABS.ORDERS && <Orders asset={asset} />}
        </WalletOrdersSection>
        <MobileMenu>
          <ul>
            <li>
              <MobileMenuButton
                characterLength={t('mobilefooter-CHART').length}
                type="button"
                onClick={() => setActiveMobile(TABS.CHART)}
              >
                {t('mobilefooter-CHART')}
              </MobileMenuButton>
            </li>
            <li>
              <MobileMenuButton
                characterLength={t('mobilefooter-BOOK').length}
                type="button"
                onClick={() => setActiveMobile(TABS.BOOK)}
              >
                {t('mobilefooter-BOOK')}
              </MobileMenuButton>
            </li>
            <li>
              <MobileMenuButton
                characterLength={t('mobilefooter-TRADE').length}
                type="button"
                onClick={() => setActiveMobile(TABS.TRADE)}
              >
                {t('mobilefooter-TRADE')}
              </MobileMenuButton>
            </li>
            <li>
              <MobileMenuButton
                characterLength={t('mobilefooter-ORDERS').length}
                type="button"
                onClick={() => setActiveMobile(TABS.ORDERS)}
              >
                {t('mobilefooter-ORDERS')}
              </MobileMenuButton>
            </li>
            {/*
            <li>
              // Trade history. Disable for now until it is refactored into the Orders tab
              <MobileMenuButton type="button" onClick={() => setActiveMobile(TABS.HISTORY)}>
                History
              </MobileMenuButton>
            </li>
            */}
            <li>
              <MobileMenuButton
                type="button"
                characterLength={t('mobilefooter-WALLET').length}
                onClick={() => setActiveMobile(TABS.WALLET)}
              >
                {t('mobilefooter-WALLET')}
              </MobileMenuButton>
            </li>
          </ul>
        </MobileMenu>
      </Main>
    </MainWrapper>
  )
}
MainLayout.propTypes = {
  asset: PropTypes.object,
  children: PropTypes.any
}
export default MainLayout
