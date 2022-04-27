import { copyAddress, setExplorerLink, truncatedWalletAddress } from 'components/helpers'
import { mdiContentCopy, mdiOpenInNew } from '@mdi/js'

import Button from '@mui/material/Button'
import Icon from '@mdi/react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import theme from 'theme'
import { useMyAlgoConnect } from '@/hooks/useMyAlgoConnect'
import useUserStore from 'store/use-user-state'
import { useWalletConnect } from '@/hooks/useWalletConnect'

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
    <div>
      {typeof address !== 'undefined' ? (
        <div>
          <Typography variant="body_small_cap_bold" color="gray.000" className="mb-3">
            ACTIVE WALLET
          </Typography>
          <div className="text-white">
            <div
              className="p-2 text-xs rounded shadow"
              style={{
                backgroundColor: 'rgba(113, 128, 150, 0.1)'
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex item-center border-solid border rounded justify-between w-4/5 p-1.5">
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
                    backgroundColor: theme.colors.gray['700']
                  }}
                  onClick={() => WALLETS_DISCONNECT_MAP[type]()}
                >
                  DISCONNECT
                </Button>
              </div>
              <div>
                <Link href={setExplorerLink(address, activeNetwork)}>
                  <a className="flex justify-end items-center text-white mr-10 mt-3 font-medium">
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
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

ActiveWalletList.propTypes = {
  wallet: PropTypes.object
}

export default ActiveWalletList
