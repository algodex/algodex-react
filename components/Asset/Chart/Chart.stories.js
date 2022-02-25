import {
  DEMO_ALGO_VOLUME,
  DEMO_ASK,
  // DEMO_ASSET,
  DEMO_BID,
  DEMO_OHLC,
  DEMO_PRICE_DATA,
  DEMO_SPREAD,
  DEMO_VOLUME_DATA
} from 'spec/Chart'

import { Chart as Component, default as ComponentWithData } from './Chart'
import React from 'react'
import styled from '@emotion/styled'
import { ReactQueryDevtools } from 'react-query/devtools'

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[900]};
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  padding: 0;
  margin: 0;
`
const assets = {
  VOTE: { id: 48806985, decimals: 6, name: 'VOTE' },
  LAMP: { id: 15322902, decimals: 6, name: 'LAMP' }
}

export default {
  title: '@algodex/recipes/Asset/Chart',
  component: Component,
  parameters: {
    layout: 'fullscreen',
    controls: { include: ['asset', 'interval', 'mode', 'isLive'] }
  },
  args: {
    interval: '1h',
    asset: 'LAMP',
    mode: 'candle',
    isLive: false,
    overlay: {
      orderbook: {
        bid: DEMO_BID,
        ask: DEMO_ASK,
        spread: DEMO_SPREAD
      },
      ohlc: DEMO_OHLC,
      volume: DEMO_ALGO_VOLUME
    },
    ohlc: DEMO_PRICE_DATA,
    volume: DEMO_VOLUME_DATA,
    onChange: console.log
  },
  argTypes: {
    asset: {
      options: Object.keys(assets),
      mapping: assets,
      control: {
        type: 'select'
      },
      defaultValue: 'LAMP'
    },
    interval: {
      options: ['1m', '5m', '15m', '1h', '4h', '1d'],
      control: {
        type: 'select'
      },
      defaultValue: '1h'
    },
    mode: {
      options: ['candle', 'area'],
      control: {
        type: 'select'
      }
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

//eslint-disable-next-line
export const Chart = ({ isLive, asset, interval, mode, ...props }) => (
  <>
    {/*<Component asset={asset} overlay={overlay} {...props} />*/}
    {!isLive && <Component asset={asset} interval={interval} mode={mode} {...props} />}
    {isLive && <ComponentWithData asset={asset} interval={interval} mode={mode} />}
    {isLive && <ReactQueryDevtools initialIsOpen={false} />}
  </>
)
