import React from 'react'
import OrderBook from '.'

export default {
  title: 'Asset/Order Book',
  component: OrderBook,
  decorators: [
    (Story) => (
      <div
        style={{
          width: '320px',
          height: '700px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Story />
      </div>
    )
  ]
}

const Template = (args) => <OrderBook {...args} />

const asset = {
  id: 15322902,
  name: 'LAMP',
  decimals: 6,
  price: 0.5
}

export const Default = Template.bind({})
Default.args = {
  asset: asset,
  sellData: [],
  buyData: []
}

export const LowOrders = Template.bind({})
LowOrders.args = {
  asset: asset,
  sellData: [],
  buyData: []
}
