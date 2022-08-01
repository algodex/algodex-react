import { useRef, useState } from 'react'

import Button from '@/components/Button'
import HistoryAndOrderBook from '@/components/Asset/HistoryAndOrders'
import MobileAssetSearch from '@/components/Nav/SearchSidebar/MobileSearchSidebar'
import Orders from '@/components/Wallet/WalletTabs'
import PlaceOrder from '@/components/Wallet/PlaceOrder/Original'
import PropTypes from 'prop-types'
import Spinner from '@/components/Spinner'
import Wallet from '@/components/Wallet/Connect/WalletConnect'
import { lighten } from 'polished'
import styled from '@emotion/styled'
import { useEvent } from 'hooks/useEvents'
import useTranslation from 'next-translate/useTranslation'

const WalletSection = styled.section`
  grid-area: 1 / 1 / 3 / 3;
  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
  display: flex;
`

const PlaceOrderSection = styled.section`
  grid-area: 1 / 1 / 3 / 3;
  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
  display: flex;
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
  display: grid;
  grid-template-rows: 50px 1fr;
`

const AssetOrderBookSection = styled.section`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};
`
const AssetTradeHistorySection = styled.section`
  display: flex;
  flex-direction: column;
  height: calc(100% - 50px);
`

const WalletOrdersSection = styled.section`
  border-top: 1px solid ${({ theme }) => theme.colors.gray['700']};
  display: flex;
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
  // background-color: ${({ theme }) => theme.colors.gray['800']};
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.gray['700']};
  max-width: ${({ characterLength }) => (characterLength > 8 ? '4rem' : '7rem')};
  min-width: ${({ characterLength }) => (characterLength > 8 ? '3.5rem' : '3.5rem')};
  font-size: ${({ characterLength }) => (characterLength > 6 ? '10px' : '0.875rem')};
  overflow-wrap: anywhere;
  background-color: ${({ active, theme }) =>
    active ? `${lighten(0.05, theme.colors.gray['600'])} !important` : theme.colors.gray['800']};
`

/**
 * @param asset
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function MainLayout({ asset, children }) {
  // console.debug(`Main Mobile Layout Render ${asset?.id || 'Missing'}`)
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
   * delay time in ms between Nav Button switch
   */
  const delaySwitch = 1
  /**
   * Use Clicked Events
   *
   * This is only used to switch to MobileMenu Chart view
   * when the Next/Router navigates to a shallow route
   */
  useEvent('clicked', (data) => {
    if (data === 'asset') {
      setTimeout(() => setActiveMobile(TABS.CHART), delaySwitch)
    }
    if (data === 'order') {
      setTimeout(() => setActiveMobile(TABS.TRADE), delaySwitch)
    }
  })
  if (!asset) {
    return <Spinner flex={true} />
  }
  // console.log(isMobile)
  return (
    <MainWrapper>
      <Main ref={gridRef}>
        {activeMobile === TABS.WALLET && (
          <WalletSection>
            <Wallet />
          </WalletSection>
        )}
        {activeMobile === TABS.TRADE && (
          <PlaceOrderSection>
            <PlaceOrder asset={asset} />
          </PlaceOrderSection>
        )}
        {activeMobile === TABS.CHART && (
          <SearchAndChartSection>
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
        )}

        {activeMobile === TABS.BOOK && (
          <AssetOrderBookSection>
            <HistoryAndOrderBook isMobile={true} asset={asset} />
          </AssetOrderBookSection>
        )}
        {activeMobile === TABS.HISTORY && <AssetTradeHistorySection></AssetTradeHistorySection>}
        {activeMobile === TABS.ORDERS && (
          <WalletOrdersSection>
            <Orders asset={asset} />
          </WalletOrdersSection>
        )}

        <MobileMenu>
          <ul>
            <li>
              <MobileMenuButton
                characterLength={t('mobilefooter-CHART').length}
                type="button"
                onClick={() => setTimeout(() => setActiveMobile(TABS.CHART), delaySwitch)}
                active={activeMobile === TABS.CHART}
                variant="third"
              >
                {t('mobilefooter-CHART')}
              </MobileMenuButton>
            </li>
            <li>
              <MobileMenuButton
                characterLength={t('mobilefooter-BOOK').length}
                type="button"
                onClick={() => setTimeout(() => setActiveMobile(TABS.BOOK), delaySwitch)}
                active={activeMobile === TABS.BOOK}
                variant="third"
              >
                {t('mobilefooter-BOOK')}
              </MobileMenuButton>
            </li>
            <li>
              <MobileMenuButton
                characterLength={t('mobilefooter-TRADE').length}
                type="button"
                onClick={() => setTimeout(() => setActiveMobile(TABS.TRADE), delaySwitch)}
                active={activeMobile === TABS.TRADE}
                variant="third"
              >
                {t('mobilefooter-TRADE')}
              </MobileMenuButton>
            </li>
            <li>
              <MobileMenuButton
                characterLength={t('mobilefooter-ORDERS').length}
                type="button"
                onClick={() => setTimeout(() => setActiveMobile(TABS.ORDERS), delaySwitch)}
                active={activeMobile === TABS.ORDERS}
                variant="third"
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
                onClick={() => setTimeout(() => setActiveMobile(TABS.WALLET), delaySwitch)}
                active={activeMobile === TABS.WALLET}
                variant="third"
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
