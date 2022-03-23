import { fireEvent, render } from 'test/test-utils'

import SearchFlyover from './SearchFlyover'

const itemInfo = {
  change: '133.89',
  fullName: 'BITCOIN',
  hasBeenOrdered: true,
  id: 21547225,
  liquidityAlgo: '19597.268344',
  liquidityAsa: '36412.56027801',
  name: 'BTC',
  price: '0.8888',
  verified: false
}

const KEYS = {
  ASA_ID: 'flyover-asa-id',
  NAME: 'flyover-asa-name',
  PRICE: 'flyover-asa-price',
  ALGO_LIQUIDITY: 'flyover-algo-liquidity',
  ASA_LIQUIDITY: 'flyover-asa-liqidity'
}

describe('Search Flyover Component', () => {
  it('Should render Asset Info Flyover for table', () => {
    const { queryByTestId } = render(<SearchFlyover row={itemInfo} isLarge={true} />)
    expect(queryByTestId(KEYS.ASA_ID)).not.toBeNull()
    expect(queryByTestId(KEYS.NAME)).not.toBeNull()
    expect(queryByTestId(KEYS.PRICE)).not.toBeNull()
    expect(queryByTestId(KEYS.ALGO_LIQUIDITY)).not.toBeNull()
    expect(queryByTestId(KEYS.ASA_LIQUIDITY)).not.toBeNull()
  })
  it('Should not render Asset Info Flyover for table', () => {
    const info = {...itemInfo}
    delete info.liquidityAlgo
    delete info.liquidityAsa
    info.hasBeenOrdered = false
    const { queryByTestId } = render(<SearchFlyover row={info} isLarge={true} />)
    expect(queryByTestId(KEYS.ASA_ID)).not.toBeNull()
    expect(queryByTestId(KEYS.NAME)).not.toBeNull()
    expect(queryByTestId(KEYS.PRICE)).not.toBeNull()
    expect(queryByTestId(KEYS.ALGO_LIQUIDITY)).toBeNull()
    expect(queryByTestId(KEYS.ASA_LIQUIDITY)).toBeNull()
  })
})
