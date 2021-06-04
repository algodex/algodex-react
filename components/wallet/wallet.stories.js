import React from 'react'
import Wallet from '.'

export default {
  title: 'Wallet',
  component: Wallet,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '320px',
          height: '320px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Story />
      </div>
    )
  ]
}

const Template = (args) => <Wallet {...args} />

export const NoWallets = Template.bind({})
NoWallets.args = {
  wallets: [],
  activeWalletId: null,
  onConnectClick: () => null,
  onWalletClick: () => null
}

export const HasWallets = Template.bind({})
HasWallets.args = {
  wallets: [
    { id: 'wallet-01', name: 'Main', balance: 812569.2658 },
    { id: 'wallet-02', name: 'Trading', balance: 63125.7856 },
    { id: 'wallet-03', name: 'Stablecoins', balance: 1078.9265 }
  ],
  activeWalletId: 'wallet-01'
}
