import React from 'react'
import { render } from '../../test/test-utils'
import Header from './index'

describe('Header', () => {
  it('should render the container', () => {
    const { queryByTestId } = render(<Header />)
    expect(queryByTestId('header-container')).not.toBeNull()
  })
})
