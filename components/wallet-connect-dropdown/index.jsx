import {} from './wallet-connect.css'

import DropdownBody from './DropdownBody'
import DropdownFooter from './DropdownFooter'
import DropdownHeader from './DropdownHeader'
import PropTypes from 'prop-types'
import useWalletConnect from 'hooks/use-wallet-connect'
import useWalletController from 'hooks/useWalletController'

const WalletConnectDropdown = ({ closeFn, activeWalletAddress, allAddresses }) => {
  const { addConnection: connectMyAlgoFn } = useWalletController('MyAlgo')
  const { addConnection: connectAlgorandWalletFn } = useWalletController('AlgorandOfficial')
  const { onDisconnect: disconnectAlgorandWallet } = useWalletConnect()

  return (
    <div className="flex flex-col justify-between">
      <DropdownHeader closeFn={closeFn} />
      <DropdownBody
        connectMyAlgoWallet={() => connectMyAlgoFn()}
        connectAlgorandMobileWallet={() => connectAlgorandWalletFn()}
        closeFn={closeFn}
        activeWalletAddress={activeWalletAddress}
        allAddresses={allAddresses}
        disconnectAlgorandWallet={disconnectAlgorandWallet}
      />
      <DropdownFooter />
    </div>
  )
}

WalletConnectDropdown.propTypes = {
  closeFn: PropTypes.func,
  activeWalletAddress: PropTypes.string,
  allAddresses: PropTypes.array
}

export default WalletConnectDropdown
