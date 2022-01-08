import { useEffect, useMemo } from 'react'
import useStore, { useStorePersisted } from 'store/use-store'

import useMyAlgo from 'hooks/useMyAlgo'
import useWalletConnect from 'hooks/use-wallet-connect'
import { useWalletsQuery } from 'hooks/useAlgodex'

export default function useWalletController(walletTag) {
  const { connect, addresses } = useMyAlgo()
  const { walletConnect, walletConnectAddresses } = useWalletConnect()

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

  const algorandWalletAddresses = useMemo(() => {
    if (walletConnectAddresses) {
      console.log(walletConnectAddresses, 'wallet address')
      return walletConnectAddresses
    }
    return wallets ? wallets.map((w) => w.address) : []
  }, [walletConnectAddresses, wallets])

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

  const addConnection = () => {
    switch (walletTag) {
      case 'MyAlgo':
        return handleMyAlgoConnectFn()
      case 'AlgorandOfficial':
        return handleAlgorandWallectFn()
      default:
        return 'No wallet selected'
    }
  }

  const handleMyAlgoConnectFn = () => {
    connect()
  }

  const handleAlgorandWallectFn = () => {
    walletConnect()
  }

  return {
    addConnection,
    activeWalletAddress,
    isSignedIn,
    setActiveWalletAddress,
    setIsSignedIn,
    setWallets,
    walletAddresses,
    walletsQueryData: walletsQuery.data
  }
}
