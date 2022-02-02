import React from 'react'
import { render } from 'test/test-utils'
import { OrderBook as OrderBookView } from './OrderBook'

const SELL_ROW = 'order-book-sell-row'
const BUY_ROW = 'order-book-buy-row'

describe('Order Book', () => {
  const asset = {
    id: 15322902,
    name: 'LAMP',
    price: 1.3765,
    decimals: 6
  }
  it('should not show rows if no data is provided', () => {
    const { queryByTestId } = render(<OrderBookView asset={asset} orders={{ buy: [], sell: [] }} />)

    expect(queryByTestId(SELL_ROW)).toBeNull()
    expect(queryByTestId(BUY_ROW)).toBeNull()
  })

  it('should show rows if data is provided', () => {
    const orders = {
      buy: [{ price: 1.0, amount: 123, total: 123 }],
      sell: [{ price: 1.0, amount: 123, total: 123 }]
    }

    const { queryByTestId } = render(<OrderBookView asset={asset} orders={orders} />)

    expect(queryByTestId(SELL_ROW)).not.toBeNull()
    expect(queryByTestId(BUY_ROW)).not.toBeNull()
  })
})
