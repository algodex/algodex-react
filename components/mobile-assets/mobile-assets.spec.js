import React from 'react'
import { render } from '../../test/test-utils'
import MobileAssets from '.'
import { assetBalances } from '../utils/asset-balances'

const ASSET_TABLE = 'asset-table'

describe('Mobile Assets', () => {
  it('should show empty state if no data is provided', () => {
    const { getByText } = render(<MobileAssets data={[]} />)

    expect(getByText(/You have no assets in your wallet./i)).toBeVisible()
  })

  it('should show asset table if data is provided', () => {
    const { queryByTestId } = render(<MobileAssets data={assetBalances} />)

    expect(queryByTestId(ASSET_TABLE)).not.toBeNull()
  })
})
