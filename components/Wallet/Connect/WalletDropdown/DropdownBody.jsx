import { copyAddress, setExplorerLink, truncatedWalletAddress } from './helper'
import { mdiContentCopy, mdiOpenInNew } from '@mdi/js'

import Button from '@mui/material/Button'
import Icon from '@mdi/react'
import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'
import WalletOptionsList from './WalletOptionsList'
import WalletsList from './WalletsList'
import { find } from 'lodash'
import theme from 'theme'
import toast from 'react-hot-toast'
import { useState } from 'react'

const DropdownBody = ({
  // closeFn,
  connectMyAlgoWallet,
  activeWalletAddress,
  connectAlgorandMobileWallet,
  allAddresses,
  setActiveWalletAddress,
  activeNetwork,
  handleDisconnectFn
}) => {
  const [isConnectingAddress, setIsConnectingAddress] = useState(false)

  const handleWalletConnect = async (type) => {
    type === 'algomobilewallet' && (await connectAlgorandMobileWallet())
    type === 'myalgowallet' && (await connectMyAlgoWallet())
    // closeFn()
  }

  const isWalletActive = (addr) => {
    return activeWalletAddress === addr
  }

  const handleWalletClick = (addr) => {
    !isWalletActive(addr) && setActiveWalletAddress(addr)
  }

  return (
    <div
      className="p-2"
      style={{
        backgroundColor: theme.colors.gray['600']
      }}
    >
      {(!activeWalletAddress || isConnectingAddress) && <WalletOptionsList isRenderingList={!activeWalletAddress}/>}
      {activeWalletAddress && !isConnectingAddress && (
        <>
          {/* {renderActiveWalletList()}
          {renderSwitchWalletAddress()} */}
          <WalletsList />
          <WalletOptionsList isRenderingList={!activeWalletAddress}/>
        </>
      )}
    </div>
  )
}

DropdownBody.propTypes = {
  connectMyAlgoWallet: PropTypes.func,
  connectAlgorandMobileWallet: PropTypes.func,
  closeFn: PropTypes.func,
  activeWalletAddress: PropTypes.string,
  allAddresses: PropTypes.any,
  disconnectAlgorandWallet: PropTypes.func,
  setActiveWalletAddress: PropTypes.func,
  activeNetwork: PropTypes.string,
  handleDisconnectFn: PropTypes.func
}

DropdownBody.defaultProps = {
  connectMyAlgoWallet: () => console.log('Hello Connect'),
  connectAlgorandMobileWallet: () => console.log('Hello Connect'),
  closeFn: () => console.log('Hello Connect'),
  activeWalletAddress: null,
  allAddresses: [],
  disconnectAlgorandWallet: () => console.log('Hello Connect'),
  setActiveWalletAddress: () => console.log('Hello Connect'),
  activeNetwork: 'testnet',
  handleDisconnectFn: () => console.log('Hello Connect')
}

export default DropdownBody
