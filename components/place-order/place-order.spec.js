import React from 'react'
import { render } from '../../test/test-utils'
import PlaceOrderView from './view'
import WalletService from 'services/wallet'
jest.mock('services/wallet')

const PLACE_ORDER = 'place-order'

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

describe('PlaceOrder', () => {
  it('should render', () => {
    WalletService.getMinWalletBalance = jest.fn().mockResolvedValue(1000000)
    const { getByTestId } = render(
      <PlaceOrderView
        asset={asset}
        wallets={wallets}
        activeWalletAddress={wallets[1].address}
        isSignedIn={true}
        orderBook={{
          buyOrders: [],
          sellOrders: []
        }}
        refetchWallets={() => {}}
      />
    )

    expect(getByTestId(PLACE_ORDER)).toBeVisible()
  })
})
