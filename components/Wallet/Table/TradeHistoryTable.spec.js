import React from 'react'
import { TradeHistoryTable } from './TradeHistoryTable'
import { render } from 'test/test-utils'

const ORDER_HISTORY_ROW = 'order-history-row'
const EMPTY_STATE = 'empty-state'
const wallet = {
  address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
}
describe('Wallet Trade History Table', () => {
  it('should not show any rows if no data is provided', () => {
    const { queryByTestId } = render(<TradeHistoryTable wallet={wallet} />)

    expect(queryByTestId(ORDER_HISTORY_ROW)).toBeNull()
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

    const { queryByTestId } = render(
      <TradeHistoryTable orderHistory={orderHistory} wallet={wallet} />
    )

    // expect(queryByTestId(ORDER_HISTORY_ROW)).not.toBeNull()
    expect(queryByTestId(EMPTY_STATE)).toBeNull()
  })
})
