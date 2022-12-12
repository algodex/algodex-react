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

import React from 'react'
import { TradeHistoryTable } from './TradeHistoryTable'
import { render, waitFor } from 'test/test-utils'

const ORDER_HISTORY_ROW = 'default-cell'
jest.mock('next/dist/client/router', () => require('next-router-mock'))

const wallet = {
  address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
}
describe('Wallet Trade History Table', () => {
  it('should not show any rows if no data is provided', async () => {
    const { queryByTestId } = render(<TradeHistoryTable wallet={wallet} />)
    const data = await waitFor(() => queryByTestId(ORDER_HISTORY_ROW))
    expect(data).toBeNull()
  })

  it('should show rows if data is provided', async () => {
    const orderHistory = [
      {
        id: 21547225,
        date: '2022-01-10 19:11:26',
        price: '0.0840',
        pair: 'BTC/ALGO',
        side: 'SELL',
        amount: '7.12025316'
      }
    ]

    const { queryAllByTestId } = render(<TradeHistoryTable orders={orderHistory} wallet={wallet} />)
    const data = await waitFor(() => queryAllByTestId(ORDER_HISTORY_ROW))
    expect(data).not.toBeNull()
    // expect(queryByTestId(EMPTY_STATE)).toBeNull()
  })
})
