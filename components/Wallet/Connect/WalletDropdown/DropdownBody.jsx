import { copyAddress, setExplorerLink, truncatedWalletAddress } from './helper'
import { mdiContentCopy, mdiOpenInNew } from '@mdi/js'

import ActiveWalletList from './ActiveWalletList'
import Button from '@mui/material/Button'
import Icon from '@mdi/react'
import Image from 'next/image'
import InactiveWalletsList from './InactiveWalletsList'
import Link from 'next/link'
import PropTypes from 'prop-types'
import WalletOptionsList from './WalletOptionsList'
import { find } from 'lodash'
import theme from 'theme'
import toast from 'react-hot-toast'
import { useState } from 'react'

const DropdownBody = ({
  connectWallet,
  disconnectWalletFn,
  activeWalletAddress
}) => {
  const [isConnectingAddress, setIsConnectingAddress] = useState(false)

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
      {(!activeWalletAddress || isConnectingAddress) && (
        <WalletOptionsList isRenderingList={!activeWalletAddress} handleWalletConnect={handleWalletConnect} />
      )}
      {activeWalletAddress && !isConnectingAddress && (
        <>
          <ActiveWalletList  disconnectWalletFn={disconnectWalletFn} />
          <InactiveWalletsList disconnectWalletFn={disconnectWalletFn} />
          <WalletOptionsList isRenderingList={!activeWalletAddress} handleWalletConnect={handleWalletConnect}/>
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
  activeWalletAddress: PropTypes.func
}

DropdownBody.defaultProps = {
  connectWallet: () => console.log('Hello Connect'),
  disconnectWalletFn: () => console.log('Hello Connect'),
  activeWalletAddress: null
}

export default DropdownBody
