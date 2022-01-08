import {} from './wallet-connect.css'

import DropdownBody from './DropdownBody'
import DropdownFooter from './DropdownFooter'
import DropdownHeader from './DropdownHeader'
import PropTypes from 'prop-types'
import useWalletController from 'hooks/useWalletController'

const WalletConnectDropdown = ({ closeFn, activeWalletAddress }) => {
  const { addConnection: connectMyAlgoFn } = useWalletController('MyAlgo')
  const { addConnection: connectAlgorandWalletFn } = useWalletController('AlgorandOfficial')

  return (
    <div className="flex flex-col justify-between">
      <DropdownHeader closeFn={closeFn} />
      <DropdownBody
        connectMyAlgoWallet={() => connectMyAlgoFn()}
        connectAlgorandMobileWallet={() => connectAlgorandWalletFn()}
        closeFn={closeFn}
        activeWalletAddress={activeWalletAddress}
      />
      <DropdownFooter />
    </div>
  )
}

WalletConnectDropdown.propTypes = {
  closeFn: PropTypes.func,
  activeWalletAddress: PropTypes.string
}

export default WalletConnectDropdown
