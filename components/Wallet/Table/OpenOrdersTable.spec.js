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
import { OpenOrdersTable } from './OpenOrdersTable'
import { render } from 'test/test-utils'

const OPEN_ORDER_ROW = 'cancel-order-button'
const wallet = {
  address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
}

describe('OpenOrders', () => {
  it('should not show any rows if no data is provided', () => {
    const { queryByTestId } = render(<OpenOrdersTable wallet={wallet} />)

    expect(queryByTestId(OPEN_ORDER_ROW)).toBeNull()
  })

  // it('should display empty state if no data is provided', () => {
  //   const { queryByTestId } = render(<OpenOrdersTable wallet={wallet} />)
  //
  //   expect(queryByTestId(EMPTY_STATE)).not.toBeNull()
  // })

  it('should show rows if data is provided', () => {
    const openOrders = [
      {
        id: 21547225,
        date: '2022-01-19 15:11:46',
        unix_time: 1642626706,
        price: '1000.0000',
        pair: 'BTC/ALGO',
        type: 'BUY',
        status: 'OPEN',
        amount: '1000.000'
      }
    ]

    const { queryByTestId } = render(<OpenOrdersTable orders={openOrders} wallet={wallet} />)

    expect(queryByTestId(OPEN_ORDER_ROW)).not.toBeNull()
    // expect(queryByTestId(EMPTY_STATE)).toBeNull()
  })
})
