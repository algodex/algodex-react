import { useEffect, useMemo, useState } from 'react'
import useStore, { useStorePersisted } from 'store/use-store'

import { uniq } from 'lodash'
import useMyAlgo from 'hooks/useMyAlgo'
import useWalletConnect from 'hooks/use-wallet-connect'
import { useWalletsQuery } from 'hooks/useAlgodex'

export default function useWalletController(walletTag) {
  const { connect, addresses } = useMyAlgo()
  const { walletConnect, walletConnectAddresses, onDisconnect } = useWalletConnect()
  const wallets = useStorePersisted((state) => state.wallets)
  const setWallets = useStorePersisted((state) => state.setWallets)
  const setAllAddresses = useStorePersisted((state) => state.setAllAddresses)
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
      return walletConnectAddresses
    }
    return wallets ? wallets.map((w) => w.address) : []
  }, [walletConnectAddresses, wallets])

  // const allWalletAddresses = useMemo(() => {
  //   let allAddresses = []
  //   if (walletAddresses) {
  //     allAddresses = [...walletAddresses]
  //   }
  //   if (algorandWalletAddresses) {
  //     allAddresses = [...allAddresses, ...walletAddresses]
  //   }

  //   if (allAddresses.length) {
  //     return uniq(allAddresses)
  //   }

  //   return undefined
  // }, [algorandWalletAddresses, walletAddresses])
  const allWalletAddresses = useMemo(() => {
    let hasMyAlgo = false
    let hasAlgorandWallet = false
    let allAddresses = []

    if (walletAddresses) {
      hasMyAlgo = true
    }
    if (algorandWalletAddresses) {
      hasAlgorandWallet = true
    }

    if (hasAlgorandWallet) {
      allAddresses = [...algorandWalletAddresses]
    }
    if (hasMyAlgo) {
      allAddresses = [...algorandWalletAddresses, ...walletAddresses]
    }

    if (allAddresses.length) {
      const uniqueWalletAddresses = uniq(allAddresses)
      setAllAddresses(uniqueWalletAddresses)
      return uniqueWalletAddresses
    }

    return undefined
  }, [algorandWalletAddresses, walletAddresses, setAllAddresses])

  // fetch wallet balances from blockchain
  const walletsQuery = useWalletsQuery({ wallets: allWalletAddresses })

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
