import React from 'react'
import { render } from '../../test/test-utils'
import PlaceOrder from '.'

const PLACE_ORDER = 'place-order'

describe('PlaceOrder', () => {
  it('should render', () => {
    const { getByTestId } = render(<PlaceOrder />)

    expect(getByTestId(PLACE_ORDER)).toBeVisible()
  })
})
