import React from 'react'
import { render } from '../../test/test-utils'
import PlaceOrder from '.'

const PLACE_ORDER = 'place-order'

describe('PlaceOrder', () => {
  it('should render', () => {
    const activeWallet = { id: 'wallet-01', name: 'Main', balance: 812569.2658 }
    const { getByTestId } = render(<PlaceOrder activeWallet={activeWallet} asset="FAME" />)

    expect(getByTestId(PLACE_ORDER)).toBeVisible()
  })
})
