import { copyAddress, setExplorerLink, truncatedWalletAddress } from 'components/helpers'
import { mdiContentCopy, mdiOpenInNew } from '@mdi/js'

import Button from '@mui/material/Button'
import Icon from '@mdi/react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { Typography, Box } from '@mui/material'
import theme from 'theme'
import useMyAlgoConnect from '@/hooks/useMyAlgoConnect'
import useUserStore from 'store/use-user-state'
import useWalletConnect from '@/hooks/useWalletConnect'

const ActiveWalletList = ({ wallet }) => {
  const activeNetwork = useUserStore((state) => state.activeNetwork)
  const { disconnect: disconnectMyAlgoWallet } = useMyAlgoConnect()
  const { disconnect: peraDisconnect } = useWalletConnect()
  const address = wallet?.address
  const type = wallet?.type
  const WALLETS_DISCONNECT_MAP = {
    'my-algo-wallet': disconnectMyAlgoWallet,
    'wallet-connect': peraDisconnect
  }
  return (
    <Box>
      {typeof address !== 'undefined' ? (
        <Box>
          <Typography variant="body_small_cap_bold" color="gray.000" className="mb-3">
            ACTIVE WALLET
          </Typography>
          <Box className="text-white">
            <Box
              className="p-2 text-xs rounded shadow"
              style={{
                backgroundColor: 'rgba(113, 128, 150, 0.1)'
              }}
            >
              <Box className="flex justify-between items-center">
                <Box className="flex item-center border-solid border rounded justify-between w-4/5 p-1.5">
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
                    backgroundColor: theme.colors.gray['700']
                  }}
                  onClick={() => WALLETS_DISCONNECT_MAP[type]()}
                >
                  DISCONNECT
                </Button>
              </Box>
              <Box>
                <Link href={setExplorerLink(address, activeNetwork)}>
                  <a className="flex justify-end items-center text-white mr-10 mt-3 font-medium">
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
          </Box>
        </Box>
      ) : (
        <Box></Box>
      )}
    </Box>
  )
}

ActiveWalletList.propTypes = {
  wallet: PropTypes.object
}

export default ActiveWalletList
