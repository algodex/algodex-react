import { copyAddress, setExplorerLink, truncatedWalletAddress } from 'components/helpers'
import { mdiContentCopy, mdiOpenInNew } from '@mdi/js'

import Button from '@mui/material/Button'
import Icon from '@mdi/react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import theme from 'theme'
import { useStorePersisted } from 'store/use-store'
import useUserStore from 'store/use-user-state'

const InactiveWalletsList = ({ walletsList, disconnectWalletFn }) => {
  const activeNetwork = useUserStore((state) => state.activeNetwork)
  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)
  const setActiveWalletAddress = useStorePersisted((state) => state.setActiveWalletAddress)
  const isWalletActive = (addr) => {
    return activeWalletAddress === addr
  }

  const switchWalletAddress = (addr) => {
    !isWalletActive(addr) && setActiveWalletAddress(addr)
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
                  role="button"
                  tabIndex="0"
                  onClick={() => switchWalletAddress(address)}
                  className="flex justify-between border-solid border rounded items-center p-1.5 w-4/5"
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
                  // onClick={() => handleDisconnectFn(address, type)}
                  onClick={() => disconnectWalletFn(address, type)}
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
  walletsList: PropTypes.array,
  disconnectWalletFn: PropTypes.func
}

InactiveWalletsList.defaultProps = {
  // walletsList: [
  //   {
  //     address: '5Keh5B8UVJjHW5aZcUi6DEsrk1LCBPc8C9MH8EJrZ7RPLpimsPk0Pza1lQ',
  //     type: 'algomobilewallet'
  //   },
  //   {
  //     address: '9Welv5B8UVJjHW5aZcUi6DEsrk1LCBPc8C9MH8EJrZ7RPMqocRZ9iZh2Dz',
  //     type: 'myalgowallet'
  //   }
  // ],
  walletsList: [],
  disconnectWalletFn: () => console.log('Wallet click')
}

export default InactiveWalletsList
