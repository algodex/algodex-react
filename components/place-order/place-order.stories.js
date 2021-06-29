import React from 'react'
import PlaceOrderView from './view'

export default {
  title: 'PlaceOrder',
  component: PlaceOrderView,
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

const Template = (args) => <PlaceOrderView {...args} />

const asset = {
  id: 15322902,
  name: 'LAMP',
  decimals: 6,
  price: 1.75
}

const wallets = [
  {
    address: 'FOSOZ3VVQ6WTBA32PZNZSVV3YNZ6BXMHVHZPLVGMQ6BXSUGBKP6JUUAK3E',
    name: 'FOSO...AK3E',
    balance: 0,
    assets: {}
  },
  {
    address: 'X5RS35DM4FDQZQ5GRGIOSM33DQGL7PSE222NIFIBS4NR3J36WS4P74LTAQ',
    name: 'X5RS...LTAQ',
    balance: 10.391179,
    assets: {
      15322902: {
        balance: 6.217775
      }
    }
  }
]

export const HasWallets = Template.bind({})
HasWallets.args = {
  asset,
  wallets,
  activeWalletAddress: wallets[1].address,
  isSignedIn: true,
  orderBook: {
    buyOrders: [],
    sellOrders: []
  },
  refetchWallets: () => {}
}
