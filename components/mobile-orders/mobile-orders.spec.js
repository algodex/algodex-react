import React from 'react'
import { render } from '../../test/test-utils'
import MobileOrders from '.'

describe('Mobile Orders', () => {
  it('should show the correct tab options', () => {
    const { getByText } = render(<MobileOrders />)

    expect(getByText(/Open/i)).not.toBeNull()
    expect(getByText(/History/i)).not.toBeNull()
    expect(getByText(/Assets/i)).not.toBeNull()
  })

  it('should should default to the open orders tab', () => {
    const { queryByTestId } = render(<MobileOrders />)

    expect(queryByTestId('open-orders-table')).not.toBeNull()
  })
})
