import React from 'react'
import { render } from '../../test/test-utils'
import Wallet from '.'
import theme from '../../theme'

const CONNECT_BUTTON = 'connect-wallet-btn'

describe('Wallet', () => {
  describe('if no wallets are passed', () => {
    it('should show connect wallet message', () => {
      const { getByText } = render(<Wallet />)

      expect(getByText(/Start by connecting an Algorand wallet/i)).toBeVisible()
    })

    it('should show primary connect button', () => {
      const { getByTestId } = render(<Wallet />)

      expect(getByTestId(CONNECT_BUTTON)).toHaveStyle({
        backgroundColor: theme.colors.green['500']
      })
    })
  })

  describe('if wallets are passed', () => {
    const wallets = [
      { id: 'wallet-01', name: 'Main', balance: 812569.2658 },
      { id: 'wallet-02', name: 'Trading', balance: 63125.7856 },
      { id: 'wallet-03', name: 'Stablecoins', balance: 1078.9265 }
    ]

    it('should show wallets list', () => {
      const { getByText } = render(<Wallet wallets={wallets} activeWalletId={wallets[0].id} />)

      expect(getByText(/Balance \(ALGO\)/i)).toBeVisible()
    })

    it('should show secondary connect button', () => {
      const { getByTestId } = render(<Wallet wallets={wallets} activeWalletId={wallets[0].id} />)

      expect(getByTestId(CONNECT_BUTTON)).toHaveStyle({
        backgroundColor: theme.colors.gray['600']
      })
    })
  })
})
