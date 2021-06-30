import React from 'react'
import { render } from '../../test/test-utils'
import MobileOrderHistoryTable from '.'
import { orderHistoryData } from '../utils/order-history'

const ORDER_ROW = 'order-row'
const ORDER_HISTORY_TABLE = 'order-history-table'

describe('Mobile Order History Table', () => {
  it('should not show rows if no data is provided', () => {
    const { queryByTestId } = render(<MobileOrderHistoryTable data={[]} />)

    expect(queryByTestId(ORDER_ROW)).toBeNull()
  })

  it('should show rows if data is provided', () => {
    const { queryByTestId } = render(<MobileOrderHistoryTable data={orderHistoryData} />)

    expect(queryByTestId(ORDER_HISTORY_TABLE).querySelectorAll('.order-row').length).toBeTruthy()
  })
})
