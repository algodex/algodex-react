import { useEffect } from 'react'
import algodexsdk from '@algodex/algodex-sdk'
import useMyAlgo from 'hooks/use-my-algo'
import useStore from 'store/use-store'
import { convertAmount } from 'services/convert'
import { truncateAddress } from 'services/display'
import WalletView from './view'

export default function Wallet() {
  const { connect, addresses } = useMyAlgo()

  const wallets = useStore((state) => state.wallets)
  const activeWalletAddress = useStore((state) => state.activeWalletAddress)
  const isSignedIn = useStore((state) => state.isSignedIn)

  const setWallets = useStore((state) => state.setWallets)
  const setActiveWalletAddress = useStore((state) => state.setActiveWalletAddress)
  // const signOut = useStore((state) => state.signOut)

  const reduceAssets = (result, asset) => ({
    ...result,
    [asset['asset-id']]: {
      balance: convertAmount(asset.amount)
    }
  })

  useEffect(() => {
    const onMyAlgoConnect = async () => {
      try {
        const AlgodClient = new algodexsdk.initAlgodClient('test')

        const promises = addresses.map(async (address) => {
          const accountInfo = await AlgodClient.accountInformation(address).do()

          return {
            address,
            name: truncateAddress(address),
            balance: convertAmount(accountInfo.amount),
            assets: accountInfo.assets.reduce(reduceAssets, {})
          }
        })

        const result = await Promise.all(promises)
        setWallets(result)
      } catch (e) {
        console.error(e.message)
      }
    }

    addresses && onMyAlgoConnect(addresses)
  }, [addresses, setWallets])

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
