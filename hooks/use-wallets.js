import { useState, useMemo, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import {WalletService} from '@algodex/algodex-sdk'
import useStore, { useStorePersisted } from 'store/use-store'
import useMyAlgo from 'hooks/use-my-algo'
import shallow from 'zustand/shallow'

function useWallets() {
  const router = useRouter()
  const adminWalletAddr = router.query.adminWalletAddr

  const [wallets, setWallets] = useState([])

  const walletAddresses = useStorePersisted((state) => state.walletAddresses)
  const setWalletAddresses = useStorePersisted((state) => state.setWalletAddresses)

  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)
  const setActiveWalletAddress = useStorePersisted((state) => state.setActiveWalletAddress)

  const isSignedIn = useStore(state => state.isSignedIn);
  const setIsSignedIn = useStore((state) => state.setIsSignedIn)

  const myAlgo = useMyAlgo()

  // When addresses change from my algo, update wallet addresses.
  useEffect(() => {
    setWalletAddresses(myAlgo.addresses)
  }, [myAlgo.addresses])

  const addresses = adminWalletAddr ? [adminWalletAddr] : walletAddresses

  const query = useQuery(['wallets', addresses], () => WalletService().fetchWallets(addresses), {
    refetchInterval: 10000,
    enabled: Array.isArray(addresses) && addresses.length > 0,
    select: data => data.wallets,
    onSuccess: (data) => {
      if (data.wallets) {

        if (!isSignedIn) {
          setIsSignedIn(true);
        }

        if (!activeWalletAddress) {
          setActiveWalletAddress(data.wallets[0].address)
        }
      }
    }
  })

  return {
    query,
    connectMyAlgo: myAlgo.connect
  }
}

export default useWallets
