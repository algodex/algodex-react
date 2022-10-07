// import ActiveWalletList from './ActiveWalletList'
// import Button from '@mui/material/Button'
// import InactiveWalletsList from './InactiveWalletsList'
import PropTypes from 'prop-types'
import WalletOptionsList from './WalletOptionsList'
import theme from 'theme'
// import { WalletContext } from '../../WalletContext'
import { useState } from 'react'

// const DropdownBody = ({ activeWalletAddress, sortedWalletsList, closeFn }) => {
const DropdownBody = ({ addresses, myAlgoOnClick, peraConnectOnClick, isPeraConnected }) => {
  const [isConnectingAddress, setIsConnectingAddress] = useState(false)

  return (
    <div
      className="p-2"
      style={{
        backgroundColor: theme.colors.gray['600']
      }}
    >
      <WalletOptionsList
        isConnectingAddress={isConnectingAddress}
        setIsConnectingAddress={setIsConnectingAddress}
        addresses={addresses}
        myAlgoOnClick={myAlgoOnClick}
        peraConnectOnClick={peraConnectOnClick}
        isPeraConnected={isPeraConnected}
      />
      {/* {(!activeWalletAddress || isConnectingAddress) && (
        <WalletOptionsList
          isConnectingAddress={isConnectingAddress}
          setIsConnectingAddress={setIsConnectingAddress}
          closeFn={closeFn}
        />
      )} */}
      {/* {activeWalletAddress && !isConnectingAddress && (
        <>
          <ActiveWalletList wallet={sortedWalletsList?.activeWallet} />
          <InactiveWalletsList walletsList={sortedWalletsList?.inactiveWallet} />
          <Button
            className="w-full flex text-xs font-bold justify-center items-center h-8 mt-2 text-white rounded"
            variant="contained"
            style={{
              backgroundColor: theme.colors.gray['700']
            }}
            onClick={() => setIsConnectingAddress(!isConnectingAddress)}
          >
            CONNECT ANOTHER WALLET
          </Button>
        </>
      )} */}
    </div>
  )
}

DropdownBody.propTypes = {
  activeWalletAddress: PropTypes.string,
  sortedWalletsList: PropTypes.object,
  // closeFn: PropTypes.func,
  addresses: PropTypes.array,
  myAlgoOnClick: PropTypes.func,
  peraConnectOnClick: PropTypes.func,
  isPeraConnected: PropTypes.book
}

DropdownBody.defaultProps = {
  activeWalletAddress: ''
}

export default DropdownBody
