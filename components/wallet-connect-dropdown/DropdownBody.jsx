import { mdiContentCopy, mdiOpenInNew } from '@mdi/js'

import Icon from '@mdi/react'
import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { find } from 'lodash'
import { subStringFn, setExplorerLink } from './helper'
import theme from '../../theme'
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

  

  const renderWalletOptionList = () => {
    return (
      <div
        className="text-xs text-white rounded p-2"
        style={{
          backgroundColor: theme.colors.gray['500']
        }}
      >
        <div className="flex justify-between">
          <p className="font-semibold mb-2">CONNECT A WALLET</p>
          {isConnectingAddress && (
            <button onClick={() => setIsConnectingAddress(!isConnectingAddress)}>Go back</button>
          )}
        </div>
        <div className="mt-4 ml-4">
          <div
            role="button"
            tabIndex="0"
            className="flex items-center mb-2"
            onClick={() => handleWalletConnect('algomobilewallet')}
            onKeyPress={() => console.log('key pressed')}
          >
            <Image
              src="/Official-Algo-Wallet-icon.svg"
              alt="Algorand Mobile Wallet"
              width={25}
              height={25}
            />
            <p className="ml-2 font-medium underline">Algorand Mobile Wallet</p>
          </div>
          <div
            className="flex items-center mb-2"
            role="button"
            tabIndex="0"
            onClick={() => handleWalletConnect('myalgowallet')}
            onKeyPress={() => console.log('key pressed')}
          >
            <Image src="/My-Algo-Wallet-icon.svg" alt="My Algo Wallet" width={25} height={25} />
            <p className="ml-2 font-medium underline">My Algo Wallet</p>
          </div>
        </div>
      </div>
    )
  }

  const renderActiveWalletList = () => {
    const wallet = find(allAddresses, ({ address }) => address === activeWalletAddress)
    if (wallet) {
      const { address, type } = wallet
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
                  <p>
                    {`${subStringFn(0, 11, address)}....${subStringFn(
                      address.length - 11,
                      address.length,
                      address
                    )}`}
                  </p>
                  <Icon
                    onClick={() => copyAddress(address)}
                    path={mdiContentCopy}
                    title="Copy Address"
                    size={0.8}
                    className="cursor-pointer"
                    color="#FFFFFF"
                  />
                </div>
                <div
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
                </div>
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
    return allAddresses.map(({ address, type }, idx) => {
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
              <p>
                {`${subStringFn(0, 11, address)}....${subStringFn(
                  address.length - 11,
                  address.length,
                  address
                )}`}
              </p>
              <Icon
                onClick={() => copyAddress(address)}
                path={mdiContentCopy}
                title="Copy Address"
                size={0.8}
                className="cursor-pointer"
                color="#FFFFFF"
              />
            </div>
            <div
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
            </div>
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
      {(!activeWalletAddress || isConnectingAddress) && renderWalletOptionList()}
      {(activeWalletAddress && !isConnectingAddress) && renderActiveWalletList()}
      {(activeWalletAddress && !isConnectingAddress) && renderSwitchWalletAddress()}
      {(activeWalletAddress && !isConnectingAddress) && (
        <div
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
        </div>
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

export default DropdownBody
