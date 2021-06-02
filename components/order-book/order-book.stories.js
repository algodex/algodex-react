import React from 'react'
import OrderBook from '.'

export default {
  title: 'Order Book',
  component: OrderBook,
  decorators: [
    (Story) => (
      <div
        style={{
          width: '300px',
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

const randomInt = (min, max) => {
  return min + Math.floor(Math.random() * (max - min))
}

const generateBookData = (startPrice, increment, qty = 24) => {
  let result = []
  let total = 0
  for (let i = 0; i < qty; i++) {
    const amount = randomInt(1, 300)
    total = total + amount
    const row = {
      price: (i * increment + startPrice).toFixed(4),
      amount,
      total
    }
    result.push(row)
  }
  return result
}

const Template = (args) => <OrderBook {...args} />

export const Default = Template.bind({})
Default.args = {
  assetName: 'FAME',
  currentPrice: 1.3765,
  priceChange: -0.1,
  sellData: generateBookData(1.3766, 0.0001),
  buyData: generateBookData(1.3764, -0.0001)
}

export const LowOrders = Template.bind({})
LowOrders.args = {
  assetName: 'FAME',
  currentPrice: 1.3765,
  priceChange: 0.1,
  sellData: generateBookData(1.3766, (randomInt(1, 5) * 0.0001).toFixed(4), randomInt(5, 15)),
  buyData: generateBookData(1.3764, -(randomInt(1, 5) * 0.0001).toFixed(4), randomInt(5, 15))
}
