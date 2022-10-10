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
import { AssetsTable as Component, default as ComponentWithData } from './AssetsTable'
import styled from '@emotion/styled'
import { ReactQueryDevtools } from 'react-query/devtools'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.palette.gray['700']};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
`

export default {
  title: '@algodex/recipes/Wallet/Table/Assets Table',
  component: Component,
  parameters: { layout: 'fullscreen', controls: { exclude: ['assets', 'wallet'] } },
  args: {
    wallet: {
      address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
    },
    assets: [
      {
        unit: 'TEST',
        id: 22847687,
        name: 'TEST',
        total: '100',
        available: '10',
        'in-order': '0',
        'algo-value': '0.888'
      }
    ],
    isLive: false
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
export const AssetsTable = ({ wallet, assets, isLive, ...props }) => (
  <>
    {!isLive && <Component wallet={wallet} assets={assets} {...props} />}
    {isLive && <ComponentWithData wallet={wallet} />}
    {isLive && <ReactQueryDevtools initialIsOpen={false} />}
  </>
)
