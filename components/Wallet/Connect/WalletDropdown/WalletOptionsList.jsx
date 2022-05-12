import Image from 'next/image'
import PropTypes from 'prop-types'
import theme from 'theme'
import useMyAlgoConnect from '@/hooks/useMyAlgoConnect'
import useWalletConnect from '@/hooks/useWalletConnect'
import { Typography, Box } from '@mui/material'
import Button from '@mui/material/Button'

const WalletsOptions = ({ isConnectingAddress, setIsConnectingAddress }) => {
  const { connect } = useMyAlgoConnect()
  const { connect: peraConnect } = useWalletConnect()
  // const peraWallet = useWalletConnect()

  const WALLETS_CONNECT_MAP = {
    'my-algo-wallet': connect,
    'wallet-connect': peraConnect
  }
  return (
    <>
      <Box
        className="text-xs text-white rounded p-2"
        style={{
          backgroundColor: theme.colors.gray['500']
        }}
      >
        <Box className="flex justify-between">
          <Typography variant="body_small_cap_bold">CONNECT A WALLET</Typography>
          {isConnectingAddress && (
            <Button
              className="cursor-pointer font-medium text-white"
              onClick={() => setIsConnectingAddress(!isConnectingAddress)}
            >
              Go back
            </Button>
          )}
        </Box>
        <Box className="mt-4 ml-4">
          <Box
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
          </Box>
          <Box
            className="cursor-pointer flex items-center mb-2"
            role="button"
            tabIndex="0"
            onClick={() => WALLETS_CONNECT_MAP['my-algo-wallet']()}
            onKeyPress={() => console.log('key pressed')}
          >
            <Image src="/My-Algo-Wallet-icon.svg" alt="My Algo Wallet" width={25} height={25} />
            <Typography className="underline ml-2" variant="body_small_bold">
              My Algo Wallet
            </Typography>
          </Box>
        </Box>
      </Box>
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
