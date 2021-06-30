import React from 'react'
import { render } from '../../test/test-utils'
import MobileOpenOrders from '.'
import { openOrdersData } from '../utils/open-orders'

const OPEN_ORDERS_TABLE = 'open-orders-table'

describe('Mobile Open Orders', () => {
  it('should show empty state if no data is provided', () => {
    const { getByText } = render(<MobileOpenOrders data={[]} />)

    expect(getByText(/You have no open orders./i)).toBeVisible()
  })

  it('should show open orders table if data is provided', () => {
    const { queryByTestId } = render(<MobileOpenOrders data={openOrdersData} />)

    expect(queryByTestId(OPEN_ORDERS_TABLE)).not.toBeNull()
  })
})
