import React from 'react'

import {
  DEMO_CHART_DATA,
  DEMO_VOLUME_DATA,
  DEMO_BID_ASK_PRICE,
  DEMO_SELECTED_PAIR,
  DEMO_VOLUME_AMOUNT,
  DEMO_DAILY_CHANGE_PERCENT,
  DEMO_OHLC
} from './demo'
import Chart from '.'
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
  bidAndAsk: {
    bid: 0,
    ask: 0
  },
  priceData: [],
  volume24hr: 0,
  pair: ['ALGO', 'ALGO'],
  dailyChange: 0,
  ohlc: {
    open: 0,
    high: 0,
    low: 0,
    close: 0
  },
  volumeData: [],
  initialMode: 'CANDLE'
}

export const Candlestick = Template.bind({})
Candlestick.args = {
  bidAndAsk: DEMO_BID_ASK_PRICE,
  priceData: DEMO_CHART_DATA,
  volume24hr: DEMO_VOLUME_AMOUNT,
  pair: DEMO_SELECTED_PAIR,
  dailyChange: DEMO_DAILY_CHANGE_PERCENT,
  ohlc: DEMO_OHLC,
  volumeData: DEMO_VOLUME_DATA,
  initialMode: 'CANDLE'
}

export const Line = Template.bind({})
Line.args = {
  bidAndAsk: DEMO_BID_ASK_PRICE,
  priceData: DEMO_CHART_DATA,
  volume24hr: DEMO_VOLUME_AMOUNT,
  pair: DEMO_SELECTED_PAIR,
  dailyChange: DEMO_DAILY_CHANGE_PERCENT,
  ohlc: DEMO_OHLC,
  volumeData: DEMO_VOLUME_DATA,
  initialMode: 'LINE'
}
