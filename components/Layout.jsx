import styled from 'styled-components'
import Button from 'components/Button'
import SvgImage from 'components/SvgImage'
import { HeaderLg, HeaderSm } from 'components/Typography'

import { useRef, useState } from 'react'

import { default as NavSearchSidebar } from 'components/Nav/SearchSidebar/SearchSidebar'
import WalletConnect from 'components/Wallet/Connect/WalletConnect'
import WalletTabs from 'components/Wallet/WalletTabs'
import PropTypes from 'prop-types'
import Spinner from 'components/Spinner'
import AssetOrderBook from './Asset/OrderBook'
import TradeHistory from 'components/Asset/TradeHistory'

import { useEvent } from 'hooks/useEvents'
import useTranslation from 'next-translate/useTranslation'
import PlaceOrderForm from './Wallet/PlaceOrder/Form'
export const FlexContainer = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const FlexColumn = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
`
export const PlaceOrderSection = styled.section`
  grid-area: 1 / 1 / 3 / 3;

  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
  display: ${({ active }) => (active ? 'block' : 'none')};
  overflow: hidden scroll;

  @media (min-width: 996px) {
    grid-area: trade;
    display: flex;
  }
`

export const ContentSection = styled.section`
  position: relative;
  height: auto;
`

export const NavSidebarAndContentSection = styled.section`
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

export const AssetOrderBookSection = styled.section`
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

export const WalletOrdersSection = styled.section`
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

export const MainWrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: 500px;

  @media (min-width: 996px) {
    min-height: 100%;
    height: auto;
  }
`

export const Main = styled.main`
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

export const MobileMenuButton = styled(Button)`
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

export const MobilePriceSection = styled.section`
  grid-area: 1 / 1 / 2 / 2;
  height: 50px;

  display: ${({ active }) => (active ? 'grid' : 'none')};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  justify-content: space-around;
  align-content: center;
  padding: 1.125rem;
  h3 {
    font-family: ${({ theme }) => theme.fontFamilies.body};
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray[500]};
    white-space: nowrap;

    span {
      color: ${({ theme }) => theme.colors.gray[100]};
    }

    display: flex;
    align-items: center;

    @media (min-width: 1024px) {
      font-size: 1.25rem;
    }
  }
`

const Container = styled.div`
  height: 100%;
  background: url('/coming-soon-bg.jpg') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    display: none;
  }
`

const TypeContainer = styled.div`
  padding: 15vh 2rem 0;
  text-align: center;
`

const LogoContainer = styled.div`
  padding: 4rem;
`

export function MobileInterface() {
  return (
    <Container>
      <TypeContainer>
        <HeaderLg fontSize="3.25rem" fontWeight="800" color="gray.000" mb={4}>
          Coming soon
        </HeaderLg>
        <HeaderSm as="p" fontSize="1.25rem" fontWeight="500" letterSpacing="0" color="gray.000">
          The Algodex mobile experience will be available in a later release.
        </HeaderSm>
      </TypeContainer>
      <LogoContainer>
        <SvgImage use="logoLg" w={7.5} />
      </LogoContainer>
    </Container>
  )
}

/**
 * @param asset
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function Layout({ asset, children }) {
  console.debug(`Main Layout Render ${asset?.id || 'Missing'}`)

  const { t } = useTranslation('common')
  const gridRef = useRef()
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
  return (
    <MainWrapper>
      <Main ref={gridRef}>
        <WalletConnect active={activeMobile === TABS.WALLET} />
        <PlaceOrderSection active={activeMobile === TABS.TRADE}>
          <PlaceOrderForm asset={asset} wallet={{ balance: 0, assets: {} }} />
        </PlaceOrderSection>

        <NavSidebarAndContentSection
          style={{ height: '67vh' }}
          active={activeMobile === TABS.CHART}
        >
          <NavSearchSidebar className="h-24" />
          <ContentSection>{children}</ContentSection>
        </NavSidebarAndContentSection>

        <AssetOrderBook asset={asset} active={activeMobile === TABS.BOOK} />
        <TradeHistory asset={asset} active={activeMobile === TABS.ORDERS} />
        <WalletTabs active={activeMobile === TABS.ORDERS} />

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
Layout.propTypes = {
  asset: PropTypes.object,
  children: PropTypes.any
}
export default Layout
