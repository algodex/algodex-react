import React from 'react'
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
  title: 'Asset/Chart',
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
  asset: {},
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
  asset: {},
  asaVolume: {},
  ohlc: {},
  bid: {},
  ask: {},
  spread: {},
  priceData: {},
  volumeData: {}
}
