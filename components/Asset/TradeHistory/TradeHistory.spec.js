import React from 'react'
import { render } from 'test/test-utils'
import { TradeHistory } from './TradeHistory'

const HISTORY_ROW = 'trade-history-row'
const TRADE_HISTORY_SECTION = 'trade-history-section'
const asset = { id: 123, name: 'YLDY', decimals: 6 }
const tradesData = [
  { id: 1, type: 'buyASA', price: 1.0, amount: 123, timestamp: 1623600112000 },
  { id: 2, type: 'buyASA', price: 1.0, amount: 80, timestamp: 1723600112000 },
  { id: 3, type: 'buyASA', price: 1.0, amount: 97, timestamp: 1823600112000 },
  { id: 4, type: 'buyASA', price: 1.0, amount: 26, timestamp: 193600112000 }
]

describe('Trade History', () => {
  it('should render the trade section', () => {
    const { queryByTestId } = render(<TradeHistory asset={asset} orders={[]} />)
    expect(queryByTestId(TRADE_HISTORY_SECTION)).toBeTruthy()
  })

  it('should not show rows if no data is provided', () => {
    const { queryAllByText } = render(<TradeHistory asset={asset} orders={tradesData} />)
    expect(queryAllByText(HISTORY_ROW)).not.toBeNull()
  })

  it('should show rows if data is provided', () => {
    const { queryAllByText } = render(<TradeHistory asset={asset} orders={tradesData} />)
    expect(queryAllByText(HISTORY_ROW)).not.toBeNull()
  })
})
