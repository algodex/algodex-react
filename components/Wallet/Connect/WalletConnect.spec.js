import React from 'react'
import { render } from 'test/test-utils'
import { WalletView } from './WalletConnect'
import theme from 'theme'

const CONNECT_BUTTON = 'connect-wallet-btn'

describe('Wallet', () => {
  describe('if no wallets are connected', () => {
    it('should show connect wallet message', () => {
      const { getByText } = render(
        <WalletView
          wallets={[]}
          activeWalletAddress={''}
          isSignedIn={false}
          onConnectClick={() => null}
          onSetActiveWallet={() => null}
        />
      )

      expect(getByText(/Connect Wallet/i)).toBeVisible()
    })

    it('should show primary connect button', () => {
      const { getByTestId } = render(
        <WalletView
          wallets={[]}
          activeWalletAddress={''}
          isSignedIn={false}
          onConnectClick={() => null}
          onSetActiveWallet={() => null}
        />
      )

      expect(getByTestId(CONNECT_BUTTON)).toHaveStyle({
        backgroundColor: theme.palette.green['500']
      })
    })
  })

  describe('if wallets are passed', () => {
    const wallets = [
      { address: 'wallet-01', name: 'Main', balance: 812569.2658 },
      { address: 'wallet-02', name: 'Trading', balance: 63125.7856 },
      { address: 'wallet-03', name: 'Stablecoins', balance: 1078.9265 }
    ]

    it('should show wallets list', () => {
      const { getByText } = render(
        <WalletView
          wallets={wallets}
          activeWalletAddress={wallets[0].address}
          isSignedIn={true}
          onConnectClick={() => null}
          onSetActiveWallet={() => null}
        />
      )

      expect(getByText(/Balance/i)).toBeVisible()
      expect(getByText(/Stablecoins/i)).toBeVisible()
    })

    it('should show secondary connect button', () => {
      const { getByTestId } = render(
        <WalletView
          wallets={wallets}
          activeWalletAddress={wallets[0].address}
          isSignedIn={true}
          onConnectClick={() => null}
          onSetActiveWallet={() => null}
        />
      )

      expect(getByTestId(CONNECT_BUTTON)).toHaveStyle({
        backgroundColor: theme.palette.gray['600']
      })
    })
  })
})
