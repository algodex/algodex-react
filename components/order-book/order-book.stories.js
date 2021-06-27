import React from 'react'
import OrderBook from './view'
import { generateBookData, randomInt } from './demo'

export default {
  title: 'Order Book',
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
  asset,
  priceChange: -0.1,
  sellData: generateBookData(1.3766, 0.0001),
  buyData: generateBookData(1.3764, -0.0001)
}

export const LowOrders = Template.bind({})
LowOrders.args = {
  asset,
  priceChange: 0.1,
  sellData: generateBookData(1.3766, (randomInt(1, 5) * 0.0001).toFixed(4), randomInt(5, 15)),
  buyData: generateBookData(1.3764, -(randomInt(1, 5) * 0.0001).toFixed(4), randomInt(5, 15))
}
