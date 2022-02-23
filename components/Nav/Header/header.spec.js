import React from 'react'
import singletonRouter from 'next/router'
import { render } from 'test/test-utils'
import { Header } from './index'
import { matchers } from '@emotion/jest'
import { MobileNavigation } from './header.css'

jest.mock('next/dist/client/router', () => require('next-router-mock'))
expect.extend(matchers)
describe('Header', () => {
  it('should render the container', () => {
    const { queryByTestId } = render(<Header router={singletonRouter} />)
    expect(queryByTestId('header-container')).toBeVisible()
    expect(queryByTestId('header-container')).not.toBeNull()
    expect(queryByTestId('header-network-dropdown-element')).not.toBeNull()
    expect(queryByTestId('header-navigation-element')).not.toBeNull()
  })

  it('should make mobile nav visible if isOpen is true', () => {
    const { queryByTestId } = render(
      <MobileNavigation data-testid="mobile-nav-element" isOpen={true} />
    )
    expect(queryByTestId('mobile-nav-element')).toBeVisible()
    expect(queryByTestId('mobile-nav-element')).not.toBeNull()
  })
})
