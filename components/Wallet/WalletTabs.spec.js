/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { render } from 'test/test-utils'
import { matchers } from '@emotion/jest'
import WalletTabs from './WalletTabs'

expect.extend(matchers)
describe.skip('Wallet Tabs', () => {
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
