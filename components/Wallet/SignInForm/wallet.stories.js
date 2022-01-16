import React from 'react'
import WalletView from './view'

export default {
  title: 'Wallet',
  component: WalletView,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '320px',
          height: '240px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Story />
      </div>
    )
  ]
}

const Template = (args) => <WalletView {...args} />

export const NoWallets = Template.bind({})
NoWallets.args = {
  wallets: [],
  activeWalletAddress: null
}

export const HasWallets = Template.bind({})
HasWallets.args = {
  wallets: [
    { address: 'wallet-01', name: 'Main', balance: 812569.2658 },
    { address: 'wallet-02', name: 'Trading', balance: 63125.7856 },
    { address: 'wallet-03', name: 'Stablecoins', balance: 1078.9265 }
  ],
  activeWalletAddress: 'wallet-01',
  isSignedIn: true
}

export const WalletsScroll = Template.bind({})
WalletsScroll.args = {
  wallets: [
    { address: 'wallet-01', name: 'Main', balance: 812569.2658 },
    { address: 'wallet-02', name: 'Trading', balance: 63125.7856 },
    { address: 'wallet-03', name: 'Stablecoins', balance: 1078.9265 },
    { address: 'wallet-04', name: 'Foo', balance: 812569.2658 },
    { address: 'wallet-05', name: 'Bar', balance: 63125.7856 },
    { address: 'wallet-06', name: 'Baz', balance: 1078.9265 }
  ],
  activeWalletAddress: 'wallet-01',
  isSignedIn: true
}
