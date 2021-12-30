import { mdiContentCopy, mdiOpenInNew } from '@mdi/js'
import Image from 'next/image'
import Icon from '@mdi/react'
import PropTypes from 'prop-types'
import theme from '../../theme'

const DropdownBody = ({ closeFn, connectMyAlgoWallet, connectAlgorandMobileWallet }) => {
  const handleWalletConnect = (type) => {
    closeFn()
    type === 'algomobilewallet' && connectAlgorandMobileWallet()
    type === 'myalgowallet' && connectMyAlgoWallet()
  }
  const renderWalletOptionList = () => {
    return (
      <div
        className="text-xs text-white rounded p-2"
        style={{
          backgroundColor: theme.colors.gray['500']
        }}
      >
        <p className="font-semibold mb-2">CONNECT A WALLET</p>
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
                <p>AH8TJX78TG2P....Q235FRTK90LP</p>
                <Icon
                  path={mdiContentCopy}
                  title="Copy Address"
                  size={0.8}
                  className="cursor-pointer"
                  color="#FFFFFF"
                />
              </div>
              <div
                className="rounded ml-2 p-2 font-semibold"
                style={{
                  background: theme.colors.gray['700']
                }}
              >
                DISCONNECT
              </div>
            </div>
            <div className="flex justify-end items-center text-white mr-10 mt-3 font-medium">
              <p>View on AlgoExplorer</p>
              <Icon
                path={mdiOpenInNew}
                title="Algo explorer link"
                size={0.8}
                className="cursor-pointer"
                color="#FFFFFF"
              />
            </div>
          </div>
        </div>
      </div>
    )
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
        <div>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <div className="flex justify-between border-solid border rounded items-center p-1.5 w-4/5">
                <p>BH6Y7U89JO52....C6U9AA171T92</p>
                <Icon
                  path={mdiContentCopy}
                  title="Copy Address"
                  size={0.8}
                  className="cursor-pointer"
                  color="#FFFFFF"
                />
              </div>
              <div
                className="rounded ml-2 p-2 font-bold"
                style={{
                  background: theme.colors.gray['800']
                }}
              >
                DISCONNECT
              </div>
            </div>
            <div className="flex justify-end items-center text-white mr-10 mt-3 font-medium">
              <p>View on AlgoExplorer</p>
              <Icon
                path={mdiOpenInNew}
                title="Algo explorer link"
                size={0.8}
                className="cursor-pointer"
                color="#FFFFFF"
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <div className="flex justify-between border-solid border rounded items-center p-1.5 w-4/5">
                <p>CH9PL5RRJO7K....V2R87J12W3T1</p>
                <Icon
                  path={mdiContentCopy}
                  title="Copy Address"
                  size={0.8}
                  className="cursor-pointer"
                  color="#FFFFFF"
                />
              </div>
              <div
                className="rounded ml-2 p-2 font-bold"
                style={{
                  background: theme.colors.gray['800']
                }}
              >
                DISCONNECT
              </div>
            </div>
            <div className="flex justify-end items-center text-white mr-10 mt-3 font-medium">
              <p>View on AlgoExplorer</p>
              <Icon
                path={mdiOpenInNew}
                title="Algo explorer link"
                size={0.8}
                className="cursor-pointer"
                color="#FFFFFF"
              />
            </div>
          </div>
        </div>
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
      {true && renderWalletOptionList()}
      {false && renderActiveWalletList()}
      {false && renderSwitchWalletAddress()}
      {true && (
        <div
          className="flex text-xs font-bold justify-center items-center h-8 mt-2 text-white rounded"
          style={{
            backgroundColor: theme.colors.gray['700']
          }}
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
  closeFn: PropTypes.func
}

export default DropdownBody
