import React from 'react'
import { render } from '../../test/test-utils'
import Header from './index'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: () => '/trade/15322902'
    }
  }
}))

describe('Header', () => {
  it('should render the container', () => {
    const { queryByTestId } = render(<Header />)
    expect(queryByTestId('header-container')).not.toBeNull()
  })
})
