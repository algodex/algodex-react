import React from 'react'
import TradeHistory from '.'

export default {
  title: 'Trade History',
  component: TradeHistory,
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

const generateTradesData = (startPrice, increment, qty = 48) => {
  let result = []
  const now = new Date()
  for (let i = 0; i < qty; i++) {
    const amount = randomInt(1, 300)
    let timestamp = new Date(+now)
    timestamp = timestamp.getTime() - 1000 * i
    const row = {
      price: (i * increment + startPrice).toFixed(4),
      amount,
      timestamp
    }
    result.push(row)
  }
  return result
}

const Template = (args) => <TradeHistory {...args} />

export const Default = Template.bind({})
Default.args = {
  assetName: 'FAME',
  tradesData: generateTradesData(1.3766, 0.0001)
}
