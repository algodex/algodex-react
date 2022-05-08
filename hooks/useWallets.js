import { useAlgodex } from '@algodex/algodex-hooks'
import useMyAlgoConnect from './useMyAlgoConnect'
import useWalletConnect from './useWalletConnect'
import { useCallback, useEffect, useState } from 'react'

function useWallets() {
  const [activeWallet, setActiveWallet] = useState()
  const [addresses, setAddresses] = useState([])
  const { wallet, setWallet } = useAlgodex()

  // Handle any Connection
  const handleConnect = useCallback(
    (_addresses) => {
      setAddresses(
        _addresses.map((a) => {
          // Remove connector instance
          delete a.connector
          // Return the address
          return a
        })
      )
    },
    [setAddresses]
  )

  // Handle any Disconnect
  const handleDisconnect = useCallback((_addresses) => {
    console.error('Handle removing from storage', _addresses)
  }, [])

  // My Algo Connect/Disconnect
  const { connect: myAlgoConnect, disconnect: myAlgoDisconnect } = useMyAlgoConnect(
    handleConnect,
    handleDisconnect
  )
  // Pera Connect/Disconnect
  const { connect: walletConnect, disconnect: walletDisconnect } = useWalletConnect(
    handleConnect,
    handleDisconnect
  )

  // Fetch active wallet from local storage
  useEffect(() => {
    const res = localStorage.getItem('activeWallet')
    if (res && res !== activeWallet) {
      setActiveWallet(JSON.parse(localStorage.getItem('activeWallet')))
    }
  }, [setActiveWallet])

  // Fetch all wallet addresses from local storage
  useEffect(() => {
    const res = localStorage.getItem('addresses')
    if (res) {
      setAddresses(JSON.parse(localStorage.getItem('addresses')))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses))
  }, [addresses])

  return {
    wallet,
    setWallet,
    addresses,
    myAlgoConnect,
    walletConnect,
    walletDisconnect,
    myAlgoDisconnect
  }
}

export default useWallets
