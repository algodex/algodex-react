import { AssetInfo } from './Asset'
import React from 'react'
import {AssetData as asset} from '../../spec/Asset'
import { render } from 'test/test-utils'

const ASA_NAME = 'asset-info-asa-name'
const ASA_DESC = 'asset-info-desc'
const ASA_CIRC_SUPPLY = 'asset-info-circ-supply'
const ASA_TOTAL_SUPPLY = 'asset-info-total-supply'
const ASA_ID = 'asset-info-asa-id'
const ASA_PRICE = 'asset-info-price'
const ASA_PCT_CHANGE = 'asset-info-pct-change'
const ASA_URL = 'asset-url'
const BACK_BTN = 'back-btn'

describe('Asset Info', () => {
  it('should show asset name', () => {
    const { queryByTestId } = render(<AssetInfo asset={asset} />)

    expect(queryByTestId(ASA_NAME)).not.toBeNull()
  })

  it('should show asset description', () => {

    const { queryByTestId } = render(<AssetInfo asset={asset} />)

    expect(queryByTestId(ASA_DESC)).not.toBeNull()
  })

  it('should show asset circulating supply', () => {
    const { queryByTestId } = render(<AssetInfo asset={asset} />)

    expect(queryByTestId(ASA_CIRC_SUPPLY)).not.toBeNull()
  })

  it('should show asset total supply', () => {
    const { queryByTestId } = render(<AssetInfo asset={asset} />)

    expect(queryByTestId(ASA_TOTAL_SUPPLY)).not.toBeNull()
  })

  it('should show asset id', () => {
    const { queryByTestId } = render(<AssetInfo asset={asset} />)

    expect(queryByTestId(ASA_ID)).not.toBeNull()
  })

  it('should show asset price', () => {
    const { queryByTestId } = render(<AssetInfo asset={asset} />)

    expect(queryByTestId(ASA_PRICE)).not.toBeNull()
  })


  it('should show percentage change in asset', () => {
    const { queryByTestId } = render(<AssetInfo asset={asset} />)

    expect(queryByTestId(ASA_PCT_CHANGE)).not.toBeNull()
  })

  it('should have url link if provided', () => {
    const { queryByTestId } = render(<AssetInfo asset={asset} />)

    expect(queryByTestId(ASA_URL).textContent).toMatch(asset.url);
  })

})
