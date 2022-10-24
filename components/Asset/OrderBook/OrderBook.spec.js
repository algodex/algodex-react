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

import { OrderBookPrice as OrderBookPriceView } from './OrderBook'
import { OrderBook as OrderBookView } from './OrderBook'
import React from 'react'
import { render } from 'test/test-utils'

const SELL_ROW = 'order-book-sell-row'
const BUY_ROW = 'order-book-buy-row'

describe('Order Book', () => {
  const asset = {
    id: 15322902,
    name: 'LAMP',
    price: 1.3765,
    decimals: 6
  }

  const baseAssetData = {
    circulating: 99989322377,
    decimals: 6,
    deleted: false,
    fullName: 'Lamps',
    id: 15322902,
    name: 'LAMP',
    price_info: {
      id: 15322902,
      isTraded: true,
      price: 2120,
      price24Change: -15.166066426570628,
      priceBefore: 2499,
      unix_time: 1644016284
    },
    timestamp: 1618666459,
    total: 100000000000,
    txid: 'NOFSUK4EXHFFXJK3ZA6DZMGE6CAGQ7G5JT2X7FYTYQBSQEBZHY4Q',
    txns: 614736,
    url: null,
    verified: false
  }

  const decreaseInPrice = {
    ...baseAssetData,
    price_info: {
      price24Change: -15.166066426570628
    }
  }
  const increaseInPrice = {
    ...baseAssetData,
    price_info: {
      price24Change: 1.5166066426570628
    }
  }

  it('should not show rows if no data is provided', () => {
    const { queryByTestId } = render(<OrderBookView asset={asset} orders={{ buy: [], sell: [] }} />)

    expect(queryByTestId(SELL_ROW)).toBeNull()
    expect(queryByTestId(BUY_ROW)).toBeNull()
  })

  it('should show rows if data is provided', () => {
    const orders = {
      buy: [{ price: 1.0, amount: 123, total: 123 }],
      sell: [{ price: 1.0, amount: 123, total: 123 }]
    }

    const { queryByTestId } = render(<OrderBookView asset={asset} orders={orders} />)

    expect(queryByTestId(SELL_ROW)).not.toBeNull()
    expect(queryByTestId(BUY_ROW)).not.toBeNull()
  })

  it('should reflect price increase', () => {
    const { queryByTestId } = render(<OrderBookPriceView asset={increaseInPrice} />)
    expect(queryByTestId('arrow-up')).not.toBeNull()
  })

  it('should reflect price decrease', () => {
    const { queryByTestId } = render(<OrderBookPriceView asset={decreaseInPrice} />)
    expect(queryByTestId('arrow-down')).not.toBeNull()
  })
})
