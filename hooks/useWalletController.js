import { uniq, uniqBy, filter, find } from 'lodash'
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
  const combineWalletAddresses = useMemo(() => {
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

    if (hasMyAlgo) {
      allAddresses = [...algorandWalletAddresses, ...walletAddresses]
      walletAddressesAndType.push(
        ...allAddresses.map((address) => ({ address, type: 'my-algo-connect' }))
      )
    }
    if (hasAlgorandWallet) {
      allAddresses = [...algorandWalletAddresses]
      // Set Wallet Type
      walletAddressesAndType.push(
        ...allAddresses.map((address) => ({ address, type: 'algorand-wallet' }))
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

  const allAddrMemo = useMemo(() => {
    let addrList = []
    // Changes in My Algo Connect
    if (addresses) {
      addrList = [...addresses.map((addr) => ({ address: addr, type: 'my-algo-connect' }))]
    }
    // Changes in My Algo Connect
    if (walletConnectAddresses) {
      addrList = [...addresses.map((addr) => ({ address: addr, type: 'algorand-wallet' }))]
    }
    // Ensure no address is repeated
    const uniqAddr = uniqBy([...allAddresses, ...addrList], 'address')
    // setAllAddresses(uniqAddr)
    return uniqAddr
  }, [addresses, walletConnectAddresses, setAllAddresses, allAddresses])

  const combinedAddrses = useMemo(() => {
    return allAddrMemo.map((addr) => addr.address)
  }, [allAddrMemo])

  // const combineWalletAddresses = useMemo(() => {
  //   // let allAddresses = []
  //   let walletAddressesAndType = []

  //   console.log(walletConnectAddresses, addresses, wallets, allAddresses, 'addresses')

  //   if (walletConnectAddresses && walletConnectAddresses.length) {
  //     hasAlgorandWallet = true
  //   }
  //   if (addresses && addresses.length) {
  //     hasMyAlgo = true
  //   }

  //   if (hasAlgorandWallet) {
  //     allAddresses = [...walletConnectAddresses, ...(wallets ? wallets.map((w) => w.address) : [])]
  //     // Set Wallet Type
  //     walletAddressesAndType.push(
  //       ...allAddresses.map((address) => ({ address, type: 'algorand-wallet' }))
  //     )
  //   }
  //   if (hasMyAlgo) {
  //     allAddresses = [...allAddresses, ...addresses]
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
  // }, [
  //   walletConnectAddresses,
  //   addresses,
  //   setAllAddresses,
  //   allAddresses,
  //   wallets
  // ])

  const dtActiveWalletAddr = (wallets) => {
    const newActiveWalletAddr = find(wallets, ({ address }) => address !== activeWalletAddress)
    setActiveWalletAddress(newActiveWalletAddr.address)
    return
  }

  const dtAllAddresses = (wallets) => {
    const newAllAddrList = wallets.forEach((wallet) => {
      const item = find(allAddresses, ({ address }) => address === wallet.address)
      if (item) {
        return item
      }
    })
    setAllAddresses(newAllAddrList)
    return
  }

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
    let updatedWalletsList = []

    // Handles disconnect for Algorand wallet addresses
    if (type === 'algorand-wallet') {
      updatedWalletsList = filter(wallets, ({ type }) => type !== 'algorand-wallet')
      updatedWalletsList = updatedWalletsList ? updatedWalletsList : []
      await onDisconnect()
      setWallets(updatedWalletsList)
      dtAllAddresses(updatedWalletsList)
      dtActiveWalletAddr(updatedWalletsList)
    }

    // Handles disconnect for My Algo wallet addresses
    if (type === 'my-algo-connect') {
      updatedWalletsList = filter(allAddresses, ({ type }) => type !== 'my-algo-connect')
      if (!updatedWalletsList.length) {
        await setAllAddresses([])
        await setActiveWalletAddress('')
      }
      await setWallets(updatedWalletsList)
    }
  }

  // fetch wallet balances from blockchain
  // const walletsQuery = useWalletsQuery({ wallets: combineWalletAddresses })
  const walletsQuery = useWalletsQuery({ wallets: combinedAddrses })
  console.log(walletsQuery, 'wallets query')

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
