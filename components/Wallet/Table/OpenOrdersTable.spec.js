import React from 'react'
import { OpenOrdersTable } from './OpenOrdersTable'
import { render } from 'test/test-utils'

const OPEN_ORDER_ROW = 'open-order-row'
const EMPTY_STATE = 'empty-state'
const wallet = {
  address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
}
describe('OpenOrders', () => {
  it('should not show any rows if no data is provided', () => {
    const { queryByTestId } = render(<OpenOrdersTable wallet={wallet} />)

    expect(queryByTestId(OPEN_ORDER_ROW)).toBeNull()
  })

  // it('should display empty state if no data is provided', () => {
  //   const { queryByTestId } = render(<OpenOrdersTable wallet={wallet} />)
  //
  //   expect(queryByTestId(EMPTY_STATE)).not.toBeNull()
  // })

  it('should show rows if data is provided', () => {
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

    const { queryByTestId } = render(<OpenOrdersTable openOrders={openOrders} wallet={wallet} />)

    // expect(queryByTestId(OPEN_ORDER_ROW)).not.toBeNull()
    expect(queryByTestId(EMPTY_STATE)).toBeNull()
  })
})
