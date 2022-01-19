import React from 'react'
import { TradeHistoryView as Component, default as ComponentWithData } from './TradeHistory'
import asset from 'spec/Asset'
import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  background: ${({ theme }) => theme.colors.gray['800']};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
export default {
  title: 'Asset',
  component: Component,
  parameters: {
    layout: 'fullscreen'
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

export const TradeHistory = Template.bind({})
TradeHistory.args = {
  asset: {
    ...asset,
    ...{
      circulating: 99989339745,
      decimals: 6,
      deleted: false,
      fullName: 'Lamps',
      id: 15322902,
      name: 'LAMP',
      timestamp: 1618666459,
      total: 100000000000,
      txid: 'NOFSUK4EXHFFXJK3ZA6DZMGE6CAGQ7G5JT2X7FYTYQBSQEBZHY4Q',
      txns: 377155,
      url: null,
      verified: false
    }
  },
  tradesData: [
    {
      amount: '0.001171',
      id: 341492,
      price: '2490.0000',
      timestamp: 1642618469000,
      type: 'buyASA'
    },
    {
      amount: '0.001171',
      id: 341492,
      price: '2490.0000',
      timestamp: 1642618469000,
      type: 'buyASA'
    }
  ]
}

export const TradeHistoryPreview = TemplateWithData.bind({})
TradeHistoryPreview.args = {
  asset
}
