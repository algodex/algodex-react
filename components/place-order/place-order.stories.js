import React from 'react'
import PlaceOrder from '.'

export default {
  title: 'PlaceOrder',
  component: PlaceOrder,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '320px',
          height: '640px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Story />
      </div>
    )
  ]
}

const Template = (args) => <PlaceOrder {...args} />

// @todo: design no wallet view

// export const NoWallet = Template.bind({})
// NoWallet.args = {
//   activeWallet: undefined,
//   asset: 'YLDY'
// }

export const HasWallet = Template.bind({})
HasWallet.args = {
  activeWallet: { id: 'wallet-01', name: 'Main', balance: 812569.2658 },
  asset: 'YLDY'
}
