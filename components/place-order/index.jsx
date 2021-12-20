import PropTypes from 'prop-types'
import PlaceOrderView from './view'
import useStore, { useStorePersisted } from 'store/use-store'

function PlaceOrder(props) {
  const { refetchWallets, walletConnector } = props

  const wallets = useStorePersisted((state) => state.wallets)
  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)
  const asset = useStore((state) => state.asset)
  const isSignedIn = useStore((state) => state.isSignedIn)
  const orderBook = useStore((state) => state.orderBook)

  return (
    <PlaceOrderView
      asset={asset}
      wallets={wallets}
      activeWalletAddress={activeWalletAddress}
      isSignedIn={isSignedIn}
      orderBook={orderBook}
      refetchWallets={refetchWallets}
      walletConnector={walletConnector}
    />
  )
}

PlaceOrder.propTypes = {
  refetchWallets: PropTypes.func.isRequired
}

export default PlaceOrder
