import React from 'react'
import { render } from 'test/test-utils'
import { StableAssetUSDPrice } from './StableAssetUSDPrice'

const usdPrice = 1

describe('StableAssetUSDPrice', () => {
  it('should show price once it gets data', () => {
    const { queryByTestId } = render(
      <StableAssetUSDPrice
        data-testid="StableAssetUSDprice-element"
        usdPrice={usdPrice}
        currency="$"
      />
    )

    expect(queryByTestId('StableAssetUSDprice-element')).not.toBeNull()
  })
})
