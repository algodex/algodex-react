import { mdiContentCopy, mdiOpenInNew } from '@mdi/js'
import { setExplorerLink, truncatedWalletAddress } from './helper'

import Button from '@mui/material/Button'
import Icon from '@mdi/react'
import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'
import WalletOptionsList from './WalletOptionsList'
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

  const copyAddress = (address) => {
    navigator.clipboard.writeText(address).then(
      () => {
        toast.success('Copied wallet address to clipboard!')
      },
      () => {
        toast.error('Failed to copy wallet address to clipboard')
      }
    )
  }

  const isWalletActive = (addr) => {
    return activeWalletAddress === addr
  }

  const handleWalletClick = (addr) => {
    !isWalletActive(addr) && setActiveWalletAddress(addr)
  }

  const renderActiveWalletList = () => {
    const walletExample = {
      address: '5Keh5B8UVJjHW5aZcUi6DEsrk1LCBPc8C9MH8EJrZ7RPLpimsPk',
      type: 'algomobilewallet'
    }
    const wallet = find(allAddresses, ({ address }) => address === activeWalletAddress)
    // if (wallet) {
    if (walletExample) {
      const { address, type } = walletExample
      return (
        <div>
          <p className="text-white font-medium mb-2 text-xs">ACTIVE WALLET</p>
          <div className="text-white">
            <div
              className="p-2 text-xs rounded shadow"
              style={{
                backgroundColor: 'rgba(113, 128, 150, 0.1)'
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex item-center border-solid border rounded justify-between w-4/5 p-1.5">
                  <p>{truncatedWalletAddress(address, 11)}</p>
                  <Icon
                    onClick={() => copyAddress(address)}
                    path={mdiContentCopy}
                    title="Copy Address"
                    size={0.8}
                    className="cursor-pointer"
                    color="#FFFFFF"
                  />
                </div>
                {/* <div
                  role="button"
                  tabIndex="0"
                  onKeyDown={(e) => console.log(e)}
                  onClick={() => handleDisconnectFn(address, type)}
                  className="rounded ml-2 p-2 font-semibold cursor-pointer"
                  style={{
                    background: theme.colors.gray['700']
                  }}
                >
                  DISCONNECT
                </div> */}
                <Button
                  className="rounded ml-2 text-xs font-semibold"
                  variant="contained"
                  style={{
                    backgroundColor: theme.colors.gray['700']
                  }}
                  onClick={() => handleDisconnectFn(address, type)}
                >
                  DISCONNECT
                </Button>
              </div>
              <div>
                <Link href={setExplorerLink(address, activeNetwork)}>
                  <a className="flex justify-end items-center text-white mr-10 mt-3 font-medium">
                    <p>View on AlgoExplorer</p>
                    <Icon
                      path={mdiOpenInNew}
                      title="Algo explorer link"
                      size={0.8}
                      className="cursor-pointer"
                      color="#FFFFFF"
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  const renderAddressesList = () => {
    const walletExample = [
      // {
      //   address: '5Keh5B8UVJjHW5aZcUi6DEsrk1LCBPc8C9MH8EJrZ7RPLpimsPk',
      //   type: 'algomobilewallet'
      // },
      {
        address: '9Welv5B8UVJjHW5aZcUi6DEsrk1LCBPc8C9MH8EJrZ7RPMqocRZ',
        type: 'algomobilewallet'
      }
    ]
    // return allAddresses.map(({ address, type }, idx) => {
    return walletExample.map(({ address, type }, idx) => {
      return (
        <div className="mt-4" key={idx}>
          <div className="flex justify-between items-center">
            <div
              role="button"
              tabIndex="0"
              onKeyDown={(e) => console.log(e)}
              onClick={() => handleWalletClick(address)}
              className="flex justify-between border-solid border rounded items-center p-1.5 w-4/5"
            >
              <p>{truncatedWalletAddress(address, 11)}</p>
              <Icon
                onClick={() => copyAddress(address)}
                path={mdiContentCopy}
                title="Copy Address"
                size={0.8}
                className="cursor-pointer"
                color="#FFFFFF"
              />
            </div>
            {/* <div
              role="button"
              tabIndex="0"
              onKeyDown={(e) => console.log(e)}
              onClick={() => handleDisconnectFn(address, type)}
              className="rounded ml-2 p-2 font-bold cursor-pointer"
              style={{
                background: theme.colors.gray['800']
              }}
            >
              DISCONNECT
            </div> */}
            <Button
              className="rounded ml-2 text-xs font-semibold"
              variant="contained"
              style={{
                backgroundColor: theme.colors.gray['800']
              }}
              onClick={() => handleDisconnectFn(address, type)}
            >
              DISCONNECT
            </Button>
          </div>
          <div>
            <Link href={setExplorerLink(address, activeNetwork)}>
              <a
                target="_blank"
                className="flex justify-end items-center text-white mr-10 mt-3 font-medium"
              >
                <p>View on AlgoExplorer</p>
                <Icon
                  path={mdiOpenInNew}
                  title="Algo explorer link"
                  size={0.8}
                  className="cursor-pointer"
                  color="#FFFFFF"
                />
              </a>
            </Link>
          </div>
        </div>
      )
    })
  }

  const renderSwitchWalletAddress = () => {
    return (
      <div
        className="mt-2 p-2 text-xs rounded text-white"
        style={{
          backgroundColor: theme.colors.gray['700']
        }}
      >
        <div>
          <p className="font-bold text-xs mb-1.5">SWITCH WALLETS</p>
          <p>Click on address to switch active wallets</p>
        </div>
        <div>{renderAddressesList()}</div>
      </div>
    )
  }

  return (
    <div
      className="p-2"
      style={{
        backgroundColor: theme.colors.gray['600']
      }}
    >
      {/* <>
        {renderActiveWalletList()}
        {renderSwitchWalletAddress()}
      </>
      <Button
        className="w-full flex text-xs font-bold justify-center items-center h-8 mt-2 text-white rounded"
        variant="contained"
        style={{
          backgroundColor: theme.colors.gray['700']
        }}
        onClick={() => setIsConnectingAddress(!isConnectingAddress)}
      >
        CONNECT ANOTHER WALLET
      </Button> */}
      {(!activeWalletAddress || isConnectingAddress) && <WalletOptionsList isRenderingList={!activeWalletAddress}/>}
      {activeWalletAddress && !isConnectingAddress && (
        <>
          {renderActiveWalletList()}
          {renderSwitchWalletAddress()}
          {/* <div
            role="button"
            tabIndex="0"
            onKeyDown={(e) => console.log(e)}
            className="cursor-pointer flex text-xs font-bold justify-center items-center h-8 mt-2 text-white rounded"
            style={{
              backgroundColor: theme.colors.gray['700']
            }}
            onClick={() => setIsConnectingAddress(!isConnectingAddress)}
          >
            CONNECT ANOTHER WALLET
          </div> */}
          {/* <Button
            className="w-full flex text-xs font-bold justify-center items-center h-8 mt-2 text-white rounded"
            variant="contained"
            style={{
              backgroundColor: theme.colors.gray['700']
            }}
            onClick={() => setIsConnectingAddress(!isConnectingAddress)}
          >
            CONNECT ANOTHER WALLET
          </Button> */}
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
