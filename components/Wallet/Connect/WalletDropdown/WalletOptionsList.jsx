import Image from 'next/image'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import theme from 'theme'
import { useEffect, useRef, useContext } from 'react'
import _ from 'lodash'
import useWallets, { WalletsContext } from '@/hooks/useWallets'

const WalletsOptions = ({ isConnectingAddress, setIsConnectingAddress, closeFn }) => {
  const { peraConnect, myAlgoConnect } = useWallets()
  const [addresses, setAddresses] = useContext(WalletsContext)

  const addressesRef = useRef(null)

  const WALLETS_CONNECT_MAP = {
    'my-algo-wallet': myAlgoConnect,
    'pera-connect': peraConnect
  }

  const myAlgoOnClick = () => {
    WALLETS_CONNECT_MAP['my-algo-wallet']()
  }

  const peraConnectOnClick = () => {
    WALLETS_CONNECT_MAP['pera-connect']()
  }
  useEffect(() => {
    if (!addressesRef.current) {
      // Initialize the ref after first checking to see what is in localStorage
      const storedAddrs = JSON.parse(localStorage.getItem('addresses'))
      if (Array.isArray(storedAddrs)) {
        setAddresses(storedAddrs)
      }
      addressesRef.current = addresses
    }

    const walletDifference = _.difference(
      addresses.map((addr) => addr.address),
      addressesRef.current.map((addr) => addr.address)
    )
    if (walletDifference.length > 0) {
      localStorage.setItem('addresses', JSON.stringify(addresses))
      addressesRef.current = addresses
      closeFn()
    }
    // **Note** Can't put closeFn() in the onClicks because it will closeOut
    // modal before wallet-connect finishes connecting leading to stale state.
    // Creating a ref that persists between renders gives us a way to automatically close out
    // modals only when a new address is added to the addresses array.
  }, [addresses])
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
            onClick={peraConnectOnClick}
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
  setIsConnectingAddress: PropTypes.func,
  closeFn: PropTypes.func
}

WalletsOptions.defaultProps = {
  isConnectingAddress: false,
  setIsConnectingAddress: () => console.log('Hello here')
}

export default WalletsOptions
