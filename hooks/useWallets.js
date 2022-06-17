import { useAlgodex, useMyAlgoConnect, useWalletConnect } from '@algodex/algodex-hooks'

import { useCallback, useEffect, useState } from 'react'
import { isEqual } from 'lodash/lang'
import events from '@algodex/algodex-sdk/lib/events'
/**
 *
 * @param {Array<Wallet>} a
 * @param {Array<Wallet>} b
 * @return {Array<Wallet>}
 * @private
 */
function _mergeAddresses(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new TypeError('Must be an array of addresses!')
  }
  const map = new Map()
  a.forEach((wallet) => map.set(wallet.address, wallet))
  b.forEach((wallet) => map.set(wallet.address, { ...map.get(wallet.address), ...wallet }))
  return Array.from(map.values())
}

/**
 * Use Wallets Hooks
 * @param {Object} initialState Wallet Initial State
 * @return {*}
 */
function useWallets(initialState) {
  // We know it is not being set back to an array because when u change the value to an array with a string in it it stays the same between sign ins
  const [wallet, setWallet] = useState(initialState)
  const [activeWallet, setActiveWallet] = useState()
  const [addresses, setAddresses] = useState(initialState ? [initialState] : [])
  const { http } = useAlgodex()

  const onEvents = useCallback(
    (props) => {
      const { type, wallet: _wallet } = props
      if (type === 'change' && !isEqual(wallet, _wallet)) {
        setWallet(_wallet)
        setActiveWallet(_wallet.address)
      }
    },
    [setWallet, wallet]
  )

  useEffect(() => {
    events.on('wallet', onEvents)
    return () => {
      events.off('wallet', onEvents)
    }
  }, [onEvents])

  // TODO: Account Info Query
  // Handle any Connection
  const handleConnect = useCallback(
    async (_addresses) => {
      // Addresses gets reset to [] somewhere
      const accounts = await http.indexer.fetchAccounts(_addresses)
      console.log(accounts)
      //   debugger;
      const mergedAddresses = _mergeAddresses(_addresses, accounts)
      console.log(`Merged addresses: ${mergedAddresses} /n Addresses before merge ${addresses}`)
      debugger
      setAddresses([...addresses, ...mergedAddresses])
      console.log(`Addresses after merge ${addresses}`)
      //   debugger;
    },
    [setAddresses] //why setAddresses in dependency array? It will never change so this will not run.
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
  const { connect: peraConnect, disconnect: peraDisconnect } = useWalletConnect(
    handleConnect,
    handleDisconnect
  )

  // Fetch active wallet from local storage
  useEffect(() => {
    const res = localStorage.getItem('activeWallet')
    if (res && res !== activeWallet) {
      setActiveWallet(localStorage.getItem('activeWallet'))
    }
  }, [setActiveWallet])

  // Fetch all wallet addresses from local storage
  useEffect(() => {
    //Suspect function
    const res = localStorage.getItem('addresses')
    if (res) {
      setAddresses(JSON.parse(localStorage.getItem('addresses')))
    }
  }, []) // We are setting the addresses to array to equal what is in local storage and in the next effect we are setting localStorage to equal addresses? Seems redundant. I'm pretty sure we should add.

  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses))
  }, [addresses])
  return {
    wallet,
    setWallet,
    addresses,
    myAlgoConnect,
    peraConnect,
    peraDisconnect,
    myAlgoDisconnect
  }
}

export default useWallets
