import React from 'react'
import { AssetsTable, AssetCoinCell } from './AssetsTable'
import { render, waitFor } from 'test/test-utils'
import { cleanup } from '@testing-library/react'

const ASSETS_ROW = 'asset-coin-cell'
const wallet = {
  address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
}

afterEach(() => {
  cleanup()
})

describe('Assets', () => {
  it('should not show any rows if no data is provided', async () => {
    const { queryByTestId } = render(<AssetsTable wallet={wallet} />)

    const data = await waitFor(() => queryByTestId(ASSETS_ROW))
    expect(data).toBeNull()
  })

  it('should show rows if data is provided', async () => {
    const assets = [
      {
        unit: 'TEST',
        id: 22847687,
        name: 'TEST',
        total: '100',
        available: '10',
        'in-order': '0',
        'algo-value': '0.888'
      }
    ]
    const wallet = {
      address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
    }
    const { queryByTestId } = render(<AssetsTable assets={assets} wallet={wallet} />)
    const data = await waitFor(() => queryByTestId(ASSETS_ROW))
    expect(data).not.toBeNull()
  })

  it('should show rows if data is provided', async () => {
    const row = {
      original: {
        unit: 'TEST',
        id: 22847687,
        name: 'TEST',
        total: '100',
        available: '10',
        'in-order': '0',
        'algo-value': '0.888'
      }
    }

    const props = {
      row: row,
      value: '20'
    }

    const { queryByTestId } = render(<AssetCoinCell {...props} />)
    const data = await waitFor(() => queryByTestId(ASSETS_ROW))
    expect(data).not.toBeNull()
  })
})
