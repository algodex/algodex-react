import PropTypes from 'prop-types'
import Button from '@/components/Button'
import styled from '@emotion/styled'
import detectMobileDisplay from '@/utils/detectMobileDisplay'
import { useEffect, useRef, useState } from 'react'

import AssetSearch from '@/components/Nav/SearchSidebar'
import OrderBook from '@/components/Asset/OrderBook'
import Orders from '@/components/Wallet/WalletTabs'
import PlaceOrder from '@/components/Wallet/PlaceOrder/Original'
import Spinner from '@/components/Spinner'
import TradeHistory from '@/components/Asset/TradeHistory'
import Wallet from '@/components/Wallet/Connect/WalletConnect'
import { useEvent } from 'hooks/useEvents'
import useTranslation from 'next-translate/useTranslation'
import useDebounce from '@/hooks/useDebounce'
const WalletSection = styled.section`
  grid-area: 1 / 1 / 3 / 3;
  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};

  display: ${({ active }) => (active ? 'flex' : 'none')};

  @media (min-width: 996px) {
    grid-area: wallet;
    display: flex;
  }
`

const PlaceOrderSection = styled.section`
  grid-area: 1 / 1 / 3 / 3;

  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
  display: ${({ active }) => (active ? 'block' : 'none')};
  overflow: hidden scroll;

  @media (min-width: 996px) {
    grid-area: trade;
    display: flex;
  }
`

const ContentSection = styled.section`
  position: relative;
  height: auto;
  overflow-y: scroll;
`

const AssetsSection = styled.section`
  overflow: hidden;
  @media (min-width: 1536px) {
    display: flex !important;
  }
`

const SearchAndChartSection = styled.section`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
  position: relative;

  @media (min-width: 1024px) and (orientation: landscape) {
    border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};
  }

  display: ${({ active }) => (active ? 'grid' : 'none')};
  grid-template-rows: 50px 1fr;

  @media (min-width: 996px) {
    display: grid;
    grid-area: chart;
  }

  @media (min-width: 1536px) {
    grid-template-columns: 365px 1fr;
    grid-template-rows: 1fr;
  }
`

const AssetOrderBookSection = styled.section`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};

  @media (min-width: 1024px) and (orientation: landscape) {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
  }

  display: ${({ active }) => (active ? 'flex' : 'none')};

  @media (min-width: 996px) {
    grid-area: book;
    display: flex;
  }
`
const AssetTradeHistorySection = styled.section`
  display: flex;
  flex-direction: column;

  display: ${({ active }) => (active ? 'flex' : 'none')};

  height: calc(100% - 50px);

  @media (min-width: 996px) {
    grid-area: history;
    display: flex;
    height: inherit;
  }
`

const WalletOrdersSection = styled.section`
  border-top: 1px solid ${({ theme }) => theme.colors.gray['700']};

  @media (min-width: 1024px) and (orientation: landscape) {
    border-top: none;
    border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};
  }
  display: ${({ active }) => (active ? 'flex' : 'none')};

  @media (min-width: 996px) {
    grid-area: orders;
    display: flex;
  }
`

const MainWrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: 500px;

  @media (min-width: 996px) {
    min-height: 100%;
    height: auto;
  }
`

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  overflow: hidden scroll;
  height: 100%;


  @media (min-width: 996px) {
    height: 100%;
    min-height: 900px;
    display: grid;
    grid-template-columns: 1fr 1fr 280px;
    grid-template-rows: 240px 200px 300px 300px;
    grid-template-areas:
      'chart chart wallet'
      'chart chart trade'
      'book history trade'
      'orders orders trade';

    & > section {
      // for demo
      &.demo {
        border: 1px dotted rgba(255, 255, 255, 0.125);
      }
    }
  }

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      'chart book wallet'
      'chart book trade'
      'orders history trade';
  }

  @media (min-width: 1536px) {
    grid-template-columns: 1fr 3fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      'chart chart book wallet'
      'chart chart book trade'
      'orders orders history trade';
  }

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

  @media (min-width: 996px) {
    display: none;
  }
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
 * Detect Mobile
 * @returns {unknown}
 */
function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(undefined)
  const debounceIsMobile = useDebounce(isMobile, 500)
  useEffect(() => {
    function handleResize() {
      setIsMobile(detectMobileDisplay())
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [debounceIsMobile])

  return isMobile
}
/**
 * @param asset
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function MainLayout({ asset, children }) {
  console.debug(`Main Layout Render ${asset?.id || 'Missing'}`)
  const { t } = useTranslation('common')
  const gridRef = useRef()
  const isMobile = useMobileDetect()
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
      console.log('CLicked', data)
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
          <AssetsSection>
            <AssetSearch style={{ height: '6rem' }} className="h-24" gridRef={gridRef} />
          </AssetsSection>
          <ContentSection>{children}</ContentSection>
        </SearchAndChartSection>

        <AssetOrderBookSection active={activeMobile === TABS.BOOK}>
          {isMobile && activeMobile === TABS.BOOK && <OrderBook asset={asset} />}
          {!isMobile && <OrderBook asset={asset} />}
        </AssetOrderBookSection>
        <AssetTradeHistorySection active={activeMobile === TABS.HISTORY}>
          {isMobile && activeMobile === TABS.HISTORY && <TradeHistory asset={asset} />}
          {!isMobile && <TradeHistory asset={asset} />}
        </AssetTradeHistorySection>
        <WalletOrdersSection active={activeMobile === TABS.ORDERS}>
          {isMobile && activeMobile === TABS.ORDERS && <Orders asset={asset} />}
          {!isMobile && <Orders asset={asset} />}
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
