import { OrderTypeCell, AssetNameCell } from './Cell'
import { render } from '@/test/test-utils'
it('Should render Table Cell', () => {
  const { queryByTestId } = render(<OrderTypeCell value="order-history" />)
  expect(queryByTestId('cell-item')).not.toBeNull()
})
it('Should render Asset Cell', () => {
  const { queryByTestId } = render(<AssetNameCell value="order-history" />)
  expect(queryByTestId('cell-item')).not.toBeNull()
})
