import React from 'react'
import { render } from '../../test/test-utils'
import MobileOrderHistory from '.'
import { orderHistoryData } from '../utils/order-history'

const ORDER_HISTORY_TABLE = 'order-history-table'

describe('Mobile Order History', () => {
  it('should show empty state if no data is provided', () => {
    const { getByText } = render(<MobileOrderHistory data={[]} />)

    expect(getByText(/You have no order history./i)).toBeVisible()
  })

  it('should show order history table if data is provided', () => {
    const { queryByTestId } = render(<MobileOrderHistory data={orderHistoryData} />)

    expect(queryByTestId(ORDER_HISTORY_TABLE)).not.toBeNull()
  })
})
