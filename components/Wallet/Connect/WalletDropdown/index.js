import { filter, find, reduceRight } from 'lodash'
import { useContext, useMemo, useReducer } from 'react'
import useWallets, { WalletsContext } from '@/hooks/useWallets'
import { WalletReducerContext } from '../../../../hooks/WalletsReducerProvider'

import DropdownBody from './DropdownBody'
import DropdownFooter from './DropdownFooter'
import DropdownHeader from './DropdownHeader'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useAlgodex } from '@algodex/algodex-hooks'
import { connect as newConnect } from '../../../../hooks/useMyAlgoConnectNew'
import {
  initialState as reducerInitialState,
  walletReducer
} from '../../../../hooks/walletsReducer'

const styleReset = css`
  margin: 0;
  padding: 0;
  // border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
`
const Container = styled.div`
  p {
    ${styleReset}
  }
  position: absolute;
  min-height: 16rem;
  background-color: ${({ theme }) => theme.colors.gray[700]};
  max-width: 23rem;
  width: 100%;
  margin-top: 1rem;
  border-radius: 4px;
  overflow: none;
  right: 9rem;
  top: 4rem;
`

const WalletConnectDropdown = ({ closeDropdown }) => {
  const { wallet: initialState, isConnected } = useAlgodex()
  const [addresses] = useContext(WalletsContext)
  const { addressesNew, setAddressesNew } = useContext(WalletReducerContext)
  // const [addresses, setAddresses] = useContext(WalletsContext)
  const { wallet, peraConnect, myAlgoConnect } = useWallets(initialState)
  // const addressesRef = useRef(null)
  const WALLETS_CONNECT_MAP = {
    'my-algo-wallet': myAlgoConnect,
    'pera-connect': peraConnect
  }
  // const [walletState, dispatch] = useReducer(walletReducer, reducerInitialState)

  const myAlgoOnClick = async () => {
    console.log('myAlogOnClick')
    console.log('hit')
    // const { connect: newConnect } = useMyAlgoConnectNew()
    // const _myAlgoAddresses = newConnect()
    const _myAlgoAddresses = await WALLETS_CONNECT_MAP['my-algo-wallet']()
    console.log('addressesNewBefore')
    console.log(addressesNew)

    setAddressesNew(_myAlgoAddresses)

    console.log('addresses new adter')
    console.log(addressesNew)

    // console.log(_myAlgoAddresses)
    // console.log('walletState before ')
    // console.log(walletState)
    // dispatch({
    //   action: 'setAddresses',
    //   payload: _myAlgoAddresses
    // })

    // console.log('wallet state after')

    // console.log(walletState)
  }

  const peraConnectOnClick = () => {
    WALLETS_CONNECT_MAP['pera-connect']()
  }
  // const isPeraConnected = useMemo(() => {
  //   const peraAddr = isConnected && addresses.filter((wallet) => wallet.type === 'wallet-connect')
  //   if (peraAddr && peraAddr.length) {
  //     return peraAddr.length > 0
  //   }
  // }, [isConnected, addresses])
  const isPeraConnected = useMemo(() => {
    if (isConnected) {
      const peraAddr = isConnected && addresses.filter((addr) => addr.type === 'wallet-connect')
      return peraAddr.length > 0
    }
    return false
  }, [isConnected, addresses])

  // useEffect(() => {
  //   if (!addressesRef.current) {
  //     // Initialize the ref after first checking to see what is in localStorage
  //     const storedAddrs = JSON.parse(localStorage.getItem('addresses'))
  //     if (Array.isArray(storedAddrs) && storedAddrs.length > 0) {
  //       setAddresses(storedAddrs)
  //     }
  //     addressesRef.current = addresses
  //   }

  //   const localStorageExists =
  //     JSON.parse(localStorage.getItem('addresses')) !== null &&
  //     JSON.parse(localStorage.getItem('addresses')).length > 0

  //   const addressesExist = typeof addresses !== 'undefined' && addresses.length > 0

  //   if (localStorageExists && addressesExist) {
  //     // localStorage.setItem('addresses', JSON.stringify(addresses))
  //   }
  //   const walletDifference = difference(
  //     addresses.map((addr) => addr.address),
  //     addressesRef.current.map((addr) => addr.address)
  //   )
  //   if (walletDifference.length > 0) {
  //     localStorage.setItem('addresses', JSON.stringify(addresses))
  //     addressesRef.current = addresses
  //     closeDropdown()
  //   }
  //   // **Note** Can't put closeFn() in the onClicks because it will closeOut
  //   // modal before wallet-connect finishes connecting leading to stale state.
  //   // Creating a ref that persists between renders gives us a way to automatically close out
  //   // modals only when a new address is added to the addresses array.
  // }, [addresses])

  const sortedWalletsList = useMemo(() => {
    if (addresses) {
      const activeWallet = find(addresses, (o) => o.address === wallet?.address)
      const inactiveWallet = filter(addresses, (o) => o.address !== wallet?.address)
      return {
        activeWallet,
        inactiveWallet
      }
    }
  }, [addresses, wallet])

  return (
    <Container className="">
      <div className="flex flex-col justify-between">
        <DropdownHeader closeFn={closeDropdown} />
        <DropdownBody
          activeWalletAddress={wallet?.address}
          sortedWalletsList={sortedWalletsList}
          closeFn={closeDropdown}
          addresses={addressesNew}
          myAlgoOnClick={myAlgoOnClick}
          peraConnectOnClick={peraConnectOnClick}
          isPeraConnected={isPeraConnected}
        />
        <DropdownFooter />
      </div>
    </Container>
  )
}

WalletConnectDropdown.propTypes = {
  closeDropdown: PropTypes.func
}

export default WalletConnectDropdown
