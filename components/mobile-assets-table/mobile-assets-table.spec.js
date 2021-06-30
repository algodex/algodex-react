import React from 'react'
import { render } from '../../test/test-utils'
import MobileAssetsTable from '.'
import { assetBalances } from '../utils/asset-balances'

const ASSET_ROW = 'asset-row'
const ASSET_TABLE = 'asset-table'

describe('Mobile Assets Table', () => {
  it('should not show rows if no data is provided', () => {
    const { queryByTestId } = render(<MobileAssetsTable data={[]} />)

    expect(queryByTestId(ASSET_ROW)).toBeNull()
  })

  it('should show rows if data is provided', () => {
    const { queryByTestId } = render(<MobileAssetsTable data={assetBalances} />)

    expect(queryByTestId(ASSET_TABLE).querySelectorAll('.asset-row').length).toBeTruthy()
  })
})
