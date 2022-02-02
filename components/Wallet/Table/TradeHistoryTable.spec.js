import React from 'react'
import { TradeHistoryTable } from './TradeHistoryTable'
import { render } from 'test/test-utils'

const ORDER_HISTORY_ROW = 'default-cell'

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
        id: 21547225,
        date: '2022-01-10 19:11:26',
        price: '0.0840',
        pair: 'BTC/ALGO',
        side: 'SELL',
        amount: '7.12025316'
      }
    ]

    const { queryAllByTestId } = render(<TradeHistoryTable orders={orderHistory} wallet={wallet} />)

    expect(queryAllByTestId(ORDER_HISTORY_ROW)).not.toBeNull()
    // expect(queryByTestId(EMPTY_STATE)).toBeNull()
  })
})
