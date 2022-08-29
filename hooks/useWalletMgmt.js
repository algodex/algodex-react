import { useContext, useEffect, useRef, useState } from 'react'
import useWallets, { WalletsContext } from '@/hooks/useWallets'

import signer from '@algodex/algodex-sdk/lib/wallet/signers/MyAlgoConnect'
import useAccountsInfo from '@/hooks/useAccountsInfo'
import { useAlgodex } from '@algodex/algodex-hooks'
import { useEventDispatch } from '@/hooks/useEvents'

function useWalletMgmt() {
  const { wallet, setWallet, isConnected } = useAlgodex()
  const [addresses, setAddresses] = useContext(WalletsContext)
  const [signedIn, setSignedIn] = useState(false)
  const { peraConnect } = useWallets()
  const myAlgoConnector = useRef(null)
  const dispatcher = useEventDispatch()

  useEffect(() => {
    if (addresses.length > 0) {
      setSignedIn(true)
      if (typeof wallet === 'undefined') {
        setWallet(addresses[0])
      }
    }
  }, [addresses])

  const myAlgoDisconnect = (targetWallet) => {
    const remainingAddresses = JSON.parse(localStorage.getItem('addresses')).filter((wallet) => {
      return wallet.address !== targetWallet.address
    })
    //You may want to filter by active address array to avoid rehydration?
    localStorage.setItem('addresses', JSON.stringify(remainingAddresses))
    setAddresses(remainingAddresses)
    if (remainingAddresses.length === 0) {
      dispatcher('signOut', {
        type: 'wallet'
      })
      setSignedIn(false)
    } else {
      setWallet(remainingAddresses[0])
    }
  }

  const peraDisconnect = (targetWallet) => {
    const remainingAddresses = JSON.parse(localStorage.getItem('addresses')).filter((wallet) => {
      return wallet.address !== targetWallet.address
    })

    localStorage.setItem('addresses', JSON.stringify(remainingAddresses))
    setAddresses(remainingAddresses)
    if (remainingAddresses.length === 0) {
      dispatcher('signOut', {
        type: 'wallet'
      })
      setSignedIn(false)
    } else {
      setWallet(remainingAddresses[0])
    }
    if (typeof targetWallet.connector.killSession !== 'undefined')
      targetWallet.connector.killSession()
    localStorage.removeItem('walletconnect')
  }

  const myAlgoConnect = () => {
    const mappedAddresses = addresses.map((addr) => {
      if (addr.type === 'my-algo-wallet') {
        return {
          ...addr,
          connector: myAlgoConnector.current
        }
      } else {
        return addr
      }
    })
    setAddresses(mappedAddresses)
  }

  const walletReconnectorMap = {
    'my-algo-wallet': myAlgoConnect,
    'wallet-connect': peraConnect
  }

  const walletDisconnectMap = {
    'my-algo-wallet': myAlgoDisconnect,
    'wallet-connect': peraDisconnect
  }

  const isWalletActive = (addr) => {
    return wallet?.address === addr
  }

  const isTabbable = (addr) => {
    return isWalletActive(addr) ? -1 : 0
  }

  const handleWalletClick = async (addr) => {
    !isWalletActive(addr) && setWallet(addr)
  }

  const walletsQuery = useAccountsInfo(addresses)

  useEffect(() => {
    if (walletsQuery.data) {
      const mappedAddresses = addresses.map((wallet, idx) => {
        return { ...wallet, ...walletsQuery.data[idx] }
      })

      setAddresses(mappedAddresses)
      //Below is commented out because setting localstorage breaks with myAlgo Popup
      // localStorage.setItem('addresses', JSON.stringify(mappedAddresses))
    }
  }, [walletsQuery.data])

  const rehyrdateWallet =
    typeof wallet !== 'undefined' && //activeWallet exists &
    typeof wallet?.connector?.sign === 'undefined' // does not have a signing method

  useEffect(() => {
    const reConnectMyAlgoWallet = async () => {
      // '@randlabs/myalgo-connect' is imported dynamically
      // because it uses the window object
      const MyAlgoConnect = (await import('@randlabs/myalgo-connect')).default
      MyAlgoConnect.prototype.sign = signer
      myAlgoConnector.current = new MyAlgoConnect()
      myAlgoConnector.current.connected = true
    }
    reConnectMyAlgoWallet()
  }, [])

  // useEffect(() => {
  //   if (!isConnected && typeof activeWallet !== 'undefined') {
  //     const cachedAddresses = JSON.parse(localStorage.getItem('addresses'))
  //     if (
  //       Array.isArray(cachedAddresses) &&
  //       cachedAddresses.map((addr) => addr.address).includes(activeWallet?.address)
  //     ) {
  //       const addressesToCache = cachedAddresses.filter(
  //         (addr) => addr.address !== activeWallet?.address
  //       )
  //       localStorage.setItem('addresses', JSON.stringify(addressesToCache))
  //       setAddresses(addressesToCache)
  //     }
  //   }
  // }, [isConnected])

  useEffect(() => {
    if (rehyrdateWallet) {
      walletReconnectorMap[wallet.type]()
    }
  }, [wallet])

  useEffect(() => {
    if (typeof wallet !== 'undefined' && addresses.length > 0) {
      const targetWallet = addresses.filter((addr) => addr.address === wallet.address)[0]
      if (typeof targetWallet?.connector?.sign !== 'undefined') setWallet(targetWallet)
    }
  }, [addresses])

  return {
    addresses: addresses,
    isConnected: isConnected,
    setAddresses: setAddresses,
    wallet: wallet,
    signedIn: signedIn,
    setSignedIn: setSignedIn,
    setActiveWallet: setWallet,
    walletDisconnectMap: walletDisconnectMap,
    isTabbable: isTabbable,
    handleWalletClick: handleWalletClick
  }
}
export default useWalletMgmt
