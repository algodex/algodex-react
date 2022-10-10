/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2022 Algodex VASP (BVI) Corp.
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

import React from 'react'
import { render } from 'test/test-utils'
import { TradeHistory } from './TradeHistory'

const HISTORY_ROW = 'trade-history-row'
const TRADE_HISTORY_SECTION = 'trade-history-section'
const asset = { id: 123, name: 'YLDY', decimals: 6 }
const tradesData = [
  { id: 1, type: 'buyASA', price: 1.0, amount: 123, timestamp: 1623600112000 },
  { id: 2, type: 'buyASA', price: 1.0, amount: 80, timestamp: 1723600112000 },
  { id: 3, type: 'buyASA', price: 1.0, amount: 97, timestamp: 1823600112000 },
  { id: 4, type: 'buyASA', price: 1.0, amount: 26, timestamp: 193600112000 }
]

describe('Trade History', () => {
  it('should render the trade section', () => {
    const { queryByTestId } = render(<TradeHistory asset={asset} orders={[]} />)
    expect(queryByTestId(TRADE_HISTORY_SECTION)).toBeTruthy()
  })

  it('should not show rows if no data is provided', () => {
    const { queryAllByText } = render(<TradeHistory asset={asset} orders={tradesData} />)
    expect(queryAllByText(HISTORY_ROW)).not.toBeNull()
  })

  it('should show rows if data is provided', () => {
    const { queryAllByText } = render(<TradeHistory asset={asset} orders={tradesData} />)
    expect(queryAllByText(HISTORY_ROW)).not.toBeNull()
  })
})
