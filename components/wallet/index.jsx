import PropTypes from 'prop-types'
import useStore, { useStorePersisted } from 'store/use-store'
import WalletView from './view'

function Wallet(props) {
  const { onWalletConnect } = props

  const wallets = useStorePersisted((state) => state.wallets)
  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)
  const setActiveWalletAddress = useStorePersisted((state) => state.setActiveWalletAddress)
  const isSignedIn = useStore((state) => state.isSignedIn)

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
