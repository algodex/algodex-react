import {} from './wallet-connect.css'

import DropdownBody from './DropdownBody'
import DropdownFooter from './DropdownFooter'
import DropdownHeader from './DropdownHeader'
import PropTypes from 'prop-types'
import useWalletConnect from 'hooks/use-wallet-connect'
import useWalletController from 'hooks/useWalletController'

const WalletConnectDropdown = ({
  closeFn,
  activeWalletAddress,
  allAddresses,
  setActiveWalletAddress,
  activeNetwork
}) => {
  const { addConnection, handleDisconnectFn } = useWalletController()
  const { onDisconnect: disconnectAlgorandWallet } = useWalletConnect()

  return (
    <div className="flex flex-col justify-between">
      <DropdownHeader closeFn={closeFn} />
      <DropdownBody
        connectMyAlgoWallet={() => addConnection('MyAlgo')}
        connectAlgorandMobileWallet={() => addConnection('AlgorandOfficial')}
        disconnectAlgorandWallet={disconnectAlgorandWallet}
        closeFn={closeFn}
        activeWalletAddress={activeWalletAddress}
        allAddresses={allAddresses}
        setActiveWalletAddress={setActiveWalletAddress}
        activeNetwork={activeNetwork}
        handleDisconnectFn={handleDisconnectFn}
      />
      <DropdownFooter />
    </div>
  )
}

WalletConnectDropdown.propTypes = {
  closeFn: PropTypes.func,
  activeWalletAddress: PropTypes.string,
  allAddresses: PropTypes.array,
  setActiveWalletAddress: PropTypes.func,
  activeNetwork: PropTypes.string
}

export default WalletConnectDropdown
