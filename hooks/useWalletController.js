import { uniq, uniqBy, filter, find } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import useStore, { useStorePersisted } from 'store/use-store'

import useMyAlgo from 'hooks/useMyAlgo'
import useWalletConnect from 'hooks/use-wallet-connect'
import { useWalletsQuery } from 'hooks/useAlgodex'

export default function useWalletController() {
  const { connect, addresses } = useMyAlgo()
  const { walletConnect, walletConnectAddresses, walletConnection, onDisconnect } =
    useWalletConnect()
  const [addressesList, setAddressesList] = useState([])
  const wallets = useStorePersisted((state) => state.wallets)
  const setWallets = useStorePersisted((state) => state.setWallets)
  const setAllAddresses = useStorePersisted((state) => state.setAllAddresses)
  const allAddresses = useStorePersisted((state) => state.allAddresses)
  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)
  const setActiveWalletAddress = useStorePersisted((state) => state.setActiveWalletAddress)
  const isSignedIn = useStore((state) => state.isSignedIn)
  const setIsSignedIn = useStore((state) => state.setIsSignedIn)

  useEffect(() => {
    setAddressesList(allAddresses)
  }, [])

  /**
   * Memoized Wallet Address List
   * @param  {} (No Parameter is expected.
   *
   * Listens for changes in:
   * [addresses, walletConnectAddresses, setAllAddresses, addressesList]
   */
  const allAddrMemo = useMemo(() => {
    let addrList = []
    // Changes in My Algo Connect
    if (addresses) {
      addrList = [...addresses.map((addr) => ({ address: addr, type: 'my-algo-connect' }))]
    }
    // Changes in My Algo Connect
    if (walletConnectAddresses) {
      addrList = [
        ...walletConnectAddresses?.map((addr) => ({ address: addr, type: 'algorand-wallet' }))
      ]
    }
    // Ensure no address is repeated
    const uniqAddr = uniqBy([...addressesList, ...addrList], 'address')
    if (uniqAddr.length) {
      setAllAddresses(uniqAddr)
    }

    return uniqAddr
  }, [addresses, walletConnectAddresses, setAllAddresses, addressesList])

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
   * Combined Addresses
   * @param  {} (
   */
  const combinedAddrses = useMemo(() => {
    return allAddrMemo.map((addr) => addr.address)
  }, [allAddrMemo])

  // fetch wallet balances from blockchain
  const walletsQuery = useWalletsQuery({ wallets: combinedAddrses })

  useEffect(() => {
    if (walletsQuery?.data?.wallets) {
      setWallets(walletsQuery.data.wallets)

      if (!isSignedIn) {
        setIsSignedIn(true)
      }

      if (!walletAddresses?.includes(activeWalletAddress)) {
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
      console.log(updatedWalletsList, 'wallets list')
      // await onDisconnect()
      // setWallets(updatedWalletsList)
      // dtAllAddresses(updatedWalletsList)
      // dtActiveWalletAddr(updatedWalletsList)
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
