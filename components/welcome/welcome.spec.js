import React from 'react'
import { render, screen } from '../../test/test-utils'
import Welcome from './index'

describe('Welcome', () => {
  it('should render the welcome message', () => {
    render(<Welcome />)

    const heading = screen.getByText(/Welcome to/i)

    expect(heading).toBeInTheDocument()
  })
})
