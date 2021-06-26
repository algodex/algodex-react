import { useState, useEffect } from 'react'
import algodex from '@algodex/algodex-sdk'
import Spinner from 'components/spinner'
import useMyAlgo from 'hooks/use-my-algo'
import useLocalStorage from 'hooks/use-local-storage'
import useStore from 'store/use-store'
import { convertAmount } from 'services/convert'
import { truncateAddress } from 'services/display'
import WalletView from './view'

export default function Wallet() {
  const { connect, addresses } = useMyAlgo()

  const [storedWallets, setStoredWallets] = useLocalStorage('wallets', [])
  const [isStorageChecked, setIsStorageChecked] = useState(false)

  const wallets = useStore((state) => state.wallets)
  const activeWalletAddress = useStore((state) => state.activeWalletAddress)
  const isSignedIn = useStore((state) => state.isSignedIn)

  const setWallets = useStore((state) => state.setWallets)
  const setActiveWalletAddress = useStore((state) => state.setActiveWalletAddress)
  // const signOut = useStore((state) => state.signOut)

  useEffect(() => {
    if (!isStorageChecked && storedWallets.length > 0) {
      setWallets(storedWallets)
    }
    setIsStorageChecked(true)
  }, [isStorageChecked, setWallets, storedWallets])

  useEffect(() => {
    const onMyAlgoConnect = async () => {
      try {
        const AlgodClient = new algodex.initAlgodClient('test')

        const promises = addresses.map(async (address) => {
          const accountInfo = await AlgodClient.accountInformation(address).do()

          return {
            address,
            name: truncateAddress(address),
            balance: convertAmount(accountInfo.amount),
            assets: accountInfo.assets.reduce(
              (result, asset) => ({
                ...result,
                [asset['asset-id']]: {
                  balance: convertAmount(asset.amount)
                }
              }),
              {}
            )
          }
        })

        const result = await Promise.all(promises)

        setWallets(result)
        setStoredWallets(result)
      } catch (e) {
        console.error(e.message)
      }
    }

    addresses && onMyAlgoConnect(addresses)
  }, [addresses, setStoredWallets, setWallets])

  if (!isStorageChecked) {
    return <Spinner flex />
  }

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
