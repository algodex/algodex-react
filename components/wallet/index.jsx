import { useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import useMyAlgo from 'hooks/use-my-algo'
import useStore from 'store/use-store'
import WalletService from 'services/wallet'
import WalletView from './view'

export default function Wallet() {
  const { connect, addresses } = useMyAlgo()

  const wallets = useStore((state) => state.wallets)
  const activeWalletAddress = useStore((state) => state.activeWalletAddress)
  const isSignedIn = useStore((state) => state.isSignedIn)
  const setIsSignedIn = useStore((state) => state.setIsSignedIn)

  const setWallets = useStore((state) => state.setWallets)
  const setActiveWalletAddress = useStore((state) => state.setActiveWalletAddress)

  const walletAddresses = useMemo(
    () => addresses || wallets.map((w) => w.address) || [],
    [addresses, wallets]
  )

  const { data } = useQuery('wallets', () => WalletService.fetchWallets(walletAddresses))

  useEffect(() => {
    if (data?.wallets) {
      setWallets(data.wallets)

      if (!isSignedIn) {
        setIsSignedIn(true)
      }

      if (!walletAddresses.includes(activeWalletAddress)) {
        setActiveWalletAddress(data.wallets[0].address)
      }
    }
  }, [
    activeWalletAddress,
    data,
    isSignedIn,
    setActiveWalletAddress,
    setIsSignedIn,
    setWallets,
    walletAddresses
  ])

  return (
    <WalletView
      wallets={wallets}
      activeWalletAddress={activeWalletAddress}
      isSignedIn={isSignedIn}
      onConnectClick={connect}
      onSetActiveWallet={setActiveWalletAddress}
    />
  )
}
