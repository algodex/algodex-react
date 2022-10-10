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
