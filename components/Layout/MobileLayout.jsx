import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'

import AssetOrderBook from '@/components/Asset/OrderBook'
// import AssetTradeHistory from 'components/Asset/TradeHistory'
import Button from '@/components/Button'
import NavSearchSidebar from '@/components/Nav/SearchSidebar'

import { useEvent } from '@/hooks/useEvents'
import useStore, { useStorePersisted } from '@/store/use-store'
import Spinner from '@/components/Spinner'
import WalletConnect from '@/components/Wallet/Connect/WalletConnect'
import { Section } from '@/components/Layout/Section'
// import PlaceOrderForm from '@/components/Wallet/PlaceOrder'
import WalletTabs from '@/components/Wallet/WalletTabs'

const DefaultContent = styled.section`
  grid-area: content;
  position: relative;
  border: dashed;
  border-color: green;
  height: auto;
`

const Grid = styled.main`
  position: relative;
  display: grid;
  // grid-template-columns: none;
  grid-auto-columns: 1fr;

  // grid-template-columns: 1fr;
  grid-template-rows: 50px calc(100% - 100px) 50px;
  grid-template-areas:
    'sidebar'
    'content'
    'footer';

  overflow: hidden;

  height: 100%;
  width: 100%;
`

const MobileMenu = styled.nav`
  height: 50px;
  width: 100%;
  grid-area: ${({ area }) => area};
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
  background-color: ${({ theme }) => theme.palette.gray['800']};
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.gray['700']};
  max-width: ${({ characterLength }) => (characterLength > 8 ? '4rem' : '7rem')};
  min-width: ${({ characterLength }) => (characterLength > 8 ? '3.5rem' : '3.5rem')};
  font-size: ${({ characterLength }) => (characterLength > 6 ? '10px' : '0.875rem')};
  overflow-wrap: anywhere;
`
const TABS = {
  CHART: 'CHART',
  BOOK: 'BOOK',
  TRADE: 'TRADE',
  ORDERS: 'ORDERS',
  HISTORY: 'HISTORY',
  WALLET: 'WALLET'
}
const MobileButtonsSection = ({ onClick, ...rest }) => {
  const { t } = useTranslation('common')
  return (
    <Section area="footer" {...rest}>
      <MobileMenu>
        <ul>
          <li>
            <MobileMenuButton
              characterLength={t('mobilefooter-CHART').length}
              type="button"
              onClick={() => onClick(TABS.CHART)}
            >
              {t('mobilefooter-CHART')}
            </MobileMenuButton>
          </li>
          <li>
            <MobileMenuButton
              characterLength={t('mobilefooter-BOOK').length}
              type="button"
              onClick={() => onClick(TABS.BOOK)}
            >
              {t('mobilefooter-BOOK')}
            </MobileMenuButton>
          </li>
          <li>
            <MobileMenuButton
              characterLength={t('mobilefooter-TRADE').length}
              type="button"
              onClick={() => onClick(TABS.TRADE)}
            >
              {t('mobilefooter-TRADE')}
            </MobileMenuButton>
          </li>
          <li>
            <MobileMenuButton
              characterLength={t('mobilefooter-ORDERS').length}
              type="button"
              onClick={() => onClick(TABS.ORDERS)}
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
              onClick={() => onClick(TABS.WALLET)}
            >
              {t('mobilefooter-WALLET')}
            </MobileMenuButton>
          </li>
        </ul>
      </MobileMenu>
    </Section>
  )
}
MobileButtonsSection.propTypes = {
  onClick: PropTypes.func.isRequired
}

/**
 * @param asset
 * @param children
 * @param components
 * @returns {JSX.Element}
 * @constructor
 */
export function Layout({
  asset,
  children,
  components,
  rowHeight,
  sidebarCollapsed,
  sidebarExpanded,
  controlsCollapsed,
  controlsExpanded,
  footerCollapsed
}) {
  const {
    Sidebar = NavSearchSidebar,
    Footer = styled.div`
      color: pink;
    `,
    Content = DefaultContent
  } = components
  const isSignedIn = useStore((state) => state.isSignedIn)
  const wallets = useStorePersisted((state) => state.wallets)
  const address = useStorePersisted((state) => state.activeWalletAddress)
  const wallet = wallets.find((wallet) => wallet.address === address)
  const [activeMobile, setActiveMobile] = useState(TABS.CHART)
  console.debug(`Mobile Layout Render Asset: ${asset?.id || 'Missing'} ${activeMobile}`)
  /**
   * Use Clicked Events
   *
   * This is only used to switch to MobileMenu Chart view
   * when the Next/Router navigates to a shallow route
   */
  useEvent('clicked', (data) => {
    if (data === 'asset') {
      console.log('CLicked', data, activeMobile)
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
    <Grid
      controlsCollapsed={controlsCollapsed}
      controlsExpanded={controlsExpanded}
      sidebarCollapsed={sidebarCollapsed}
      sidebarExpanded={sidebarExpanded}
      footerCollapsed={footerCollapsed}
      rowHeight={rowHeight}
    >
      <Sidebar active={!sidebarCollapsed} area="sidebar" border="dashed" borderColor="blue" />

      <Content area="content" border="dashed" borderColor="green">
        {activeMobile === TABS.CHART && children}
        {activeMobile === TABS.TRADE && isSignedIn && (
          <div>TODO Place Order</div>
          // <PlaceOrderForm area="content" asset={asset} wallet={wallet} />
        )}
        {activeMobile === TABS.TRADE && !isSignedIn && <div>Sign In!</div>}
        {activeMobile === TABS.ORDERS && isSignedIn && <WalletTabs wallet={wallet} />}
        {/*{isSignedIn && (*/}
        {/*  <PlaceOrder asset={asset} wallet={wallet} area={!isMobile ? 'bottomRight' : 'content'} />*/}
        {/*)}*/}
        {activeMobile === TABS.BOOK && <AssetOrderBook asset={asset} area="content" />}
        {activeMobile === TABS.WALLET && <WalletConnect area="content" />}
      </Content>

      <Footer
        area="footer"
        border="dashed"
        borderColor="blue"
        onClick={(tab) => setActiveMobile(tab)}
      ></Footer>
    </Grid>
  )
}
Layout.propTypes = {
  asset: PropTypes.object,
  rowHeight: PropTypes.number,
  sidebarCollapsed: PropTypes.bool,
  onSidebarToggle: PropTypes.func,
  sidebarExpanded: PropTypes.bool,
  onSidebarExpand: PropTypes.func,
  controlsCollapsed: PropTypes.bool,
  controlsExpanded: PropTypes.bool,
  footerCollapsed: PropTypes.bool,
  children: PropTypes.any,
  components: PropTypes.shape({
    Controls: PropTypes.elementType,
    Sidebar: PropTypes.elementType,
    Footer: PropTypes.elementType,
    Content: PropTypes.elementType
  })
}
Layout.defaultProps = {
  rowHeight: 70,
  sidebarCollapsed: false,
  sidebarExpanded: false,
  controlsCollapsed: false,
  controlsExpanded: true,
  footerCollapsed: false,
  components: {
    Footer: MobileButtonsSection
  }
}
export default Layout
