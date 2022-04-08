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
