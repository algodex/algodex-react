import React from 'react'
import { render } from '../../test/test-utils'
import MobileAsset from '.'
import { assetBalances } from '../utils/asset-balances'

const ASSET = assetBalances[0]
const TEST_IDS = { name: 'name', tokenLg: 'token-lg', tokenSm: 'token-sm', amount: 'amount' }

describe('Mobile Asset Row', () => {
  it('should display the correct data', () => {
    const { getByTestId } = render(
      <MobileAsset name={ASSET.name} amount={ASSET.amount} token={ASSET.token} />
    )

    expect(getByTestId(TEST_IDS.name).textContent).toBe(ASSET.name)
    expect(getByTestId(TEST_IDS.tokenLg).textContent).toBe(ASSET.token)
    expect(getByTestId(TEST_IDS.tokenSm).textContent).toBe(ASSET.token)
    expect(getByTestId(TEST_IDS.amount).textContent).toBe(ASSET.amount.toString())
  })
})
