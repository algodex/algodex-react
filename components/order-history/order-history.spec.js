import React from 'react'
import OrderHistory from '.'
import { render } from '../../test/test-utils'

const ORDER_HISTORY_ROW = 'order-history-row'
const EMPTY_STATE = 'empty-state'

describe('OrderHistory', () => {
  it('should not show any rows if no data is provided', () => {
    const { queryByTestId } = render(<OrderHistory />)

    expect(queryByTestId(ORDER_HISTORY_ROW)).toBeNull()
  })

  it('should display empty state if no data is provided', () => {
    const { queryByTestId } = render(<OrderHistory />)

    expect(queryByTestId(EMPTY_STATE)).not.toBeNull()
  })

  it('should show rows if data is provided', () => {
    const orderHistory = [
      {
        date: new Date(),
        pair: ['MCAU', 'USDC'],
        side: 'sell',
        price: 3.7485,
        amount: 9874.365,
        fee: 0,
        executed: 12500
      }
    ]

    const { queryByTestId } = render(<OrderHistory orderHistory={orderHistory} />)

    expect(queryByTestId(ORDER_HISTORY_ROW)).not.toBeNull()
    expect(queryByTestId(EMPTY_STATE)).toBeNull()
  })
})
