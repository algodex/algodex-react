import ActiveWalletList from './ActiveWalletList'
import InactiveWalletsList from './InactiveWalletsList'
import PropTypes from 'prop-types'
import WalletOptionsList from './WalletOptionsList'
import theme from 'theme'

const DropdownBody = ({ connectWallet, disconnectWalletFn, activeWalletAddress }) => {
  const handleWalletConnect = async (type) => {
    type === 'algomobilewallet' && (await connectWallet('algomobilewallet'))
    type === 'myalgowallet' && (await connectWallet('myalgowallet'))
  }

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
          handleWalletConnect={handleWalletConnect}
        />
      )}
      {activeWalletAddress && (
        <>
          <ActiveWalletList disconnectWalletFn={disconnectWalletFn} />
          <InactiveWalletsList disconnectWalletFn={disconnectWalletFn} />
          <WalletOptionsList
            isRenderingList={!activeWalletAddress}
            handleWalletConnect={handleWalletConnect}
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
  activeWalletAddress: PropTypes.string
}

DropdownBody.defaultProps = {
  connectWallet: () => console.log('Hello Connect'),
  disconnectWalletFn: () => console.log('Hello Connect'),
  activeWalletAddress: ''
}

export default DropdownBody
