import useTranslation from 'next-translate/useTranslation'
import WalletOpenOrdersTable from './OpenOrdersTable/WalletOpenOrdersTable'
import WalletTradeHistoryTable from './TradeHistoryTable/WalletTradeHistoryTable'
import WalletAssetsTable from './AssetsTable/WalletAssetsTable'
import { useState } from 'react'
import { Container, Header, Tab } from 'components/Tabs'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Section } from '../Section'
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
function WalletTabs(props) {
  const { initialPanel } = props
  const { t } = useTranslation('orders')
  const [selectedPanel, setSelectedPanel] = useState(initialPanel)

  const OPEN_ORDERS_PANEL = 'open-orders'
  const ORDER_HISTORY_PANEL = 'order-history'
  const ASSETS_PANEL = 'assets'

  const renderPanel = (panelName) => {
    switch (panelName) {
      case OPEN_ORDERS_PANEL:
        return <WalletOpenOrdersTable />
      case ORDER_HISTORY_PANEL:
        return <WalletTradeHistoryTable />
      case ASSETS_PANEL:
        return <WalletAssetsTable />
      default:
        return null
    }
  }

  return (
    <Section {...props}>
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
  assetsData: PropTypes.array.isRequired
}

WalletTabs.defaultProps = {
  initialPanel: 'open-orders',
  openOrderData: [],
  orderHistoryData: [],
  assetsData: []
}
