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
import { AssetInfo as Component, default as ComponentWithData } from './Asset'
import generateAsset, { Example } from '../../spec/Asset'
import { ReactQueryDevtools } from 'react-query/devtools'
import styled from '@emotion/styled'
import { useQueryClient } from 'react-query'
import { withExplorerAssetInfo } from '@algodex/algodex-hooks'
const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.gray[200]};
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  overflow: hidden;
`

export default {
  title: '@algodex/recipes/Asset/Asset Info',
  component: Component,
  parameters: { layout: 'fullscreen' },
  args: {
    isLive: false,
    isCleared: false,
    isRegenerate: false,
    asset: Example
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}
const LiveComponent = withExplorerAssetInfo(ComponentWithData)
//eslint-disable-next-line
export const AssetInfo = ({ asset, price, isLive, isRegenerate, isCleared, ...props }) => {
  const queryClient = useQueryClient()
  if (isCleared) queryClient.clear()
  if (isRegenerate) asset = generateAsset()
  return (
    <>
      {!isLive && <Component asset={asset} {...props} />}
      {isLive && <LiveComponent asset={asset} />}
      {isLive && <ReactQueryDevtools initialIsOpen={false} />}
    </>
  )
}
