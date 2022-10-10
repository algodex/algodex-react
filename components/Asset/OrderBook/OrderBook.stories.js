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
import { OrderBook as Component, default as ComponentWithData, OrderBookPrice } from './OrderBook'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useQueryClient } from 'react-query'
import { isUndefined } from 'lodash/lang'

const assets = {
  VOTE: { id: 48806985, decimals: 6, price_info: { price: 1, price24Change: -10 } },
  LAMP: { id: 15322902, decimals: 6 }
}

export default {
  title: '@algodex/recipes/Asset/Orderbook',
  component: Component,
  argTypes: {
    asset: {
      options: Object.keys(assets),
      mapping: assets,
      control: {
        type: 'select'
      }
    }
  },
  args: {
    isLive: false,
    isCleared: false,
    price: 1,
    change: 20,
    asset: assets.VOTE,
    orders: {
      sell: [
        {
          amount: 0.004234,
          price: '1000000000000000000.0000',
          total: 33.38740400000001
        },
        {
          amount: 0.042853,
          price: '10000000000000000.0000',
          total: 33.383170000000014
        }
      ],
      buy: [
        {
          amount: 0.026283,
          price: '1950.0000',
          total: 0.026283
        },
        {
          amount: 0.008604,
          price: '1850.0000',
          total: 0.034887
        },
        {
          amount: 1.1598770000000003,
          price: '1800.0000',
          total: 1.1947640000000002
        }
      ]
    }
  },
  parameters: { layout: 'fullscreen', controls: { exclude: ['orders'] } },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Story />
      </div>
    )
  ]
}
/* eslint-disable react/prop-types */
export const Orderbook = ({ asset, price, change, orders, isLive, isCleared }) => {
  const queryClient = useQueryClient()
  if (isCleared) queryClient.clear()
  if (!isLive && !isUndefined(asset.price_info)) {
    asset.price_info.price = price
    asset.price_info.price24Change = change
  }
  return (
    <>
      {!isLive && (
        <Component asset={asset} orders={orders} components={{ PriceDisplay: OrderBookPrice }} />
      )}
      {isLive && <ComponentWithData asset={asset} />}
      {isLive && <ReactQueryDevtools initialIsOpen={false} />}
    </>
  )
}
