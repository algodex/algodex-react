import {} from './wallet-connect.css'
import PropTypes from 'prop-types'
import useMyAlgo from 'hooks/useMyAlgo'

import DropdownBody from './DropdownBody'
import DropdownFooter from './DropdownFooter'
import DropdownHeader from './DropdownHeader'

const WalletConnectDropdown = ({ closeFn }) => {
  const { connect: onWalletConnect } = useMyAlgo()

  return (
    <div className="flex flex-col justify-between">
      <DropdownHeader closeFn={closeFn} />
      <DropdownBody
        connectMyAlgoWallet={() => onWalletConnect()}
        connectAlgorandMobileWallet={() => console.log('Connect Algorand Mobile Wallet')}
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
