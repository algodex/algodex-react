// import ActiveWalletList from './ActiveWalletList'
// import Button from '@mui/material/Button'
// import InactiveWalletsList from './InactiveWalletsList'
import PropTypes from 'prop-types'
import WalletOptionsList from './WalletOptionsList'
import { WalletReducerContext } from '../../../../hooks/WalletsReducerProvider'
import theme from 'theme'
import { useState, useContext } from 'react'
// import { WalletContext } from '../../WalletContext'

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
