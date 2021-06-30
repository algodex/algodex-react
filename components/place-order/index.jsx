import PropTypes from 'prop-types'
import PlaceOrderView from './view'
import MobilePlaceOrderView from 'components/mobile-place-order-view'
import useStore from 'store/use-store'

function PlaceOrder(props) {
  const { refetchWallets } = props

  const asset = useStore((state) => state.asset)
  const wallets = useStore((state) => state.wallets)
  const activeWalletAddress = useStore((state) => state.activeWalletAddress)
  const isSignedIn = useStore((state) => state.isSignedIn)

  return (
    <>
      <PlaceOrderView
        asset={asset}
        wallets={wallets}
        activeWalletAddress={activeWalletAddress}
        isSignedIn={isSignedIn}
        refetchWallets={refetchWallets}
      />
      <MobilePlaceOrderView
        asset={asset}
        wallets={wallets}
        activeWalletAddress={activeWalletAddress}
        isSignedIn={isSignedIn}
        refetchWallets={refetchWallets}
      />
    </>
  )
}

PlaceOrder.propTypes = {
  refetchWallets: PropTypes.func.isRequired
}

export default PlaceOrder
