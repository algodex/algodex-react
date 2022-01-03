import {} from './wallet-connect.css'

import DropdownBody from './DropdownBody'
import DropdownFooter from './DropdownFooter'
import DropdownHeader from './DropdownHeader'
import PropTypes from 'prop-types'
import useMyAlgo from 'hooks/useMyAlgo'
import useWalletConnect from 'hooks/use-wallet-connect'

const WalletConnectDropdown = ({ closeFn }) => {
  const { connect: onWalletConnect } = useMyAlgo()
  const { walletConnect } = useWalletConnect()

  return (
    <div className="flex flex-col justify-between">
      <DropdownHeader closeFn={closeFn} />
      <DropdownBody
        connectMyAlgoWallet={() => onWalletConnect()}
        connectAlgorandMobileWallet={() => walletConnect()}
        closeFn={closeFn}
      />
      <DropdownFooter />
    </div>
  )
}

WalletConnectDropdown.propTypes = {
  closeFn: PropTypes.func
}

export default WalletConnectDropdown
