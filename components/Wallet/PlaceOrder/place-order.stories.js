import React from 'react'
import PlaceOrder from '.'

export default {
  title: 'Wallet/Place Order',
  component: PlaceOrder,
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

const asset = {
  id: 15322902,
  name: 'LAMP',
  decimals: 6,
  price: 1.75
}

export const ActiveWallet = Template.bind({})
ActiveWallet.args = {
  asset,
  wallet: {
    isSignedIn: true,
    account: {
      address: 'X5RS35DM4FDQZQ5GRGIOSM33DQGL7PSE222NIFIBS4NR3J36WS4P74LTAQ',
      name: 'X5RS...LTAQ',
      balance: 10.391179,
      assets: {
        15322902: {
          balance: 6.217775
        }
      }
    }
  }
}
export const NoActiveWallet = Template.bind({})
NoActiveWallet.args = {
  asset
}
