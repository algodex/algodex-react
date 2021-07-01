import PropTypes from 'prop-types'
import PlaceOrderView from './view'

import useStore from 'store/use-store'

function PlaceOrder(props) {
  const { refetchWallets } = props

  const asset = useStore((state) => state.asset)
  const wallets = useStore((state) => state.wallets)
  const activeWalletAddress = useStore((state) => state.activeWalletAddress)
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
    />
  )
}

PlaceOrder.propTypes = {
  refetchWallets: PropTypes.func.isRequired
}

export default PlaceOrder
