import useTranslation from 'next-translate/useTranslation'
import { default as WalletOpenOrdersTable } from './Table/OpenOrdersTable'
import { default as WalletTradeHistoryTable } from './Table/TradeHistoryTable'
import { default as WalletAssetsTable } from './Table/AssetsTable'
import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Section } from '@/components/Layout/Section'
import { useStore, useStorePersisted } from '@/store/use-store'

const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.palette.gray[100]};
  padding: 1rem 0;
  transition: all 0.1s ease-in;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-weight: 600;
  line-height: 1.25;

  border-bottom: ${({ isActive, theme }) =>
    isActive ? `6px inset ${theme.palette.green[500]}` : `6px inset transparent`};

  &:hover {
    color: ${({ theme }) => theme.palette.gray[100]};
  }

  &:active {
    color: ${({ theme }) => theme.palette.gray[100]};
  }

  @media (min-width: 1024px) {
    color: ${({ isActive, theme }) =>
      isActive ? theme.palette.gray[100] : theme.palette.gray[500]};
  }
`
const Header = styled.div`
  display: flex;
  padding: 0 1.125rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray[700]};

  & > * {
    margin: 0 1rem;
  }

  justify-content: space-between;
  @media (min-width: 996px) {
    justify-content: flex-start;
    & > * {
      margin-left: 0;
      margin-right: 6rem;
    }
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
`
export const WalletOrdersSection = styled.section`
  border-top: 1px solid ${({ theme }) => theme.palette.gray['700']};
  @media (min-width: 1024px) and (orientation: landscape) {
    border-top: none;
    border-right: 1px solid ${({ theme }) => theme.palette.gray['700']};
  }
  display: ${({ active }) => (active ? 'flex' : 'none')};
  @media (min-width: 996px) {
    grid-area: orders;
    display: flex;
  }
`
function WalletTabs({ initialPanel, area = 'footer' }) {
  const { t } = useTranslation('orders')
  const [selectedPanel, setSelectedPanel] = useState(initialPanel)
  const isSignedIn = useStore((state) => state.isSignedIn)
  const OPEN_ORDERS_PANEL = 'open-orders'
  const ORDER_HISTORY_PANEL = 'order-history'
  const ASSETS_PANEL = 'assets'
  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)
  const wallet = {
    address: activeWalletAddress
  }

  const renderPanel = (panelName) => {
    if (!isSignedIn) return <div></div>
    switch (panelName) {
      case OPEN_ORDERS_PANEL:
        return <WalletOpenOrdersTable wallet={wallet} />
      case ORDER_HISTORY_PANEL:
        return <WalletTradeHistoryTable wallet={wallet} />
      case ASSETS_PANEL:
        return <WalletAssetsTable wallet={wallet} />
      default:
        return null
    }
  }

  return (
    <Section area={area} borderColor="blue" border="dashed">
      <Container>
        <Header>
          <Tab
            data-testid="open-orders-tab"
            isActive={selectedPanel === OPEN_ORDERS_PANEL}
            onClick={() => setSelectedPanel(OPEN_ORDERS_PANEL)}
          >
            {t('open-orders')}
          </Tab>
          <Tab
            data-testid="order-history-tab"
            isActive={selectedPanel === ORDER_HISTORY_PANEL}
            onClick={() => setSelectedPanel(ORDER_HISTORY_PANEL)}
          >
            {t('order-history')}
          </Tab>
          <Tab
            data-testid="assets-panel-tab"
            isActive={selectedPanel === ASSETS_PANEL}
            onClick={() => setSelectedPanel(ASSETS_PANEL)}
          >
            {t('assets')}
          </Tab>
        </Header>
        {renderPanel(selectedPanel)}
      </Container>
    </Section>
  )
}

export default WalletTabs

WalletTabs.propTypes = {
  initialPanel: PropTypes.string,
  openOrderData: PropTypes.array.isRequired,
  orderHistoryData: PropTypes.array.isRequired,
  assetsData: PropTypes.array.isRequired,
  area: PropTypes.string
}

WalletTabs.defaultProps = {
  initialPanel: 'open-orders',
  openOrderData: [],
  orderHistoryData: [],
  assetsData: []
}
