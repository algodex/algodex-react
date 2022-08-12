import { Box, Stack, Typography } from '@mui/material'
import { useContext, useEffect, useMemo, useRef } from 'react'
import useWallets, { WalletsContext } from '@/hooks/useWallets'

import Button from '@mui/material/Button'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { difference } from 'lodash'
import theme from 'theme'

// import useMyAlgoConnect from '@/hooks/useMyAlgoConnect'
// import useWalletConnect from '@/hooks/useWalletConnect'

const WalletsOptions = ({
  isConnectingAddress,
  setIsConnectingAddress,
  myAlgoOnClick,
  peraConnectOnClick,
  isPeraConnected
}) => {
  // const { peraConnect, myAlgoConnect } = useWallets()
  // const [addresses, setAddresses] = useContext(WalletsContext)
  // const addressesRef = useRef(null)

  // const WALLETS_CONNECT_MAP = {
  //   'my-algo-wallet': myAlgoConnect,
  //   'pera-connect': peraConnect
  // }

  // const myAlgoOnClick = () => {
  //   WALLETS_CONNECT_MAP['my-algo-wallet']()
  // }

  // const peraConnectOnClick = () => {
  //   WALLETS_CONNECT_MAP['pera-connect']()
  // }
  // useEffect(() => {
  //   if (!addressesRef.current) {
  //     // Initialize the ref after first checking to see what is in localStorage
  //     const storedAddrs = JSON.parse(localStorage.getItem('addresses'))
  //     if (Array.isArray(storedAddrs) && storedAddrs.length > 0) {
  //       setAddresses(storedAddrs)
  //     }
  //     addressesRef.current = addresses
  //   }

  //   const localStorageExists =
  //     JSON.parse(localStorage.getItem('addresses')) !== null &&
  //     JSON.parse(localStorage.getItem('addresses')).length > 0

  //   const addressesExist = typeof addresses !== 'undefined' && addresses.length > 0

  //   if (localStorageExists && addressesExist) {
  //     localStorage.setItem('addresses', JSON.stringify(addresses))
  //   }
  //   const walletDifference = difference(
  //     addresses.map((addr) => addr.address),
  //     addressesRef.current.map((addr) => addr.address)
  //   )
  //   if (walletDifference.length > 0) {
  //     localStorage.setItem('addresses', JSON.stringify(addresses))
  //     addressesRef.current = addresses
  //     closeFn()
  //   }
  //   // **Note** Can't put closeFn() in the onClicks because it will closeOut
  //   // modal before wallet-connect finishes connecting leading to stale state.
  //   // Creating a ref that persists between renders gives us a way to automatically close out
  //   // modals only when a new address is added to the addresses array.
  // }, [addresses])

  // const isPeraConnected = useMemo(() => {
  //   const peraAddr = addresses.filter((addr) => addr.type === 'wallet-connect')
  //   return peraAddr.length > 0
  // }, [addresses])

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
          {isConnectingAddress && (
            <Button
              className="cursor-pointer text-white"
              variant="text"
              size="small"
              onClick={() => setIsConnectingAddress(!isConnectingAddress)}
            >
              Go back
            </Button>
          )}
        </Box>
        <Box className="mt-4 ml-4">
          <Stack
            direction="row"
            alignItems={`${isPeraConnected ? 'flex-start' : 'center'}`}
            role="button"
            tabIndex="0"
            className="cursor-pointer mb-2"
            onClick={peraConnectOnClick}
            onKeyPress={() => console.log('key pressed')}
          >
            {isPeraConnected ? (
              <Box width={50} height={50}>
                <Image
                  src="/Wallet-Connect-icon.svg"
                  alt="Algorand Mobile Wallet"
                  width="100%"
                  height="100%"
                />
              </Box>
            ) : (
              <Image
                src="/Wallet-Connect-icon.svg"
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
                Wallet Connect (Pera or Defly)
              </Typography>
              {isPeraConnected && (
                <Typography className="italic color-white ml-2 mt-2" variant="body_tiny">
                  There is a wallet currently connected with Wallet Connect. You must disonnect this
                  wallet to connect another.
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
  closeFn: PropTypes.func,
  myAlgoOnClick: PropTypes.func,
  peraConnectOnClick: PropTypes.func,
  isPeraConnected: PropTypes.func
}

WalletsOptions.defaultProps = {
  isConnectingAddress: false,
  setIsConnectingAddress: () => console.log('Hello here')
}

export default WalletsOptions
