import React from 'react'
import { render } from '../../test/test-utils'
import Nav from '.'

const ACCOUNT_ICON = 'account'
const NOTIFICATION_ICON = 'notifications'

describe('Nav', () => {
  it('should display the correct navigation contents for large screens', () => {
    const { getByText, getByTestId } = render(<Nav variant="large" />)

    expect(getByText(/trade/i)).toBeVisible()
    expect(getByText(/wallet/i)).toBeVisible()
    expect(getByText(/support/i)).toBeVisible()
    expect(getByTestId(ACCOUNT_ICON)).not.toBeNull()
    expect(getByTestId(NOTIFICATION_ICON)).not.toBeNull()
  })

  it('should display the correct navigation contents for small screens', () => {
    const { getByText } = render(<Nav />)

    expect(getByText(/trade/i)).toBeVisible()
    expect(getByText(/wallet/i)).toBeVisible()
    expect(getByText(/support/i)).toBeVisible()
    expect(getByTestId(ACCOUNT_ICON)).toBeNull()
    expect(getByTestId(NOTIFICATION_ICON)).toBeNull()
  })
})
