import ActiveWalletList from './ActiveWalletList'
import Button from '@mui/material/Button'
import InactiveWalletsList from './InactiveWalletsList'
import PropTypes from 'prop-types'
import WalletOptionsList from './WalletOptionsList'
import theme from 'theme'
import { useState } from 'react'
import { WalletContext } from '../../WalletContext'

const DropdownBody = ({ activeWalletAddress, sortedWalletsList }) => {
  const [isConnectingAddress, setIsConnectingAddress] = useState(false)
  return (
    <div
      className="p-2"
      style={{
        backgroundColor: theme.colors.gray['600']
      }}
    >
      {(!activeWalletAddress || isConnectingAddress) && (

        <WalletContext.Consumer>
            {walletOptions => (
                       <WalletOptionsList
                       isConnectingAddress={isConnectingAddress}
                       setIsConnectingAddress={setIsConnectingAddress}
                       walletOptions={{
                         peraConnect: walletOptions.peraConnect,
                         myAlgoConnect: walletOptions.myAlgoConnect,
                         addresses: walletOptions.addresses
                     }}
                     />
            )

            }

 
        </WalletContext.Consumer>
      )}
      {activeWalletAddress && !isConnectingAddress && (
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
      )}
    </div>
  )
}

DropdownBody.propTypes = {
  activeWalletAddress: PropTypes.string,
  sortedWalletsList: PropTypes.object
}

DropdownBody.defaultProps = {
  activeWalletAddress: ''
}

export default DropdownBody
