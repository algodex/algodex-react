import { Box, Stack, Typography } from '@mui/material'

import Image from 'next/image'
import PropTypes from 'prop-types'
import theme from 'theme'

const WalletsOptions = ({ myAlgoOnClick, peraConnectOnClick, isPeraConnected }) => {
  return (
    <>
      <Box
        className="text-xs text-white rounded p-2"
        style={{
          backgroundColor: theme.colors.gray['500']
        }}
      >
        <Box className="flex justify-between items-center">
          <Typography variant="body_small_cap_bold">CONNECT A WALLET</Typography>
          {/* {isConnectingAddress && (
            <Button
              className="cursor-pointer text-white"
              variant="text"
              size="small"
              onClick={() => setIsConnectingAddress(!isConnectingAddress)}
            >
              Go back
            </Button>
          )} */}
        </Box>
        <Box className="mt-4 ml-4">
          <Stack
            direction="row"
            alignItems={`${isPeraConnected ? 'flex-start' : 'center'}`}
            role="button"
            tabIndex="0"
            className="cursor-pointer mb-2"
            onClick={!isPeraConnected && peraConnectOnClick}
            onKeyPress={() => console.log('key pressed')}
          >
            {isPeraConnected ? (
              <Box width={50} height={50}>
                {/* <Image
                  src="/Wallet-Connect-icon.svg"
                  alt="Algorand Mobile Wallet"
                  width="100%"
                  height="100%"
                /> */}
                <Image
                  style={{ borderRadius: '50%' }}
                  src="/Pera-logo.png"
                  alt="Algorand Mobile Wallet"
                  width={25}
                  height={25}
                />
              </Box>
            ) : (
              // <></>
              <Image
                style={{ borderRadius: '50%' }}
                src="/Pera-logo.png"
                alt="Algorand Mobile Wallet"
                width={25}
                height={25}
              />
            )}

            <Stack>
              <Typography
                sx={{
                  color: isPeraConnected ? '#BABABA' : '#FFF'
                }}
                className="underline ml-2"
                variant="body_small_bold"
              >
                Pera Wallet
              </Typography>
              {isPeraConnected && (
                <Typography className="italic color-white ml-2 mt-2" variant="body_tiny">
                  There is a wallet currently connected with Wallet Connect. You must disconnect
                  this wallet to connect another.
                </Typography>
              )}
            </Stack>
          </Stack>
          <Box
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
          </Box>
        </Box>
      </Box>
    </>
  )
}

WalletsOptions.propTypes = {
  isConnectingAddress: PropTypes.bool,
  setIsConnectingAddress: PropTypes.func,
  myAlgoOnClick: PropTypes.func,
  peraConnectOnClick: PropTypes.func,
  isPeraConnected: PropTypes.bool
}

WalletsOptions.defaultProps = {
  isConnectingAddress: false,
  setIsConnectingAddress: () => console.log('Hello here')
}

export default WalletsOptions
