import React from 'react'
import TradeHistoryView from '.'

export default {
  title: 'Asset/Trade History',
  component: TradeHistoryView,
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

const Template = (args) => <TradeHistoryView {...args} />

export const Default = Template.bind({})
Default.args = {
  asset: { id: 123, name: 'YLDY', decimals: 6 },
  tradesData: []
}
