import React from 'react'
import { TradeHistoryTable } from './TradeHistoryTable'
import { render, waitFor } from 'test/test-utils'

const ORDER_HISTORY_ROW = 'default-cell'

const wallet = {
  address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
}
describe('Wallet Trade History Table', () => {
  it('should not show any rows if no data is provided', async () => {
    const { queryByTestId } = render(<TradeHistoryTable wallet={wallet} />)
    const data = await waitFor(() => queryByTestId(ORDER_HISTORY_ROW))
    expect(data).toBeNull()
  })

  it('should show rows if data is provided', async () => {
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
    const data = await waitFor(() => queryAllByTestId(ORDER_HISTORY_ROW))
    expect(data).not.toBeNull()
    // expect(queryByTestId(EMPTY_STATE)).toBeNull()
  })
})
