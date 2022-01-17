import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { Container, Header, Tab } from 'components/Tabs'
import PropTypes from 'prop-types'
import styled from 'styled-components'
export const WalletSection = styled.section`
  grid-area: 1 / 1 / 3 / 3;
  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};

  display: ${({ active }) => (active ? 'flex' : 'none')};

  @media (min-width: 996px) {
    grid-area: wallet;
    display: flex;
  }
`
function WalletTabs({ initialPanel }) {
  const { t } = useTranslation('orders')
  const [selectedPanel, setSelectedPanel] = useState(initialPanel)

  const OPEN_ORDERS_PANEL = 'open-orders'
  const ORDER_HISTORY_PANEL = 'order-history'
  const ASSETS_PANEL = 'assets'

  const renderPanel = (panelName) => {
    switch (panelName) {
      case OPEN_ORDERS_PANEL:
        return <OpenOrders />
      case ORDER_HISTORY_PANEL:
        return <OrderHistory />
      case ASSETS_PANEL:
        return <Assets />
      default:
        return null
    }
  }

  return (
    <WalletSection>
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
    </WalletSection>
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
