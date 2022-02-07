import React from 'react'
import { OpenOrdersTable } from './OpenOrdersTable'
import { render } from 'test/test-utils'

const OPEN_ORDER_ROW = 'cancel-order-button'
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
        id: 21547225,
        date: '2022-01-19 15:11:46',
        unix_time: 1642626706,
        price: '1000.0000',
        pair: 'BTC/ALGO',
        type: 'BUY',
        status: 'OPEN',
        amount: '1000.000'
      }
    ]

    const { queryByTestId } = render(<OpenOrdersTable orders={openOrders} wallet={wallet} />)

    expect(queryByTestId(OPEN_ORDER_ROW)).not.toBeNull()
    // expect(queryByTestId(EMPTY_STATE)).toBeNull()
  })
})
