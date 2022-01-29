import {
  DEMO_ALGO_VOLUME,
  DEMO_ASK,
  DEMO_ASSET,
  DEMO_BID,
  DEMO_OHLC,
  DEMO_PRICE_DATA,
  DEMO_SPREAD,
  DEMO_VOLUME_DATA
} from 'spec/Chart'

import { ChartView as Component, default as ComponentWithData } from './Chart'
import React from 'react'
import styled from 'styled-components'
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
  parameters: { layout: 'fullscreen', controls: { include: ['asset', 'isLive'] } },
  args: {
    asset: DEMO_ASSET,
    isLive: false,
    asaVolume: DEMO_ALGO_VOLUME,
    ohlc: DEMO_OHLC,
    bid: DEMO_BID,
    ask: DEMO_ASK,
    spread: DEMO_SPREAD,
    priceData: DEMO_PRICE_DATA,
    volumeData: DEMO_VOLUME_DATA
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
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

// const Template = (args) => <Component {...args} />
// const TemplateWithData = (args) => <ComponentWithData {...args} />
//eslint-disable-next-line
export const Chart = ({ isLive, asset, ...props }) => (
  <>
    {!isLive && <Component asset={asset} {...props} />}
    {isLive && <ComponentWithData asset={asset} />}
    {isLive && <ReactQueryDevtools initialIsOpen={false} />}
  </>
)
// export const Chart = Template.bind({})
// Chart.parameters =
// Chart.args = {
//   asset: DEMO_ASSET,
//   asaVolume: DEMO_ALGO_VOLUME,
//   ohlc: DEMO_OHLC,
//   bid: DEMO_BID,
//   ask: DEMO_ASK,
//   spread: DEMO_SPREAD,
//   priceData: DEMO_PRICE_DATA,
//   volumeData: DEMO_VOLUME_DATA
// }
// export const ChartPreview = TemplateWithData.bind({})
// ChartPreview.parameters = { layout: 'fullscreen', controls: { include: ['asset'] } }
// ChartPreview.args = {
//   asset: DEMO_ASSET
// }
