import { uniq, uniqBy, filter } from 'lodash'
import { useEffect, useMemo } from 'react'
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

  /**
   * Memoized MyAlgoWallet Address
   * @param  {} (No Parameter is expected.
   *
   * Listens for changes in:
   * addresses and wallets
   */
  const walletAddresses = useMemo(() => {
    if (addresses) {
      return addresses
    }
    return wallets ? wallets.map((w) => w.address) : []
  }, [addresses, wallets])

  /**
   * Memoized Algorand Wallet Address
   * @param  {} (No Parameter is expected.
   *
   * Listens for changes in:
   * WalletConnectAddress and Wallets
   */
  const algorandWalletAddresses = useMemo(() => {
    if (walletConnectAddresses) {
      return walletConnectAddresses
    }
    return wallets ? wallets.map((w) => w.address) : []
  }, [walletConnectAddresses, wallets])

  /**
   * Memoized Combined Wallet Addresses
   * @param  {} (No Parameter is expected.
   */
  // const combineWalletAddresses = useMemo(() => {
  //   let hasMyAlgo = false
  //   let hasAlgorandWallet = false
  //   let allAddresses = []
  //   let walletAddressesAndType = []

  //   if (walletAddresses && walletAddresses.length) {
  //     hasMyAlgo = true
  //   }
  //   if (algorandWalletAddresses && algorandWalletAddresses.length) {
  //     hasAlgorandWallet = true
  //   }

  //   if (hasAlgorandWallet) {
  //     allAddresses = [...algorandWalletAddresses]
  //     // Set Wallet Type
  //     walletAddressesAndType.push(
  //       ...allAddresses.map((address) => ({ address, type: 'algorand-wallet' }))
  //     )
  //   }
  //   if (hasMyAlgo) {
  //     allAddresses = [...algorandWalletAddresses, ...walletAddresses]
  //     walletAddressesAndType.push(
  //       ...allAddresses.map((address) => ({ address, type: 'my-algo-connect' }))
  //     )
  //   }

  //   if (allAddresses.length) {
  //     const uniqueWalletAddresses = uniq(allAddresses)
  //     const uniqWalletAddressesWithType = uniqBy(walletAddressesAndType, 'address')
  //     setAllAddresses(uniqWalletAddressesWithType)
  //     console.log(uniqueWalletAddresses, 'unique wallet addresses')
  //     return uniqueWalletAddresses
  //   }
  //   return undefined
  // }, [algorandWalletAddresses, walletAddresses, setAllAddresses, wallets])
  const combineWalletAddresses = useMemo(() => {
    let hasMyAlgo = false
    let hasAlgorandWallet = false
    let allAddresses = []
    let walletAddressesAndType = []

    if (walletConnectAddresses && walletConnectAddresses.length) {
      hasAlgorandWallet = true
    }
    if (addresses && addresses.length) {
      hasMyAlgo = true
    }

    if (hasAlgorandWallet) {
      allAddresses = [...walletConnectAddresses]
      // Set Wallet Type
      walletAddressesAndType.push(
        ...allAddresses.map((address) => ({ address, type: 'algorand-wallet' }))
      )
    }
    if (hasMyAlgo) {
      allAddresses = [...addresses, ...walletConnectAddresses]
      walletAddressesAndType.push(
        ...allAddresses.map((address) => ({ address, type: 'my-algo-connect' }))
      )
    }

    allAddresses = [...allAddresses, ...(wallets ? wallets.map((w) => w.address) : [])]
    walletAddressesAndType.push(
      ...allAddresses.map((address) => ({ address, type: 'my-algo-connect' }))
    )

    if (allAddresses.length) {
      const uniqueWalletAddresses = uniq(allAddresses)
      const uniqWalletAddressesWithType = uniqBy(walletAddressesAndType, 'address')
      setAllAddresses(uniqWalletAddressesWithType)
      console.log(uniqueWalletAddresses, 'unique wallet addresses')
      return uniqueWalletAddresses
    }
    return undefined
  }, [walletConnectAddresses, addresses, setAllAddresses, wallets])

  /**
   * Disconnects a Wallet Address
   * @param {String} addr A wallet address (Basically for reference)
   * @param {String} type Type of wallet we intend to disconnect
   *
   * Only Two wallet types are currently supported
   * Algorand Wallet and My Algo Connect
   *
   */
  const handleDisconnectFn = async (addr, type) => {
    // Saves the updated list after filtering
    let updatedAddrList = []

    // Handles disconnect for Algorand wallet addresses
    if (type === 'algorand-wallet') {
      updatedAddrList = filter(allAddresses, ({ type }) => type !== 'algorand-wallet')
      updatedAddrList = updatedAddrList ? updatedAddrList : []
      if (!updatedAddrList.length) {
        await setWallets(updatedAddrList)
        await setAllAddresses([])
        await setActiveWalletAddress('')
      }
      await onDisconnect()
    }

    // Handles disconnect for My Algo wallet addresses
    if (type === 'my-algo-connect') {
      updatedAddrList = filter(allAddresses, ({ type }) => type !== 'my-algo-connect')
      if (!updatedAddrList.length) {
        await setWallets(updatedAddrList)
        await setAllAddresses([])
        await setActiveWalletAddress('')
      }
    }
  }

  // fetch wallet balances from blockchain
  const walletsQuery = useWalletsQuery({ wallets: combineWalletAddresses })

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

  /**
   * Handles addition of new Wallet Connection
   * @param  {String} type The type of Connection service to use
   *
   * Currently avaible options can be one of MyAlgo or AlgorandOfficial
   */
  const addConnection = (type) => {
    switch (type) {
      case 'MyAlgo':
        connect()
        return
      case 'AlgorandOfficial':
        walletConnect()
        return
      default:
        return 'No wallet selected'
    }
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
