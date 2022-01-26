import useStore, { useStorePersisted } from 'store/use-store'
import WalletView from './view'
import useMyAlgo from 'hooks/useMyAlgo'
import { useWalletsQuery } from 'hooks/useAlgodex'
import { useEffect, useMemo } from 'react'

function Wallet() {
  const { connect: onWalletConnect, addresses } = useMyAlgo()

  const wallets = useStorePersisted((state) => state.wallets)
  const setWallets = useStorePersisted((state) => state.setWallets)
  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)
  const setActiveWalletAddress = useStorePersisted((state) => state.setActiveWalletAddress)
  const isSignedIn = useStore((state) => state.isSignedIn)
  const setIsSignedIn = useStore((state) => state.setIsSignedIn)

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
  return (
    <WalletView
      wallets={wallets}
      activeWalletAddress={activeWalletAddress}
      isSignedIn={isSignedIn}
      onConnectClick={onWalletConnect}
      onSetActiveWallet={setActiveWalletAddress}
    />
  )
}

export default Wallet