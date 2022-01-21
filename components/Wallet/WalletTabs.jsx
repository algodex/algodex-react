import useTranslation from 'next-translate/useTranslation'
import { default as WalletOpenOrdersTable } from './Table/OpenOrdersTable'
import { default as WalletTradeHistoryTable } from './Table/TradeHistoryTable'
import { default as WalletAssetsTable } from './Table/AssetsTable'
import { useState } from 'react'
import { Container, Header, Tab } from 'components/Tabs'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Section } from '../Section'
import { useStorePersisted } from '../../store/use-store'
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
function WalletTabs({ initialPanel, area = 'footer' }) {
  const { t } = useTranslation('orders')
  const [selectedPanel, setSelectedPanel] = useState(initialPanel)

  const OPEN_ORDERS_PANEL = 'open-orders'
  const ORDER_HISTORY_PANEL = 'order-history'
  const ASSETS_PANEL = 'assets'
  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)
  const wallet = {
    address: activeWalletAddress
  }

  const renderPanel = (panelName) => {
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
            isActive={selectedPanel === OPEN_ORDERS_PANEL}
            onClick={() => setSelectedPanel(OPEN_ORDERS_PANEL)}
          >
            {t('open-orders')}
          </Tab>
          <Tab
            isActive={selectedPanel === ORDER_HISTORY_PANEL}
            onClick={() => setSelectedPanel(ORDER_HISTORY_PANEL)}
          >
            {t('order-history')}
          </Tab>
          <Tab
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
