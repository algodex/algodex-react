import React from 'react'
import { render } from '../../test/test-utils'
import OrderBookPrice from '.'
import theme from '../../theme'

const ORDER_BOOK_PRICE = 'order-book-price'
const ARROW_DOWN = 'arrow-down'
const ARROW_UP = 'arrow-up'

describe('Order Book Price', () => {
  it('should show price', () => {
    const { getByTestId } = render(<OrderBookPrice price={1.2345} change={-0.1} />)

    expect(getByTestId(ORDER_BOOK_PRICE)).toHaveTextContent(1.2345)
  })

  it('should indicate price decrease', () => {
    const { getByTestId, queryByTestId } = render(<OrderBookPrice price={1.2345} change={-0.1} />)

    expect(getByTestId(ORDER_BOOK_PRICE)).toHaveStyle({ color: theme.colors.red['500'] })
    expect(queryByTestId(ARROW_DOWN)).toBeVisible()
    expect(queryByTestId(ARROW_UP)).toBeNull()
  })

  it('should indicate price increase', () => {
    const { getByTestId, queryByTestId } = render(<OrderBookPrice price={1.2345} change={0.1} />)

    expect(getByTestId(ORDER_BOOK_PRICE)).toHaveStyle({ color: theme.colors.green['500'] })
    expect(queryByTestId(ARROW_DOWN)).toBeNull()
    expect(queryByTestId(ARROW_UP)).toBeVisible()
  })
})
