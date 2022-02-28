import React from 'react'
import singletonRouter from 'next/router'
import { render } from '@/test/test-utils'
import Header from './Header'

jest.mock('next/dist/client/router', () => require('next-router-mock'))
describe('Header', () => {
  it('should render the container', () => {
    const { queryByTestId } = render(<Header router={singletonRouter} />)
    expect(queryByTestId('header-container')).toBeVisible()
    expect(queryByTestId('header-container')).not.toBeNull()
    expect(queryByTestId('header-network-dropdown-element')).not.toBeNull()
    expect(queryByTestId('header-navigation-element')).not.toBeNull()
  })
})
