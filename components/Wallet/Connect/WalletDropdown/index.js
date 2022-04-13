import { filter, find } from 'lodash'
import { useEffect, useMemo } from 'react'

import DropdownBody from './DropdownBody'
import DropdownFooter from './DropdownFooter'
import DropdownHeader from './DropdownHeader'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
// import { useAlgodex } from '@algodex/algodex-hooks'
import useMyAlgo from 'hooks/useMyAlgo'
import useStore from 'store/use-store'
import { useStorePersisted } from 'store/use-store'
import { useWalletsQuery } from '@algodex/algodex-hooks'

const Container = styled.div`
  position: absolute;
  min-height: 16rem;
  background-color: ${({ theme }) => theme.colors.gray[700]};
  max-width: 23rem;
  width: 100%;
  margin-top: 1rem;
  border-radius: 4px;
  overflow: none;
  right: 9rem;
  top: 4rem;
`

const WalletConnectDropdown = ({ closeDropdown }) => {
  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)
  const setActiveWalletAddress = useStorePersisted((state) => state.setActiveWalletAddress)
  const setWallets = useStorePersisted((state) => state.setWallets)
  const setIsSignedIn = useStore((state) => state.setIsSignedIn)
  const isSignedIn = useStore((state) => state.isSignedIn)
  const wallets = useStorePersisted((state) => state.wallets)
  const { connect, addresses } = useMyAlgo()
  // const { addresses, wallet, isConnected } = useAlgodex()

  const walletAddresses = useMemo(() => {
    if (addresses) {
      return addresses
    }
    return wallets ? wallets.map((w) => w.address) : []
  }, [addresses, wallets])

  // fetch wallet balances from blockchain
  const walletsQuery = useWalletsQuery({ wallets: walletAddresses })
  useEffect(() => {
    if (walletsQuery.data?.wallets) {
      setWallets(walletsQuery.data.wallets)

      if (!isSignedIn) {
        setIsSignedIn(true)
      }

      if (!walletAddresses.includes(activeWalletAddress)) {
        setActiveWalletAddress(walletsQuery.data.wallets[0].address)
      }
    }
  }, [
    activeWalletAddress,
    isSignedIn,
    setActiveWalletAddress,
    setIsSignedIn,
    setWallets,
    walletAddresses,
    walletsQuery.data
  ])

  const connectWallet = (type) => {
    switch (type) {
      case 'myalgowallet':
        connect()
        break
      case 'algomobilewallet':
        // Connect Algorand Mobile Wallet
        break
      default:
        break
    }
  }

  const disconnectWalletFn = (address, type) => {
    switch (type) {
      case 'myalgowallet':
        setIsSignedIn(false)
        setActiveWalletAddress('')
        setWallets([])
        return 'myalgowallet'
      case 'algomobilewallet':
        console.log('algomobilewallet')
        return 'algomobilewallet'
      default:
        break
    }
  }

  const sortedWalletsList = useMemo(() => {
    const activeWallet = find(wallets, (o) => o.address === activeWalletAddress)
    const inactiveWallet = filter(wallets, (o) => o.address !== activeWalletAddress)
    console.log(activeWallet, inactiveWallet, 'hey')
    return {
      activeWallet,
      inactiveWallet
    }
  }, [activeWalletAddress, wallets])

  return (
    <Container className="">
      <div className="flex flex-col justify-between">
        <DropdownHeader closeFn={closeDropdown} />
        <DropdownBody
          connectWallet={connectWallet}
          disconnectWalletFn={disconnectWalletFn}
          activeWalletAddress={activeWalletAddress}
          sortedWalletsList={sortedWalletsList}
        />
        <DropdownFooter />
      </div>
    </Container>
  )
}

WalletConnectDropdown.propTypes = {
  closeDropdown: PropTypes.func
}

export default WalletConnectDropdown
