import React from 'react'
import { OrderBookView as Component, default as ComponentWithData } from './OrderBook'

export default {
  title: 'Asset/Order Book',
  component: Component,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Story />
      </div>
    )
  ]
}

const Template = (args) => <Component {...args} />
const TemplateWithData = (args) => <ComponentWithData {...args} />

const asset = {
  id: 15322902,
  name: 'LAMP',
  decimals: 6,
  price: 0.5
}

export const Orderbook = Template.bind({})
Orderbook.args = {
  asset: asset,
  sellData: [
    {
      amount: 0.004234,
      price: '1000000000000000000.0000',
      total: 33.38740400000001
    },
    {
      amount: 0.042853,
      price: '10000000000000000.0000',
      total: 33.383170000000014
    }
  ],
  buyData: [
    {
      amount: 0.026283,
      price: '1950.0000',
      total: 0.026283
    },
    {
      amount: 0.008604,
      price: '1850.0000',
      total: 0.034887
    },
    {
      amount: 1.1598770000000003,
      price: '1800.0000',
      total: 1.1947640000000002
    }
  ]
}

export const OrderbookPreview = TemplateWithData.bind({})
OrderbookPreview.args = {
  asset: asset
  // sellData: [],
  // buyData: []
}
