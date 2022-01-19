import React from 'react'
import OpenOrders from '.'
import { render } from 'test/test-utils'

const OPEN_ORDER_ROW = 'open-order-row'
const EMPTY_STATE = 'empty-state'

describe('OpenOrders', () => {
  it('should not show any rows if no data is provided', () => {
    const { queryByTestId } = render(<OpenOrders />)

    expect(queryByTestId(OPEN_ORDER_ROW)).toBeNull()
  })

  it.skip('should display empty state if no data is provided', () => {
    const { queryByTestId } = render(<OpenOrders />)

    expect(queryByTestId(EMPTY_STATE)).not.toBeNull()
  })

  it.skip('should show rows if data is provided', () => {
    const openOrders = [
      {
        date: new Date(),
        pair: ['ALGO', 'USDC'],
        type: 'buy',
        price: 1.2354,
        filled: 15,
        amount: 954
      }
    ]

    const { queryByTestId } = render(<OpenOrders openOrders={openOrders} />)

    expect(queryByTestId(OPEN_ORDER_ROW)).not.toBeNull()
    expect(queryByTestId(EMPTY_STATE)).toBeNull()
  })
})
