import { uniq, uniqBy, find } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import useStore, { useStorePersisted } from 'store/use-store'

import useMyAlgo from 'hooks/useMyAlgo'
import useWalletConnect from 'hooks/use-wallet-connect'
import { useWalletsQuery } from 'hooks/useAlgodex'

export default function useWalletController() {
  const { connect, addresses } = useMyAlgo()
  const { walletConnect, walletConnectAddresses, walletConnection, onDisconnect } =
    useWalletConnect()
  const wallets = useStorePersisted((state) => state.wallets)
  const setWallets = useStorePersisted((state) => state.setWallets)
  const setAllAddresses = useStorePersisted((state) => state.setAllAddresses)
  const allAddresses = useStorePersisted((state) => state.allAddresses)
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

  const allWalletAddresses = useMemo(() => {
    let hasMyAlgo = false
    let hasAlgorandWallet = false
    let allAddresses = []
    let walletAddressesAndType = []
    if (walletAddresses && walletAddresses.length) {
      hasMyAlgo = true
    }
    if (algorandWalletAddresses && algorandWalletAddresses.length) {
      hasAlgorandWallet = true
    }

    if (hasAlgorandWallet) {
      allAddresses = [...algorandWalletAddresses]
      // Set Wallet Type
      walletAddressesAndType.push(
        ...allAddresses.map((address) => ({ address, type: 'algorand-wallet' }))
      )
    }
    if (hasMyAlgo) {
      allAddresses = [...algorandWalletAddresses, ...walletAddresses]
      walletAddressesAndType.push(
        ...allAddresses.map((address) => ({ address, type: 'my-algo-connect' }))
      )
    }

    if (allAddresses.length) {
      const uniqueWalletAddresses = uniq(allAddresses)
      const uniqWalletAddressesWithType = uniqBy(walletAddressesAndType, 'address')
      setAllAddresses(uniqWalletAddressesWithType)
      console.log(uniqueWalletAddresses, 'unique wallet addresses')
      return uniqueWalletAddresses
    }
    return undefined
  }, [algorandWalletAddresses, walletAddresses, setAllAddresses, wallets])

  const handleDisconnectFn = async (addr, type) => {
    // Fetch wallet type to disconnect
    let res = []

    // Update wallets with new address
    if (type === 'algorand-wallet') {
      res = find(allAddresses, ({ type }) => type !== 'algorand-wallet')
      res = res ? res : []
      console.log(res, 'result from sdfs')
      await onDisconnect()
      await setWallets(res)
      await setAllAddresses([])
      await setActiveWalletAddress('')
    }
    if (type === 'my-algo-connect') {
      res = find(allAddresses, ({ type }) => type !== 'my-algo-connect')
    }
    console.log(res, 'result')
  }

  // fetch wallet balances from blockchain
  const walletsQuery = useWalletsQuery({ wallets: allWalletAddresses })

  useEffect(() => {
    if (walletsQuery?.data?.wallets && walletConnection) {
      setWallets(walletsQuery.data.wallets)

      if (!isSignedIn) {
        setIsSignedIn(true)
      }

      if (!walletAddresses?.includes(activeWalletAddress)) {
        setActiveWalletAddress(walletsQuery.data.wallets[0].address)
      }
    }
  }, [
    wallets,
    activeWalletAddress,
    isSignedIn,
    setActiveWalletAddress,
    setIsSignedIn,
    setWallets,
    walletAddresses,
    walletsQuery.data,
    walletConnection
  ])

  const addConnection = (walletTag) => {
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
    walletsQueryData: walletsQuery.data,
    handleDisconnectFn
  }
}
