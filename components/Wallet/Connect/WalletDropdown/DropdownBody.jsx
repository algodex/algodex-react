import ActiveWalletList from './ActiveWalletList'
import InactiveWalletsList from './InactiveWalletsList'
import PropTypes from 'prop-types'
import WalletOptionsList from './WalletOptionsList'
import theme from 'theme'

const DropdownBody = ({
  connectWallet,
  disconnectWalletFn,
  activeWalletAddress,
  sortedWalletsList
}) => {
  return (
    <div
      className="p-2"
      style={{
        backgroundColor: theme.colors.gray['600']
      }}
    >
      {!activeWalletAddress && (
        <WalletOptionsList
          isRenderingList={!activeWalletAddress}
          handleWalletConnect={connectWallet}
        />
      )}
      {activeWalletAddress && (
        <>
          <ActiveWalletList
            wallet={sortedWalletsList?.activeWallet}
            disconnectWalletFn={disconnectWalletFn}
          />
          <InactiveWalletsList
            walletsList={sortedWalletsList?.inactiveWallet}
            disconnectWalletFn={disconnectWalletFn}
          />
          <WalletOptionsList
            isRenderingList={!activeWalletAddress}
            handleWalletConnect={connectWallet}
          />
        </>
      )}
    </div>
  )
}

DropdownBody.propTypes = {
  // connectMyAlgoWallet: PropTypes.func,
  // connectAlgorandMobileWallet: PropTypes.func,
  // closeFn: PropTypes.func,
  // activeWalletAddress: PropTypes.string,
  // allAddresses: PropTypes.any,
  // disconnectAlgorandWallet: PropTypes.func,
  // setActiveWalletAddress: PropTypes.func,
  // activeNetwork: PropTypes.string,
  // handleDisconnectFn: PropTypes.func

  connectWallet: PropTypes.func,
  disconnectWalletFn: PropTypes.func,
  activeWalletAddress: PropTypes.string,
  sortedWalletsList: PropTypes.object
}

DropdownBody.defaultProps = {
  connectWallet: () => console.log('Hello Connect'),
  disconnectWalletFn: () => console.log('Hello Connect'),
  activeWalletAddress: ''
}

export default DropdownBody
