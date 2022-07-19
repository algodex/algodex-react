import React from 'react'
import { render } from 'test/test-utils'
import { StableAssetUSDPrice } from './USDPrice'

const algoPrice = 2.3423

describe('StableAssetUSDPrice', () => {
  it('should show price once it gets data', () => {
    const { queryByTestId } = render(
      <StableAssetUSDPrice
        data-testid="StableAssetUSDprice-element"
        algoPrice={algoPrice}
        currency="$"
      />
    )

    expect(queryByTestId('StableAssetUSDprice-element')).not.toBeNull()
  })
})
