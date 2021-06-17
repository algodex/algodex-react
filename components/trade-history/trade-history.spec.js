import React from 'react'
import { render } from '../../test/test-utils'
import TradeHistory from '.'

const HISTORY_ROW = 'trade-history-row'

describe('Order Book', () => {
  it('should show asset name in the header', () => {
    const { getByText } = render(<TradeHistory assetName="YLDY" tradesData={[]} />)

    expect(getByText(/Amount \(YLDY\)/i)).toBeVisible()
  })

  it('should not show rows if no data is provided', () => {
    const { queryByTestId } = render(<TradeHistory assetName="YLDY" tradesData={[]} />)

    expect(queryByTestId(HISTORY_ROW)).toBeNull()
  })

  it('should show rows if data is provided', () => {
    const tradesData = [{ price: 1.0, amount: 123, timestamp: new Date().getTime() }]

    const { queryByTestId } = render(<TradeHistory assetName="YLDY" tradesData={tradesData} />)

    expect(queryByTestId(HISTORY_ROW)).not.toBeNull()
  })
})
