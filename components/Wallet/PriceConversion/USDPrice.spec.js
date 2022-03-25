import React from 'react'
import { render } from 'test/test-utils'
import USDPrice from './USDPrice'

const algoPrice = 2.3423

describe('USDPrice', () => {
  it('should show price once it gets data', () => {
    const { queryByTestId } = render(
      <USDPrice data-testid="USDprice-element" algoPrice={algoPrice} />
    )

    expect(queryByTestId('USDprice-element')).not.toBeNull()
  })
})
