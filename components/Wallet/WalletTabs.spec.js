import React from 'react'
import { render } from 'test/test-utils'
import { Tab } from './WalletTabs'

describe('Order Book', () => {
  const OPEN_ORDERS_PANEL = 'open-orders'
  const ORDER_HISTORY_PANEL = 'order-history'
  const ASSETS_PANEL = 'assets'

  it('should show open orders', () => {
    const { queryByTestId } = render(
      <Tab
        data-testid="open-orders-tab"
        isActive={selectedPanel === OPEN_ORDERS_PANEL}
        onClick={() => setSelectedPanel(OPEN_ORDERS_PANEL)}
      />
    )
    expect(queryByTestId('open-orders-tab')).not.toBeNull()
    expect(queryByTestId(OPEN_ORDERS_PANEL)).not.toBeNull()
    expect(queryByTestId(ORDER_HISTORY_PANEL)).toBeNull()
    expect(queryByTestId(ASSETS_PANEL)).toBeNull()
  })

  it('should show order history', () => {
    const { queryByTestId } = render(
      <Tab
        data-testid="order-history-tab"
        isActive={selectedPanel === ORDER_HISTORY_PANEL}
        onClick={() => setSelectedPanel(ORDER_HISTORY_PANEL)}
      />
    )
    expect(queryByTestId('order-history-tab')).not.toBeNull()
    expect(queryByTestId(ORDER_HISTORY_PANEL)).not.toBeNull()
    expect(queryByTestId(OPEN_ORDERS_PANEL)).toBeNull()
    expect(queryByTestId(ASSETS_PANEL)).toBeNull()
  })

  it('should show asset panel', () => {
    const { queryByTestId } = render(
      <Tab
        data-testid="asset-tab"
        isActive={selectedPanel === ASSETS_PANEL}
        onClick={() => setSelectedPanel(ASSETS_PANEL)}
      />
    )
    expect(queryByTestId('asset-tab')).not.toBeNull()
    expect(queryByTestId(ASSETS_PANEL)).not.toBeNull()
    expect(queryByTestId(OPEN_ORDERS_PANEL)).toBeNull()
    expect(queryByTestId(ORDER_HISTORY_PANEL)).toBeNull()
  })
})
