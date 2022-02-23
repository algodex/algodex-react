import { fireEvent, render } from 'test/test-utils'

import { OrderTypeCell } from './Cell'
import { matchers } from '@emotion/jest'

expect.extend(matchers)

describe('Cell Component', () => {
  it('Should render Table Cell', () => {
    const { queryByTestId } = render(<OrderTypeCell value="order-history" />)
    expect(queryByTestId('cell-item')).not.toBeNull()
  })
})
