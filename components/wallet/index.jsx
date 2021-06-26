import { useEffect } from 'react'
import algodex from '@algodex/algodex-sdk'
import useMyAlgo from 'hooks/use-my-algo'
import useStore from 'store/use-store'
import WalletService from 'services/wallet'
import WalletView from './view'

export default function Wallet() {
  const { connect, addresses } = useMyAlgo()

  const wallets = useStore((state) => state.wallets)
  const activeWalletAddress = useStore((state) => state.activeWalletAddress)
  const isSignedIn = useStore((state) => state.isSignedIn)

  // const setWallets = useStore((state) => state.setWallets)
  const setActiveWalletAddress = useStore((state) => state.setActiveWalletAddress)
  const setNewConnection = useStore((state) => state.setNewConnection)
  // const signOut = useStore((state) => state.signOut)

  useEffect(() => {
    const onMyAlgoConnect = async () => {
      try {
        const AlgodClient = new algodex.initAlgodClient('test')

        const promises = addresses.map(async (address) => {
          const accountInfo = await AlgodClient.accountInformation(address).do()

          return WalletService.setWalletData(accountInfo)
        })

        const walletData = await Promise.all(promises)

        setNewConnection(walletData)
      } catch (e) {
        console.error(e)
      }
    }
    addresses && onMyAlgoConnect(addresses)
  }, [addresses, setNewConnection])

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
