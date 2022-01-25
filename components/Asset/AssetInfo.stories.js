import React from 'react'
import { AssetInfo as Component, default as ComponentWithData } from './Asset'
import { ReactQueryDevtools } from 'react-query/devtools'
import styled from 'styled-components'
const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[200]};
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
const asset = {
  circulating: 99989322377,
  decimals: 6,
  deleted: false,
  fullName: 'Lamps',
  id: 15322902,
  name: 'LAMP',
  timestamp: 1618666459,
  total: 100000000000,
  txid: 'NOFSUK4EXHFFXJK3ZA6DZMGE6CAGQ7G5JT2X7FYTYQBSQEBZHY4Q',
  txns: 550235,
  url: null,
  verified: false
}

const price = {
  id: 15322902,
  isTraded: true,
  price: 1810,
  price24Change: -21.475054229934923,
  priceBefore: 2305,
  unix_time: 1642616539
}
export default {
  title: '@algodex/recipes/Asset/Asset Info',
  component: Component,
  parameters: { layout: 'fullscreen' },
  args: {
    isLive: false,
    asset,
    price
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
export const AssetInfo = ({ asset, price, isLive, ...props }) => (
  <>
    {!isLive && <Component asset={asset} price={price} {...props} />}
    {isLive && <ComponentWithData asset={asset} />}
    {isLive && <ReactQueryDevtools initialIsOpen={false} />}
  </>
)
