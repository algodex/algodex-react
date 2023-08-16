import { filter, find } from 'lodash'
import { useContext, useMemo, useCallback, useRef } from 'react'
import useWallets from '@/hooks/useWallets'
import { WalletReducerContext, mergeAddresses } from '../../../../hooks/WalletsReducerProvider'

import DropdownBody from './DropdownBody'
import DropdownHeader from './DropdownHeader'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useAlgodex } from '@/hooks'

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
  const { http } = useAlgodex()
  // const [addresses] = useContext(WalletsContext)
  const {
    addressesNew,
    setAddressesNew,
    activeWallet,
    setActiveWallet,
    peraWallet,
    deflyWallet,
    setMyAlgoAddresses
  } = useContext(WalletReducerContext)

  const {
    peraConnect,
    deflyConnect,
    myAlgoConnect,
    peraDisconnect: _peraDisconnect,
    deflyDisconnect: _deflyDisconnect,
    walletconnectConnect,
    walletconnectDisconnect,
    myAlgoDisconnect: _myAlgoDisconnect
  } = useWallets(closeDropdown)
  const WALLETS_CONNECT_MAP = {
    'my-algo-wallet': myAlgoConnect,
    'pera-connect': peraConnect,
    'defly-connect': deflyConnect,
    'wallet-connect-general': walletconnectConnect
  }
  const dropDownRef = useRef()

  // const handleClickOutside = (e) => {
  //   if (dropDownRef.current.contains(e.target)) {
  //     return
  //   }
  //   setOpenWalletConnectDropdown(false)
  //   // **** Unexpected Behavior: Header component is outside the dropdown, so this sets false when clicking on header button
  //   // **** Header button is !walletConnectDropdown so it toggles to true, which leads to the unexpected behavior
  //   // **** Current production behavior forces users to click on header or close icon to exit dropdown so removing altogether
  // }

  // useEffect(() => {
  //   if (openWalletConnectDropdown) {
  //     document.addEventListener('mousedown', handleClickOutside)
  //   } else {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  // }, [openWalletConnectDropdown])
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

  const peraConnectOnClick = async () => {
    await WALLETS_CONNECT_MAP['pera-connect']()
  }
  const deflyConnectOnClick = async () => {
    await WALLETS_CONNECT_MAP['defly-connect']()
  }
  const walletconnectGeneralOnClick = async () => {
    await WALLETS_CONNECT_MAP['wallet-connect-general']()
  }

  const isPeraConnected = peraWallet !== null
  const isDeflyConnected = deflyWallet !== null
  const sortedWalletsList = useMemo(() => {
    if (addressesNew) {
      //**may need to change */
      const active = find(addressesNew, (o) => o.address === activeWallet?.address)
      const inactiveWallet = filter(addressesNew, (o) => o.address !== activeWallet?.address)
      return {
        activeWallet: active,
        inactiveWallet
      }
    }
  }, [addressesNew, activeWallet])

  // const {
  //   // myAlgoConnector,
  //   peraDisconnect: _peraDisconnect,
  //   myAlgoDisconnect: _myAlgoDisconnect
  // } = useWallets(wallet)

  const myAlgoDisconnect = (targetWallet) => {
    _myAlgoDisconnect(targetWallet)
  }

  const peraDisconnect = useCallback(
    (targetWallet) => {
      _peraDisconnect(targetWallet)
    },
    [_peraDisconnect]
  )
  const deflyDisconnect = useCallback(
    (targetWallet) => {
      _deflyDisconnect(targetWallet)
    },
    [_deflyDisconnect]
  )
  const walletDisconnectMap = {
    'my-algo-wallet': (wallet) => {
      myAlgoDisconnect(wallet)
    },
    'wallet-connect': (wallet) => peraDisconnect(wallet),
    'wallet-connect-defly': (wallet) => deflyDisconnect(wallet),
    'wallet-connect-general': (wallet) => walletconnectDisconnect(wallet)
  }

  return (
    <Container className="">
      <div ref={dropDownRef} className="flex flex-col justify-between">
        <DropdownHeader closeFn={closeDropdown} />
        <DropdownBody
          wallet={activeWallet}
          activeWalletAddress={activeWallet?.address}
          sortedWalletsList={sortedWalletsList}
          closeFn={closeDropdown}
          addresses={addressesNew}
          walletDisconnectMap={walletDisconnectMap}
          myAlgoOnClick={myAlgoOnClick}
          peraConnectOnClick={peraConnectOnClick}
          deflyConnectOnClick={deflyConnectOnClick}
          walletconnectGeneralOnClick={walletconnectGeneralOnClick}
          isPeraConnected={isPeraConnected}
          isDeflyConnected={isDeflyConnected}
        />
        {/* <DropdownFooter /> */}
      </div>
    </Container>
  )
}

WalletConnectDropdown.propTypes = {
  closeDropdown: PropTypes.func,
  setOpenWalletConnectDropdown: PropTypes.func,
  openWalletConnectDropdown: PropTypes.bool
}

export default WalletConnectDropdown
