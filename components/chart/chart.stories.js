import React from 'react'
import {
  DEMO_BASE_ASSET,
  DEMO_ALGO_VOLUME,
  DEMO_DAILY_CHANGE,
  DEMO_ASSET_NAME,
  DEMO_OHLC,
  DEMO_BID,
  DEMO_ASK,
  DEMO_SPREAD,
  DEMO_CANDLE_CHART_MODE,
  DEMO_AREA_CHART_MODE,
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
  assetName: '',
  dailyChange: 0,
  algoVolume: 0,
  baseAsset: DEMO_BASE_ASSET,
  ohlc: { open: 0, high: 0, low: 0, close: 0 },
  bid: 0,
  ask: 0,
  spread: 0
}

export const Candlestick = Template.bind({})
Candlestick.args = {
  assetName: DEMO_ASSET_NAME,
  dailyChange: DEMO_DAILY_CHANGE,
  algoVolume: DEMO_ALGO_VOLUME,
  baseAsset: DEMO_BASE_ASSET,
  ohlc: DEMO_OHLC,
  bid: DEMO_BID,
  ask: DEMO_ASK,
  spread: DEMO_SPREAD,
  initialChartMode: DEMO_CANDLE_CHART_MODE,
  priceData: DEMO_PRICE_DATA,
  volumeData: DEMO_VOLUME_DATA
}

export const AreaSeries = Template.bind({})
AreaSeries.args = {
  assetName: DEMO_ASSET_NAME,
  dailyChange: DEMO_DAILY_CHANGE,
  algoVolume: DEMO_ALGO_VOLUME,
  baseAsset: DEMO_BASE_ASSET,
  ohlc: DEMO_OHLC,
  bid: DEMO_BID,
  ask: DEMO_ASK,
  spread: DEMO_SPREAD,
  initialChartMode: DEMO_AREA_CHART_MODE,
  priceData: DEMO_PRICE_DATA,
  volumeData: DEMO_VOLUME_DATA
}
