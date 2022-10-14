/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Box, Button } from '@mui/material'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import DropdownFooter from '@/components/Wallet/Connect/WalletDropdown/DropdownFooter'
import DropdownHeader from '@/components/Wallet/Connect/WalletDropdown/DropdownHeader'
import Modal from 'components/Modal'
import PropTypes from 'prop-types'
import { Section } from '@/components/Layout/Section'
import Typography from '@mui/material/Typography'
import WalletOptionsList from '@/components/Wallet/Connect/WalletDropdown/WalletOptionsList'
import WalletsList from './WalletConnect/WalletsList'
import signer from '@algodex/algodex-sdk/lib/wallet/signers/MyAlgoConnect'
import styled from '@emotion/styled'
import toast from 'react-hot-toast'
import { useAlgodex } from '@algodex/algodex-hooks'
import { useEventDispatch } from '@/hooks/useEvents'
import useMobileDetect from '@/hooks/useMobileDetect'
import useTranslation from 'next-translate/useTranslation'
import useWallets from '@/hooks/useWallets'

const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.background.dark};
  padding: 0rem 0 1rem;
  @media (max-width: 1024px) {
    // height: 70vh;
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
  const { activeWallet, signedIn, addresses, setActiveWallet } = props
  const { t } = useTranslation('wallet')
  const {
    peraConnector,
    // myAlgoConnector,
    peraConnect,
    peraDisconnect: _peraDisconnect,
    myAlgoDisconnect: _myAlgoDisconnect
  } = useWallets()
  const myAlgoConnector = useRef(null)
  const dispatcher = useEventDispatch()
  const myAlgoDisconnect = (targetWallet) => {
    _myAlgoDisconnect(targetWallet)
  }

  const peraDisconnect = (targetWallet) => {
    _peraDisconnect(targetWallet)
  }

  const walletDisconnectMap = {
    'my-algo-wallet': (wallet) => {
      myAlgoDisconnect(wallet)
    },
    'wallet-connect': (wallet) => peraDisconnect(wallet)
  }

  const isWalletActive = (addr) => {
    return activeWallet?.address === addr
  }

  const isTabbable = (addr) => {
    return isWalletActive(addr) ? -1 : 0
  }

  /**
   * Handle active connector while placing order
   *
   * Ensures the right connector or message is used
   * when wallet change or updates
   */
  const handleConnectionStatus = useCallback(
    (wallet) => {
      if (wallet.type === 'wallet-connect') {
        try {
          console.log(peraConnector.connector, wallet.addr, 'peraConnector.current')
          if (peraConnector.connector.connected) {
            return peraConnector.connector
          }
        } catch (error) {
          console.log(error, 'error while handling pera connection')
          toast.error(
            `Wallet ${wallet.address.substring(
              0,
              6
            )}... has been removed due to the Pera bridge session disconnecting`
          )
          dispatcher('bridge-disconnected', {
            activeWallet: wallet
          })
        }
      } else {
        return myAlgoConnector.current
      }
    },
    [peraConnector]
  )

  const handleWalletClick = async (addr) => {
    const connector = handleConnectionStatus(addr)
    const _addr = {
      ...addr,
      connector
    }
    if (_addr.connector && (_addr.connector._connected || _addr.connector.connected)) {
      !isWalletActive(addr) && setActiveWallet(_addr)
    }
  }

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
        return '/Pera-logo.png'
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
  activeWallet: PropTypes.object,
  signedIn: PropTypes.bool,
  setActiveWallet: PropTypes.func.isRequired,
  area: PropTypes.string,
  setIsConnectingWallet: PropTypes.func,
  addressesRef: PropTypes.object
}

WalletView.defaultProps = {
  signedIn: false
}

export function WalletOptionsListComp(props) {
  const { setIsConnectingWallet, isConnectingWallet, addresses } = props
  const { isConnected } = useAlgodex()
  const { peraConnect, myAlgoConnect } = useWallets()

  const WALLETS_CONNECT_MAP = {
    'my-algo-wallet': myAlgoConnect,
    'pera-connect': () => peraConnect()
  }

  const myAlgoOnClick = () => {
    WALLETS_CONNECT_MAP['my-algo-wallet']()
  }

  const peraConnectOnClick = () => {
    WALLETS_CONNECT_MAP['pera-connect']()
  }

  const isPeraConnected = useMemo(() => {
    if (isConnected) {
      const peraAddr = isConnected && addresses.filter((addr) => addr.type === 'wallet-connect')
      return peraAddr.length > 0
    }
    return false
  }, [isConnected, addresses])

  return (
    <>
      {isConnectingWallet ? (
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
                peraConnectOnClick={() => peraConnectOnClick()}
                isPeraConnected={isPeraConnected}
              />
            </Box>
            <DropdownFooter />
          </ModalContainer>
        </Modal>
      ) : (
        <></>
      )}
    </>
  )
}

WalletOptionsListComp.propTypes = {
  setIsConnectingWallet: PropTypes.func,
  isConnectingWallet: PropTypes.bool,
  addresses: PropTypes.array,
  addressesRef: PropTypes.object
}

/**
 * @todo Merge WalletView into WalletConnect
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function WalletConnect() {
  const { setWallet, isConnected } = useAlgodex()
  const { wallet, addresses } = useWallets()
  // const [addresses, setAddresses] = useContext(WalletsContext)
  const [signedIn, setSignedIn] = useState(isConnected)
  const [isConnectingWallet, setIsConnectingWallet] = useState(false)
  const isMobile = useMobileDetect()
  const addressesRef = useRef(null)
  useMemo(() => {
    setSignedIn(isConnected)
  }, [isConnected])

  return (
    <Box className="flex flex-col justify-center" width="100%">
      {isMobile && (
        <>
          <WalletOptionsListComp
            setIsConnectingWallet={setIsConnectingWallet}
            isConnectingWallet={isConnectingWallet}
            addresses={addresses}
            closeFn={() => setIsConnectingWallet(false)}
            addressesRef={addressesRef}
          />

          <Box mx={2}>
            <Button
              className="w-full flex text-xs font-bold justify-center items-center bg-gray-700 h-8 mt-2 text-white rounded"
              variant="contained"
              sx={{ minHeight: '2.5rem' }}
              onClick={() => setIsConnectingWallet(true)}
            >
              CONNECT {signedIn && addresses && addresses.length > 0 && 'ANOTHER'} WALLET
            </Button>
          </Box>
        </>
      )}
      <WalletView
        addresses={addresses}
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
