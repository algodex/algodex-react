import React from 'react'
import singletonRouter from 'next/router'
import { render } from '../../test/test-utils'
import { Header } from './index'

jest.mock('next/dist/client/router', () => require('next-router-mock'))

describe('Header', () => {
  it('should render the container', () => {
    const { queryByTestId } = render(<Header router={singletonRouter} />)
    expect(queryByTestId('header-container')).not.toBeNull()
  })
})
