import React from 'react'
import TradeHistory from '.'
import { generateTradesData } from './demo'

export default {
  title: 'Trade History',
  component: TradeHistory,
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

const Template = (args) => <TradeHistory {...args} />

export const Default = Template.bind({})
Default.args = {
  assetName: 'YLDY',
  tradesData: generateTradesData(1.3766, 0.0001)
}
