import Image from 'next/image'
import PropTypes from 'prop-types'
import theme from 'theme'
import { useMyAlgoConnect } from '@/hooks/useMyAlgoConnect'
import { useWalletConnect } from '@/hooks/useWalletConnect'

const WalletsOptions = ({ isConnectingAddress, setIsConnectingAddress }) => {
  const connect = useMyAlgoConnect()
  const { connect: peraConnect } = useWalletConnect()
  // const peraWallet = useWalletConnect()

  const WALLETS_CONNECT_MAP = {
    'my-algo-wallet': connect,
    'pera-wallet': peraConnect
    // 'pera-wallet': () => console.log('Hello')
  }
  return (
    <>
      <div
        className="text-xs text-white rounded p-2"
        style={{
          backgroundColor: theme.colors.gray['500']
        }}
      >
        <div className="flex justify-between">
          <p className="font-semibold">CONNECT A WALLET</p>
          {isConnectingAddress && (
            <button
              className="cursor-pointer font-medium text-white"
              onClick={() => setIsConnectingAddress(!isConnectingAddress)}
            >
              Go back
            </button>
          )}
        </div>
        <div className="mt-4 ml-4">
          <div
            role="button"
            tabIndex="0"
            className="cursor-pointer flex items-center mb-2"
            onClick={() => WALLETS_CONNECT_MAP['pera-wallet']()}
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
            className="cursor-pointer flex items-center mb-2"
            role="button"
            tabIndex="0"
            onClick={() => WALLETS_CONNECT_MAP['my-algo-wallet']()}
            onKeyPress={() => console.log('key pressed')}
          >
            <Image src="/My-Algo-Wallet-icon.svg" alt="My Algo Wallet" width={25} height={25} />
            <p className="ml-2 font-medium underline">My Algo Wallet</p>
          </div>
        </div>
      </div>
    </>
  )
}

WalletsOptions.propTypes = {
  isConnectingAddress: PropTypes.bool,
  setIsConnectingAddress: PropTypes.func
}

WalletsOptions.defaultProps = {
  isConnectingAddress: false,
  setIsConnectingAddress: () => console.log('Hello here')
}

export default WalletsOptions
