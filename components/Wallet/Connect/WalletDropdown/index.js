import { filter, find, reduceRight } from 'lodash'
import { useContext, useMemo, useReducer } from 'react'
import useWallets, { WalletsContext } from '@/hooks/useWallets'
import { WalletReducerContext, mergeAddresses } from '../../../../hooks/WalletsReducerProvider'

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
  const { wallet: initialState, isConnected, http } = useAlgodex()
  const [addresses] = useContext(WalletsContext)
  const {
    addressesNew,
    setAddressesNew,
    activeWallet,
    setActiveWallet,
    myAlgoAddresses,
    setMyAlgoAddresses
  } = useContext(WalletReducerContext)
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
    const _fetchedAlgoAddresses = await http.indexer.fetchAccounts(_myAlgoAddresses)
    const _mergedAlgoAddresses = mergeAddresses(_myAlgoAddresses, _fetchedAlgoAddresses)

    setMyAlgoAddresses(_mergedAlgoAddresses)
    setAddressesNew({ type: 'myAlgo', addresses: _mergedAlgoAddresses })

    if (!activeWallet) setActiveWallet(_mergedAlgoAddresses[0])

    console.log('addresses new adter')
    console.log(addressesNew)
    closeDropdown()
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
