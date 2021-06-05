import React, { useState as useStateMock } from 'react'
import Orders from '.'
import { render } from '../../test/test-utils'
import { fireEvent } from '@testing-library/react'

const OPEN_ORDERS = 'open-orders'
const ORDER_HISTORY = 'order-history'
const ASSETS = 'assets'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}))

describe('Orders', () => {
  const setState = jest.fn()

  beforeEach(() => {
    useStateMock.mockImplementation((init) => [init, setState])
  })

  it('should display the "Open Orders" panel by default', () => {
    const { queryByTestId } = render(<Orders />)

    expect(queryByTestId(OPEN_ORDERS)).not.toBeNull()

    expect(queryByTestId(ORDER_HISTORY)).toBeNull()

    expect(queryByTestId(ASSETS)).toBeNull()
  })

  it('should display the "Open Orders" panel when tab selected', () => {
    const { getByText, queryByTestId, rerender } = render(<Orders />)

    fireEvent.click(getByText(/Open Orders/))

    expect(setState).toHaveBeenCalledWith(OPEN_ORDERS)
    rerender(<Orders initialPanel={OPEN_ORDERS} />)
    expect(queryByTestId(OPEN_ORDERS)).not.toBeNull()
  })

  it('should display the "Order History" panel when tab selected', () => {
    const { getByText, queryByTestId, rerender } = render(<Orders />)

    fireEvent.click(getByText(/order history/i))

    expect(setState).toHaveBeenCalledWith(ORDER_HISTORY)
    rerender(<Orders initialPanel={ORDER_HISTORY} />)
    expect(queryByTestId(ORDER_HISTORY)).not.toBeNull()
  })

  it('should display the "Assets" panel when tab selected', () => {
    const { getByText, queryByTestId, rerender } = render(<Orders />)

    fireEvent.click(getByText(/assets/i))

    expect(setState).toHaveBeenCalledWith(ASSETS)
    rerender(<Orders initialPanel={ASSETS} />)
    expect(queryByTestId(ASSETS)).not.toBeNull()
  })
})
