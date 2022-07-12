import { Box, Typography } from '@mui/material'
import { copyAddress, setExplorerLink, truncatedWalletAddress } from 'components/helpers'
import { mdiContentCopy, mdiOpenInNew } from '@mdi/js'
import { useAlgodex, useWallets } from '@algodex/algodex-hooks'

import Button from '@mui/material/Button'
import Icon from '@mdi/react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { find } from 'lodash'
import theme from 'theme'
import { useEffect } from 'react'
// import { useAlgodex } from '@algodex/algodex-hooks'
// import useMyAlgoConnect from '@/hooks/useMyAlgoConnect'
import useUserStore from 'store/use-user-state'

// import useWalletConnect from '@/hooks/useWalletConnect'

// import useUserStore from 'store/use-user-state'

const InactiveWalletsList = ({ walletsList }) => {
  const activeNetwork = useUserStore((state) => state.activeNetwork)
  const { wallet, setWallet } = useAlgodex()
  const { peraDisconnect, myAlgoDisconnect } = useWallets(wallet)
  const { addresses } = useWallets()
  console.log(wallet, addresses, 'wallet and addresses')

  // const { wallet } = useAlgodex()
  wallet
  // const { addresses } = useWallets()
  console.log(addresses, 'addresses updated again')

  const isWalletActive = (addr) => {
    return wallet.address === addr
  }

  const switchWalletAddress = (addr) => {
    if (!isWalletActive(addr)) {
      const _wallet = find(addresses, (o) => o.address === addr)
      setWallet(_wallet, { validate: false, merge: true })
    }
  }

  useEffect(() => {
    console.log(addresses, 'hello')
  }, [addresses])

  const WALLETS_DISCONNECT_MAP = {
    'my-algo-wallet': myAlgoDisconnect,
    'wallet-connect': peraDisconnect
  }

  return (
    <Box
      className="mt-2 p-2 text-xs rounded text-white"
      style={{
        backgroundColor: theme.colors.gray['700']
      }}
    >
      <Box>
        <Typography variant="body_small_cap_bold" color="gray.000" className="mb-1.5">
          SWITCH WALLETS
        </Typography>
        <Typography>Click on address to switch active wallets</Typography>
      </Box>
      <Box>
        {walletsList.map(({ address, type }, idx) => {
          return (
            <Box className="mt-4" key={idx}>
              <Box className="flex justify-between items-center">
                <Box
                  onKeyDown={() => switchWalletAddress(address)}
                  onClick={() => switchWalletAddress(address)}
                  role="button"
                  tabIndex="0"
                  title="Set as active"
                  className="cursor-pointer flex justify-between border-solid border rounded items-center p-1.5 w-4/5"
                >
                  <Typography>{truncatedWalletAddress(address, 11)}</Typography>
                  <Icon
                    onClick={() => copyAddress(address)}
                    path={mdiContentCopy}
                    title="Copy Address"
                    size={0.8}
                    className="cursor-pointer"
                    color="#FFFFFF"
                  />
                </Box>
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
              </Box>
              <Box>
                <Link href={setExplorerLink(address, activeNetwork)}>
                  <a
                    target="_blank"
                    className="flex justify-end items-center text-white mr-10 mt-3 font-medium"
                  >
                    <Typography>View on AlgoExplorer</Typography>
                    <Icon
                      path={mdiOpenInNew}
                      title="Algo explorer link"
                      size={0.8}
                      className="cursor-pointer"
                      color="#FFFFFF"
                    />
                  </a>
                </Link>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

InactiveWalletsList.propTypes = {
  walletsList: PropTypes.array
}

InactiveWalletsList.defaultProps = {
  walletsList: []
}

export default InactiveWalletsList
