import PropTypes from 'prop-types'
import useStore from 'store/use-store'
import WalletView from './view'

function Wallet(props) {
  const { onWalletConnect } = props

  const wallets = useStore((state) => state.wallets)
  const activeWalletAddress = useStore((state) => state.activeWalletAddress)
  const isSignedIn = useStore((state) => state.isSignedIn)

  const setActiveWalletAddress = useStore((state) => state.setActiveWalletAddress)

  return (
    <WalletView
      wallets={wallets}
      activeWalletAddress={activeWalletAddress}
      isSignedIn={isSignedIn}
      onConnectClick={onWalletConnect}
      onSetActiveWallet={setActiveWalletAddress}
    />
  )
}

Wallet.propTypes = {
  onWalletConnect: PropTypes.func.isRequired
}

export default Wallet
