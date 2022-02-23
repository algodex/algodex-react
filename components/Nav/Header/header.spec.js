import React from 'react'
import singletonRouter from 'next/router'
import { render } from 'test/test-utils'
import { Header } from './index'
import { matchers } from '@emotion/jest'

expect.extend(matchers)

describe('Header', () => {
  it('should render the container', () => {
    const { queryByTestId } = render(<Header />)
    expect(queryByTestId('header-container')).toHaveClass('flex')
    expect(queryByTestId('header-container')).not.toBeNull()
  })
})
