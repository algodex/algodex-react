import React from 'react'
import {
  DEMO_ALGO_VOLUME,
  DEMO_ASSET,
  DEMO_OHLC,
  DEMO_BID,
  DEMO_ASK,
  DEMO_SPREAD,
  DEMO_PRICE_DATA,
  DEMO_VOLUME_DATA
} from './demo'
import Chart from './view'
import styled from 'styled-components'

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[900]};
  display: flex;
  width: 1100px;
  height: 600px;
  flex-direction: column;
  padding: 0;
  margin: 0;
`

export default {
  title: 'Chart',
  component: Chart,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

const Template = (args) => <Chart {...args} />

export const NoData = Template.bind({})
NoData.args = {
  asset: DEMO_ASSET,
  asaVolume: '0',
  ohlc: { open: 0, high: 0, low: 0, close: 0 },
  bid: '0',
  ask: '0',
  spread: '0',
  priceData: [],
  volumeData: []
}

export const Candlestick = Template.bind({})
Candlestick.args = {
  asset: DEMO_ASSET,
  asaVolume: DEMO_ALGO_VOLUME,
  ohlc: DEMO_OHLC,
  bid: DEMO_BID,
  ask: DEMO_ASK,
  spread: DEMO_SPREAD,
  priceData: DEMO_PRICE_DATA,
  volumeData: DEMO_VOLUME_DATA
}
