import { render } from '@/test/test-utils'
import { matchers } from '@emotion/jest'
import WalletTabs from './WalletTabs'

expect.extend(matchers)
describe('Wallet Tabs', () => {
  it('should show open orders', () => {
    const { queryByTestId } = render(<WalletTabs initialPanel="open-orders" area="footer" />)
    expect(queryByTestId('open-orders-tab')).not.toBeNull()
    // expect(queryByTestId('order-history-tab')).toHaveAttribute('isActive', false)
  })
  it('should show order history', () => {
    const { queryByTestId } = render(<WalletTabs initialPanel="order-history" area="footer" />)
    expect(queryByTestId('order-history-tab')).not.toBeNull()
  })

  it('should show asset panel', () => {
    const { queryByTestId } = render(<WalletTabs initialPanel="assets" area="footer" />)
    expect(queryByTestId('assets-panel-tab')).not.toBeNull()
  })
})
