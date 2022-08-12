import { Box, Button } from '@mui/material'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import useWallets, { WalletsContext } from '@/hooks/useWallets'

import DropdownFooter from '@/components/Wallet/Connect/WalletDropdown/DropdownFooter'
import DropdownHeader from '@/components/Wallet/Connect/WalletDropdown/DropdownHeader'
import Modal from 'components/Modal'
import PropTypes from 'prop-types'
import { Section } from '@/components/Layout/Section'
import Typography from '@mui/material/Typography'
import WalletOptionsList from '@/components/Wallet/Connect/WalletDropdown/WalletOptionsList'
import WalletsList from './WalletConnect/WalletsList'
import { difference } from 'lodash'
import signer from '@algodex/algodex-sdk/lib/wallet/signers/MyAlgoConnect'
import styled from '@emotion/styled'
import useAccountsInfo from '@/hooks/useAccountsInfo'
import { useAlgodex } from '@algodex/algodex-hooks'
import { useEventDispatch } from '@/hooks/useEvents'
import useMobileDetect from '@/hooks/useMobileDetect'
import useTranslation from 'next-translate/useTranslation'

const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.background.dark};
  padding: 0rem 0 1rem;
  @media (max-width: 1024px) {
    height: 70vh;
  }
`

const ModalContainer = styled.div`
  transform: translate(-50%, -50%);
  @media (max-width: 992px) {
    width: 90%;
    transform: translate(-50%, -65%);
    overflow-y: auto;
    max-height: 100%;
  }
`

const EmptyState = styled.div`
  position: relative;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 1.125rem;
  text-align: center;
`

const gridStyles = `
  grid-template-columns: repeat(2, 1fr);
  column-gap: 0.25rem;
`

const Header = styled.header`
  flex-shrink: 0%;
  display: grid;
  ${gridStyles}
  padding: 0 1.125rem 0.25rem;
  margin-top: 1.5rem;
`

const Wallets = styled.div`
  flex: 1 1 0%;
  position: relative;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.palette.gray[700]};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.gray[600]};
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.palette.gray[500]};
  }
  ::-webkit-scrollbar-corner {
    background: ${({ theme }) => theme.palette.gray[700]};
  }
`

const WalletsWrapper = styled.div`
  flex: 1 1 0%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`
export function WalletView(props) {
  // const [isConnectingAddress, setIsConnectingAddress] = useState(false)
  const {
    addressesRef,
    activeWallet,
    signedIn,
    addresses,
    setActiveWallet,
    setAddresses,
    setSignedIn,
    setIsConnectingWallet
  } = props
  const { t } = useTranslation('wallet')
  const { peraConnect } = useWallets()
  const myAlgoConnector = useRef(null)

  const dispatcher = useEventDispatch()

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
      setActiveWallet(remainingAddresses[0])
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
      setActiveWallet(remainingAddresses[0])
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

  // const getButtonVariant = () => {
  //   return signedIn ? 'default' : 'primary'
  // }

  const isWalletActive = (addr) => {
    return activeWallet?.address === addr
  }

  const isTabbable = (addr) => {
    return isWalletActive(addr) ? -1 : 0
  }

  const handleWalletClick = async (addr) => {
    !isWalletActive(addr) && setActiveWallet(addr)
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
    typeof activeWallet !== 'undefined' && //activeWallet exists &
    typeof activeWallet?.connector?.sign === 'undefined' // does not have a signing method

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

  useEffect(() => {
    if (rehyrdateWallet) {
      walletReconnectorMap[activeWallet.type]()
    }
  }, [activeWallet])

  useEffect(() => {
    if (typeof activeWallet !== 'undefined' && addresses.length > 0) {
      const targetWallet = addresses.filter((addr) => addr.address === activeWallet.address)[0]
      if (typeof targetWallet?.connector?.sign !== 'undefined') setActiveWallet(targetWallet)
    }
  }, [addresses])

  const handleKeyDown = (e, addr) => {
    if (e.key === 'Enter' || e.key === ' ') {
      !isWalletActive(addr) && setActiveWallet(addr)
    }
  }

  const getWalletLogo = (wallet) => {
    if (typeof wallet === 'undefined' || typeof wallet.type === 'undefined') {
      throw new TypeError('Must have a valid wallet!')
    }
    switch (wallet.type) {
      case 'wallet-connect':
        return '/Wallet-Connect-icon.svg'
      case 'my-algo-wallet':
        return '/My-Algo-Wallet-icon.svg'
    }
  }

  return (
    <Section area="topRight">
      <Container>
        {signedIn ? (
          <>
            <Header>
              <Typography
                sx={{
                  textTransform: 'uppercase'
                }}
                variant="body_tiny"
                color="gray.500"
              >
                {t('wallet')}
              </Typography>
              <Typography
                sx={{
                  textTransform: 'uppercase'
                }}
                variant="body_tiny"
                color="gray.500"
                textAlign="right"
              >
                {t('balance')}
              </Typography>
            </Header>
            <Wallets>
              <WalletsWrapper>
                <WalletsList
                  addresses={addresses}
                  isTabbable={isTabbable}
                  isWalletActive={isWalletActive}
                  handleWalletClick={handleWalletClick}
                  handleKeyDown={handleKeyDown}
                  getWalletLogo={getWalletLogo}
                  walletDisconnectMap={walletDisconnectMap}
                  closeFn={() => setIsConnectingWallet(false)}
                  addressesRef={addressesRef}
                  setAddresses={setAddresses}
                />
              </WalletsWrapper>
            </Wallets>
          </>
        ) : (
          <EmptyState p={3}>
            {/* <Arrow>
              <SvgImage use="walletArrow" h={4} color="gray.600" />
            </Arrow> */}
            <Typography variant="h5" color="gray.100" m={0} mb={4} className="leading-6">
              {t('start-by')}
            </Typography>
            <Typography variant="subtitle_small" color="gray.500" m={0}>
              {t('once-connected')}
            </Typography>
          </EmptyState>
        )}
      </Container>
    </Section>
  )
}

WalletView.propTypes = {
  addresses: PropTypes.array.isRequired,
  setAddresses: PropTypes.func.isRequired,
  activeWallet: PropTypes.string,
  signedIn: PropTypes.bool,
  setSignedIn: PropTypes.func,
  setActiveWallet: PropTypes.func.isRequired,
  area: PropTypes.string,
  setIsConnectingWallet: PropTypes.func,
  addressesRef: PropTypes.object
}

WalletView.defaultProps = {
  signedIn: false
}

export function WalletOptionsListComp(props) {
  const {
    setIsConnectingWallet,
    isConnectingWallet,
    addresses,
    setAddresses,
    closeFn,
    addressesRef
  } = props
  const { peraConnect, myAlgoConnect } = useWallets()
  // const addressesRef = useRef(null)

  const WALLETS_CONNECT_MAP = {
    'my-algo-wallet': myAlgoConnect,
    'pera-connect': peraConnect
  }

  const myAlgoOnClick = () => {
    WALLETS_CONNECT_MAP['my-algo-wallet']()
  }

  const peraConnectOnClick = () => {
    WALLETS_CONNECT_MAP['pera-connect']()
  }
  const isPeraConnected = useMemo(() => {
    const peraAddr = addresses.filter((addr) => addr.type === 'wallet-connect')
    return peraAddr.length > 0
  }, [addresses])

  useEffect(() => {
    if (!addressesRef.current) {
      // Initialize the ref after first checking to see what is in localStorage
      const storedAddrs = JSON.parse(localStorage.getItem('addresses'))
      if (Array.isArray(storedAddrs) && storedAddrs.length > 0) {
        setAddresses(storedAddrs)
      }
      addressesRef.current = addresses
    }

    const localStorageExists =
      JSON.parse(localStorage.getItem('addresses')) !== null &&
      JSON.parse(localStorage.getItem('addresses')).length > 0

    const addressesExist = typeof addresses !== 'undefined' && addresses.length > 0

    if (localStorageExists && addressesExist) {
      localStorage.setItem('addresses', JSON.stringify(addresses))
    }
    const walletDifference = difference(
      addresses.map((addr) => addr.address),
      addressesRef.current.map((addr) => addr.address)
    )
    if (walletDifference.length > 0) {
      localStorage.setItem('addresses', JSON.stringify(addresses))
      addressesRef.current = addresses
      closeFn()
    }
    // **Note** Can't put closeFn() in the onClicks because it will closeOut
    // modal before wallet-connect finishes connecting leading to stale state.
    // Creating a ref that persists between renders gives us a way to automatically close out
    // modals only when a new address is added to the addresses array.
  }, [addresses])

  return (
    <Modal
      onClick={() => {
        setIsConnectingWallet(false)
      }}
      data-testid="notification-modal-wrapper"
      isVisible={isConnectingWallet}
    >
      <ModalContainer
        className="absolute top-2/4 left-2/4 bg-gray-700 text-white rounded-sm"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <DropdownHeader closeFn={() => setIsConnectingWallet(false)} />
        <Box className="px-2 py-4 bg-gray-600">
          {/* <WalletOptionsList /> */}
          <WalletOptionsList
            isConnectingAddress={isConnectingWallet}
            setIsConnectingAddress={setIsConnectingWallet}
            addresses={addresses}
            myAlgoOnClick={myAlgoOnClick}
            peraConnectOnClick={peraConnectOnClick}
            isPeraConnected={isPeraConnected}
          />
        </Box>
        <DropdownFooter />
      </ModalContainer>
    </Modal>
  )
}

WalletOptionsListComp.propTypes = {
  setIsConnectingWallet: PropTypes.func,
  isConnectingWallet: PropTypes.bool,
  addresses: PropTypes.array,
  setAddresses: PropTypes.array,
  closeFn: PropTypes.array,
  addressesRef: PropTypes.object
}

/**
 * @todo Merge WalletView into WalletConnect
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function WalletConnect() {
  const { wallet, setWallet } = useAlgodex()
  const [addresses, setAddresses] = useContext(WalletsContext)
  const [signedIn, setSignedIn] = useState(false)
  const [isConnectingWallet, setIsConnectingWallet] = useState(false)
  const isMobile = useMobileDetect()
  const addressesRef = useRef(null)

  // console.log(wallet, 'wallet here')
  useEffect(() => {
    if (addresses.length > 0) {
      setSignedIn(true)
      if (typeof wallet === 'undefined') {
        setWallet(addresses[0])
      }
    }
  }, [addresses])

  return (
    <Box className="flex flex-col justify-center" width="100%">
      {isMobile && (
        <>
          <WalletOptionsListComp
            setIsConnectingWallet={setIsConnectingWallet}
            isConnectingWallet={isConnectingWallet}
            addresses={addresses}
            setAddresses={setAddresses}
            closeFn={() => setIsConnectingWallet(false)}
            addressesRef={addressesRef}
          />

          <Box mx={2}>
            <Button
              className="w-full flex text-xs font-bold justify-center items-center bg-gray-700 h-8 mt-2 text-white rounded"
              variant="contained"
              onClick={() => setIsConnectingWallet(true)}
            >
              CONNECT {addresses && addresses.length > 0 && 'ANOTHER'} WALLET
            </Button>
          </Box>
        </>
      )}
      <WalletView
        addresses={addresses}
        setAddresses={setAddresses}
        activeWallet={wallet}
        signedIn={signedIn}
        setSignedIn={setSignedIn}
        setActiveWallet={setWallet}
        setIsConnectingWallet={setIsConnectingWallet}
        addressesRef={addressesRef}
      />
    </Box>
  )
}

export default WalletConnect
