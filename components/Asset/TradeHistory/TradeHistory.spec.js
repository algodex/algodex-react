import React from 'react'
import { render } from 'test/test-utils'
import { TradeHistoryView } from './TradeHistory'

const HISTORY_ROW = 'trade-history-row'

describe('Trade History', () => {
  const asset = { id: 123, name: 'YLDY', decimals: 6 }

  it('should not show rows if no data is provided', () => {
    const { queryByTestId } = render(<TradeHistoryView asset={asset} tradesData={[]} />)

    expect(queryByTestId(HISTORY_ROW)).toBeNull()
  })

  it('should show rows if data is provided', () => {
    const tradesData = [
      { id: 1, type: 'buyASA', price: 1.0, amount: 123, timestamp: 1623600112000 }
    ]

    const { queryByTestId } = render(<TradeHistoryView asset={asset} tradesData={tradesData} />)

    expect(queryByTestId(HISTORY_ROW)).not.toBeNull()
  })
})
