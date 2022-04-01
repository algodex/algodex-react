import { OrderTypeCell, ExpandTradeDetail } from './Cell'
import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'
import generateAsset from '../../spec/OrderHistory'

expect.extend(matchers)

describe('Cell Component', () => {
  it('Should render Table Cell', () => {
    const { queryByTestId } = render(<OrderTypeCell value="order-history" />)
    expect(queryByTestId('cell-item')).not.toBeNull()
  })
})

describe('Trade Order Detail Component', () => {
  const row = generateAsset()
  it('Should render Table Cell', () => {
    const { queryByTestId } = render(<ExpandTradeDetail value="2022-03-09 12:49:45" row={row} />)
    expect(queryByTestId('trade-detail-cell')).not.toBeNull()
  })
})
