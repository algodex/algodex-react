import { copyAddress, setExplorerLink, truncatedWalletAddress } from 'components/helpers'
import { mdiContentCopy, mdiOpenInNew } from '@mdi/js'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Icon from '@mdi/react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { find } from 'lodash'
import theme from 'theme'
import { useAlgodex } from '@algodex/algodex-hooks'
import useUserStore from 'store/use-user-state'
import { useWalletConnect } from '@/hooks/useWalletConnect'

const InactiveWalletsList = ({ walletsList }) => {
  const activeNetwork = useUserStore((state) => state.activeNetwork)
  const { wallet, setWallet, addresses } = useAlgodex()
  const { disconnect: peraDisconnect } = useWalletConnect()

  const isWalletActive = (addr) => {
    return wallet.address === addr
  }

  const switchWalletAddress = (addr) => {
    if (!isWalletActive(addr)) {
      const _wallet = find(addresses, (o) => o.address === addr)
      setWallet(_wallet, { validate: false, merge: true })
    }
  }

  const WALLETS_DISCONNECT_MAP = {
    'my-algo-wallet': () => console.log('Disconnect Pera Wallet'),
    'wallet-connect': peraDisconnect
  }

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
        {walletsList.map(({ address, type }, idx) => {
          return (
            <div className="mt-4" key={idx}>
              <div className="flex justify-between items-center">
                <div
                  onKeyDown={() => switchWalletAddress(address)}
                  onClick={() => switchWalletAddress(address)}
                  role="button"
                  tabIndex="0"
                  title="Set as active"
                  className="cursor-pointer flex justify-between border-solid border rounded items-center p-1.5 w-4/5"
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
                <Button
                  className="rounded ml-2 text-xs font-semibold"
                  variant="contained"
                  style={{
                    backgroundColor: theme.colors.gray['800']
                  }}
                  onClick={() => WALLETS_DISCONNECT_MAP[type]()}
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
        })}
      </div>
    </div>
  )
}

InactiveWalletsList.propTypes = {
  walletsList: PropTypes.array
}

InactiveWalletsList.defaultProps = {
  walletsList: []
}

export default InactiveWalletsList
