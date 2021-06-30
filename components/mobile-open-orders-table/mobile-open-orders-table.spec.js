import React from 'react'
import { render } from '../../test/test-utils'
import MobileOpenOrders from '.'
import { orderHistoryData } from '../utils/order-history'

const ORDER_ROW = 'order-row'
const OPEN_ORDERS_TABLE = 'open-orders-table'

describe('Mobile Open Orders', () => {
  it('should not show rows if no data is provided', () => {
    const { queryByTestId } = render(<MobileOpenOrders data={[]} />)

    expect(queryByTestId(ORDER_ROW)).toBeNull()
  })

  it('should show rows if data is provided', () => {
    const { queryByTestId } = render(<MobileOpenOrders data={orderHistoryData} />)

    expect(queryByTestId(OPEN_ORDERS_TABLE).querySelectorAll('.order-row').length).toBeTruthy()
  })
})
