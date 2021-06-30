import React from 'react'
import { render } from '../../test/test-utils'
import MobileOrder from '.'
import dayjs from 'dayjs'

const order = {
  date: dayjs(1624296854921).format('YYYY-MM-DD HH:mm:ss'),
  price: 0.458,
  pair: ['YLDY', 'ALGO'],
  type: 'BUY',
  role: 'TAKER',
  amount: 1000,
  filled: 125,
  total: 458
}

describe('Mobile Order', () => {
  it('should display the correct data', () => {
    const { queryByTestId } = render(<MobileOrder order={order} />)

    expect(queryByTestId('date')).toHaveTextContent(order.date.toString())
    expect(queryByTestId('price')).toHaveTextContent(order.price.toString())
    expect(queryByTestId('pair')).toHaveTextContent(`${order.pair[0]}/${order.pair[1]}`)
    expect(queryByTestId('type')).toHaveTextContent(order.type)
    expect(queryByTestId('role')).toHaveTextContent(order.role)
    expect(queryByTestId('amount')).toHaveTextContent(order.amount.toString())
    expect(queryByTestId('total')).toHaveTextContent(order.total.toString())
  })
})
