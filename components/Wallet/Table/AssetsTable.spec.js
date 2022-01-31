import React from 'react'
import { AssetsTable } from './AssetsTable'
import { render } from 'test/test-utils'

const ASSETS_ROW = 'assets-row'
const EMPTY_STATE = 'empty-state'
const wallet = {
  address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
}
describe('Assets', () => {
  it('should not show any rows if no data is provided', () => {
    const { queryByTestId } = render(<AssetsTable wallet={wallet} />)

    expect(queryByTestId(ASSETS_ROW)).toBeNull()
  })

  it.skip('should display empty state if no data is provided', () => {
    const { queryByTestId } = render(<AssetsTable wallet={wallet} />)

    expect(queryByTestId(EMPTY_STATE)).not.toBeNull()
  })

  it.skip('should show rows if data is provided', () => {
    const assets = [
      {
        icon: 'algo',
        coin: 'ALGO',
        name: 'Algorand',
        total: 12000,
        inOrder: 2000,
        algoValue: 12000
      }
    ]
    const wallet = {
      address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
    }
    const { queryByTestId } = render(<AssetsTable assets={assets} wallet={wallet} />)

    expect(queryByTestId(ASSETS_ROW)).not.toBeNull()
    expect(queryByTestId(EMPTY_STATE)).toBeNull()
  })
})
