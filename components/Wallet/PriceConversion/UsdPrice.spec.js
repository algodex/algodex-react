import React from 'react'
import { render } from 'test/test-utils'
import { UsdPrice } from './UsdPrice'

const algoPrice = 2.3423

describe('usdPrice', () => {
  it('should show price once it gets data', () => {
    const { queryByTestId } = render(<UsdPrice data-testid="usdprice-element" algoPrice={algoPrice} />)

    expect(queryByTestId('sdprice-element')).not.toBeNull()
  })
})
