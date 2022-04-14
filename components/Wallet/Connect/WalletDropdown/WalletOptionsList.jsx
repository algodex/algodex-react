import Button from '@mui/material/Button'
import Image from 'next/image'
import PropTypes from 'prop-types'
import theme from 'theme'
import { useAlgodex } from '@algodex/algodex-hooks'
import { useMyAlgoConnect } from '@/hooks/useMyAlgoConnect'
// import { useWalletConnect } from '@/hooks/useWalletConnect'
import { useState } from 'react'

const WalletsOptions = () => {
  const [isConnectingAddress, setIsConnectingAddress] = useState(false)
  const connect = useMyAlgoConnect()
  const { wallet, addresses } = useAlgodex()
  console.log(addresses, 'addresses here')
  // const { connect: peraConnect, disconnect: peraDisconnect } = useWalletConnect()
  // const peraWallet = useWalletConnect()

  const WALLETS_CONNECT_MAP = {
    'my-algo-wallet': connect,
    'pera-wallet': () => console.log('Connect Pera Wallet')
  }
  return (
    <>
      {!wallet?.address || isConnectingAddress ? (
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
      ) : (
        <Button
          className="w-full flex text-xs font-bold justify-center items-center h-8 mt-2 text-white rounded"
          variant="contained"
          style={{
            backgroundColor: theme.colors.gray['700']
          }}
          onClick={() => setIsConnectingAddress(!isConnectingAddress)}
        >
          CONNECT ANOTHER WALLET
        </Button>
      )}
    </>
  )
}

WalletsOptions.propTypes = {
  handleWalletConnect: PropTypes.func,
  isRenderingList: PropTypes.bool
}

WalletsOptions.defaultProps = {
  handleWalletConnect: () => console.log('Hello here'),
  isRenderingList: false
}

export default WalletsOptions
