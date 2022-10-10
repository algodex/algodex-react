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
import { TradeHistory as Component, default as ComponentWithData } from './TradeHistory'
import asset from 'spec/Asset'
import styled from '@emotion/styled'
import { ReactQueryDevtools } from 'react-query/devtools'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  background: ${({ theme }) => theme.palette.gray['800']};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const assets = {
  VOTE: { id: 48806985, decimals: 6, name: 'VOTE' },
  LAMP: { id: 15322902, decimals: 6, name: 'LAMP' }
}

export default {
  title: '@algodex/recipes/Asset/Trade History',
  component: Component,
  parameters: {
    layout: 'fullscreen',
    controls: { exclude: ['tradesData'] }
  },
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
    asset: {
      ...asset,
      ...{
        circulating: 99989339745,
        decimals: 6,
        deleted: false,
        fullName: 'Lamps',
        id: 15322902,
        name: 'LAMP',
        timestamp: 1618666459,
        total: 100000000000,
        txid: 'NOFSUK4EXHFFXJK3ZA6DZMGE6CAGQ7G5JT2X7FYTYQBSQEBZHY4Q',
        txns: 377155,
        url: null,
        verified: false
      }
    },
    isLive: false,
    orders: [
      {
        amount: '0.001171',
        id: 341492,
        price: '2490.0000',
        timestamp: 1642618469000,
        type: 'buyASA'
      },
      {
        amount: '0.001171',
        id: 341492,
        price: '2490.0000',
        timestamp: 1642618469000,
        type: 'buyASA'
      }
    ]
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

//eslint-disable-next-line
export const TradeHistory = ({ asset, isLive, ...props }) => (
  <>
    {!isLive && <Component asset={asset} {...props} />}
    {isLive && <ComponentWithData asset={asset} />}
    {isLive && <ReactQueryDevtools initialIsOpen={false} />}
  </>
)
