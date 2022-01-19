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
  YLDY: { ...DEMO_ASSET },
  OTHER: {
    name: 'OTHER',
    ...DEMO_ASSET
  }
}
export default {
  title: '@algodex/components/Asset',
  component: Component,
  argsTypes: {
    asset: {
      options: Object.keys(assets), // An array of serializable values
      mapping: assets, // Maps serializable option values to complex arg values
      control: {
        type: 'select', // Type 'select' is automatically inferred when 'options' is defined
        labels: {
          // 'labels' maps option values to string labels
          YDLY: 'YDLY',
          OTHER: 'OTHER'
        }
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

const Template = (args) => <Component {...args} />
const TemplateWithData = (args) => <ComponentWithData {...args} />

export const Chart = Template.bind({})
Chart.parameters = { layout: 'fullscreen', controls: { include: ['asset'] } }
Chart.args = {
  asset: DEMO_ASSET,
  asaVolume: DEMO_ALGO_VOLUME,
  ohlc: DEMO_OHLC,
  bid: DEMO_BID,
  ask: DEMO_ASK,
  spread: DEMO_SPREAD,
  priceData: DEMO_PRICE_DATA,
  volumeData: DEMO_VOLUME_DATA
}
export const ChartPreview = TemplateWithData.bind({})
ChartPreview.parameters = { layout: 'fullscreen', controls: { include: ['asset'] } }
ChartPreview.args = {
  asset: DEMO_ASSET
}
