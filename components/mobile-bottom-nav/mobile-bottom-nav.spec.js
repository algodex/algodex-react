import React from 'react'
import { render } from '../../test/test-utils'
import MobileBottomNav from '.'

describe('Mobile Bottom Nav', () => {
  it('should display the correct nav options', () => {
    const { getByText } = render(<MobileBottomNav />)

    expect(getByText(/^chart$/i)).not.toBeNull()
    expect(getByText(/^book$/i)).not.toBeNull()
    expect(getByText(/^trade$/i)).not.toBeNull()
    expect(getByText(/^orders$/i)).not.toBeNull()
    expect(getByText(/^trades$/i)).not.toBeNull()
  })
})
