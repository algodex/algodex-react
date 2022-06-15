import Image from 'next/image'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import theme from 'theme'
import { useWallets } from '@algodex/algodex-hooks'
import { useEventDispatch } from '@/hooks/useEvents'


const WalletsOptions = ({ isConnectingAddress, setIsConnectingAddress, walletOptions }) => {
  const { peraConnect, myAlgoConnect, addresses } = walletOptions

  const WALLETS_CONNECT_MAP = {
    'my-algo-wallet': myAlgoConnect,
    'wallet-connect': peraConnect
  }
  const dispatcher = useEventDispatch()

  const myAlgoOnClick = async () => {
    await WALLETS_CONNECT_MAP['my-algo-wallet']();
    dispatcher('wallet', {type: 'my-algo-wallet', wallet: addresses[0] })
    debugger;
    console.log(`This onClick calls the myAlgoConnect export of useWallets() hook. 
    It is hitting the callback in useWallets() which triggers setAddresses, yet addresses
    is still undefined as you can see here. This console.log() runs before 
     : ${addresses[0]}`)
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
          <Typography variant="body_small_cap_bold">CONNECT A WALLET</Typography>
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
            onClick={() => WALLETS_CONNECT_MAP['wallet-connect']()}
            onKeyPress={() => console.log('key pressed')}
          >
            <Image
              src="/Official-Algo-Wallet-icon.svg"
              alt="Algorand Mobile Wallet"
              width={25}
              height={25}
            />
            <Typography className="underline ml-2" variant="body_small_bold">
              Algorand Mobile Wallet
            </Typography>
          </div>
          <div
            className="cursor-pointer flex items-center mb-2"
            role="button"
            tabIndex="0"
            onClick={myAlgoOnClick}
            onKeyPress={() => console.log('key pressed')}
          >
            <Image src="/My-Algo-Wallet-icon.svg" alt="My Algo Wallet" width={25} height={25} />
            <Typography className="underline ml-2" variant="body_small_bold">
              My Algo Wallet
            </Typography>
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
