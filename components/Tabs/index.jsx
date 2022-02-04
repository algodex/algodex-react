import Assets from 'components/Wallet/Table/AssetsTable'
import OpenOrders from 'components/Wallet/Table/OpenOrdersTable'
import OrderHistory from 'components/Wallet/Table/TradeHistoryTable'
import PropTypes from 'prop-types'
import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import styled from '@emotion/styled'

export const Tab = styled.div`
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

export const Header = styled.div`
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
`

function Orders({ initialPanel }) {
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
  )
}

export default Orders

Orders.propTypes = {
  initialPanel: PropTypes.string,
  openOrderData: PropTypes.array.isRequired,
  orderHistoryData: PropTypes.array.isRequired,
  assetsData: PropTypes.array.isRequired
}

Orders.defaultProps = {
  initialPanel: 'open-orders',
  openOrderData: [],
  orderHistoryData: [],
  assetsData: []
}
