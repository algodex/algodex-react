import React from 'react'
import { AssetInfo as Component, default as ComponentWithData } from './Asset'
import generateAsset from '../../spec/Asset'
import { ReactQueryDevtools } from 'react-query/devtools'
import styled from '@emotion/styled'
import { useQueryClient } from 'react-query'
import { withExplorerAssetInfo } from '@/hooks/withAlgoExplorer'
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

/**
 * @todo: Add Selection for Assets
 * @todo: Add withData hooks and isLive flag
 */
// const asset = {
//   circulating: 99989322377,
//   decimals: 6,
//   deleted: false,
//   fullName: 'Lamps',
//   id: 15322902,
//   name: 'LAMP',
//   timestamp: 1618666459,
//   total: 100000000000,
//   txid: 'NOFSUK4EXHFFXJK3ZA6DZMGE6CAGQ7G5JT2X7FYTYQBSQEBZHY4Q',
//   txns: 550235,
//   url: null,
//   verified: false
// }

export default {
  title: '@algodex/recipes/Asset/Asset Info',
  component: Component,
  parameters: { layout: 'fullscreen' },
  args: {
    isLive: false,
    isCleared: false,
    isRegenerate: false,
    asset: {
      ...generateAsset(),
      id: 15322902
    }
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
      {!isLive && <Component asset={asset} price={price} {...props} />}
      {isLive && <LiveComponent asset={asset} />}
      {isLive && <ReactQueryDevtools initialIsOpen={false} />}
    </>
  )
}
