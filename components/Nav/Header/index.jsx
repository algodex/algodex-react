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

import { Box, Button, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material'
import {
  Container,
  IconLogo,
  InlineLogo,
  MobileNavContainer,
  MobileNavigation,
  NavTextLgWrapper,
  NavTextSmWrapper,
  Navigation
} from './header.css'
import Hamburger from 'components/Button/Hamburger'
import LanguageSelection from 'components/Nav/LanguageSelection'
import Link from 'next/link'
import { getWalletLogo } from '../../helpers'

// import MenuItem from '@mui/material/MenuItem'
import NavActiveLink from 'components/Nav/ActiveLink'
import PropTypes from 'prop-types'
// import Select from '@mui/material/Select'
import WalletConnectDropdown from 'components/Wallet/Connect/WalletDropdown'
import { getActiveNetwork } from 'services/environment'
import { truncatedWalletAddress } from 'components/helpers'
import { useEvent } from 'hooks/useEvents'
// import useMobileDetect from '@/hooks/useMobileDetect'
// import useTranslation from 'next-translate/useTranslation'
import useWallets from '@/hooks/useWallets'
// import { useAlgodex } from '@algodex/algodex-hooks'
import useMobileDetect from '@/hooks/useMobileDetect'
import { useState, useContext, useCallback, useRef, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from 'store/use-user-state'
import { WalletReducerContext } from 'hooks/WalletsReducerProvider'
import useMyAlgoConnector from 'hooks/useMyAlgoConnector'
import { PeraWalletConnect } from '@perawallet/connect'
import useWalletConnect from 'hooks/useWalletConnect'

import { peraSigner } from 'hooks/usePeraConnection'
// import useWallets from '@/hooks/useWallets'
import Image from 'next/image'
//use-wallet txnlab TEST
import { useWallet } from '@txnlab/use-wallet'
//
const ENABLE_NETWORK_SELECTION =
  process.env.NEXT_PUBLIC_TESTNET_LINK && process.env.NEXT_PUBLIC_MAINNET_LINK
const MAINNET_LINK = process.env.NEXT_PUBLIC_MAINNET_LINK
const TESTNET_LINK = process.env.NEXT_PUBLIC_TESTNET_LINK

const peraWalletRehydate = new PeraWalletConnect()

export function Header() {
  //use-walelt txnlab TEST
  const { providers, activeAccount } = useWallet()
  //
  const [isOpen, setIsOpen] = useState(false)
  const [openWalletConnectDropdown, setOpenWalletConnectDropdown] = useState(false)
  const { t } = useTranslation('common')
  const activeNetwork = getActiveNetwork()

  const {
    setMyAlgoAddresses,
    setAddressesNew,
    setActiveWallet,
    peraWallet,
    walletConnect,
    setPeraWallet,
    setWalletConnect,
    activeWallet: wallet
  } = useContext(WalletReducerContext)
  // const { myAlgoConnector, peraConnector } = useWallets()
  // const { peraConnector } = useWallets()
  const myAlgoConnector = useMyAlgoConnector()
  const { connector } = useWalletConnect()

  useEffect(() => {
    const _myAlgoAddresses = JSON.parse(localStorage.getItem('myAlgoAddresses'))
    const _peraWallet = JSON.parse(localStorage.getItem('peraWallet'))
    const _walletconnectGeneral = JSON.parse(localStorage.getItem('walletConnectWallet'))

    if (_peraWallet?.type === 'wallet-connect' && peraWallet === null) {
      peraWalletRehydate.reconnectSession().then((accounts) => {
        // Setup the disconnect event listener
        // peraWallet.connector?.on("disconnect", handleDisconnectWalletClick)})
        const _rehyrdratedPeraWallet = {
          ..._peraWallet,
          connector: { ..._rehyrdratedPeraWallet, connected: true, sign: peraSigner }
        }
        setPeraWallet(_rehyrdratedPeraWallet)
        setAddressesNew({ type: 'peraWallet', addresses: [_rehyrdratedPeraWallet] })
        setActiveWallet(_rehyrdratedPeraWallet)
        console.log(accounts)
      })
    }

    if (
      _walletconnectGeneral?.type === 'wallet-connect-general' &&
      walletConnect === null &&
      typeof connector.current !== 'undefined'
    ) {
      const _rehyrdratedWalletconnectWallet = {
        ..._walletconnectGeneral,
        connector: connector.current
      }
      setWalletConnect(_rehyrdratedWalletconnectWallet)
      setAddressesNew({ type: 'walletConnect', addresses: [_rehyrdratedWalletconnectWallet] })
      setActiveWallet(_rehyrdratedWalletconnectWallet)
      // walletconnectConnect()
    }

    if (
      Array.isArray(_myAlgoAddresses) &&
      _myAlgoAddresses.length > 0 &&
      myAlgoConnector !== null
    ) {
      myAlgoConnector.connected = true
      const _rehydratedMyAlgo = _myAlgoAddresses.map((addrObj) => {
        return { ...addrObj, connector: myAlgoConnector }
      })
      setMyAlgoAddresses(_rehydratedMyAlgo)
      setAddressesNew({ type: 'myAlgo', addresses: _rehydratedMyAlgo })
      setActiveWallet(_rehydratedMyAlgo[0])
    }
  }, [myAlgoConnector, connector])

  const isMobile = useMobileDetect()

  useEvent('connecting-wallet', (data) => {
    if (data.isOpen === false) {
      setOpenWalletConnectDropdown(false)
    }
  })

  /**
   * Route to other network
   * @type {(function(*): void)|*}
   */
  const handleNetworkChangeFn = useCallback((value) => {
    if (!ENABLE_NETWORK_SELECTION) {
      return
    }
    if (value === 'mainnet') {
      window.location = MAINNET_LINK
    } else {
      window.location = TESTNET_LINK
    }
  }, [])

  const MAILBOX_URL =
    activeNetwork === 'testnet'
      ? 'https://mailbox-testnet.algodex.com/'
      : 'https://mailbox.algodex.com/'

  return (
    <>
      <Container className="flex" data-testid="header-container">
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Link href="/trade">
            <a>
              <InlineLogo src="/logo-inline-dark.svg" />
              <IconLogo src="/logo-icon-dark.svg" />
            </a>
          </Link>
          &nbsp;
          <FormControl className="ml-2 sm:ml-2 md:ml-4 lg:ml-6" sx={{ minWidth: 100 }} size="small">
            <Select
              variant="filled"
              data-testid="header-network-dropdown-element"
              labelId="demo-select-small"
              id="demo-select-small"
              value={activeNetwork}
              onChange={(e) => handleNetworkChangeFn(e.target.value)}
              sx={{
                color: activeNetwork == 'mainnet' ? 'blue.500' : 'green.500',
                borderRadius: '3px',
                border: 0,
                outline: '2px solid',
                '& .MuiSelect-icon': {
                  fill: `${activeNetwork == 'mainnet' ? 'blue.500' : 'green.500'} !important`,
                  color: `unset !important`
                }
              }}
              inputProps={{
                sx: {
                  padding: '0.1rem 0.4rem',
                  fontSize: '14px',
                  fontWeight: 'bolder'
                }
              }}
            >
              <MenuItem value="testnet" sx={{ color: 'gray.300' }}>
                TESTNET
              </MenuItem>
              <MenuItem sx={{ color: 'gray.300' }} value="mainnet">
                MAINNET
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {!isMobile && (
          <Navigation data-testid="header-navigation-element">
            <NavActiveLink href="/about" matches={/^\/about/}>
              <NavTextLgWrapper isMobile={isMobile}>
                <Typography variant="navText">{t('header-about')}</Typography>
              </NavTextLgWrapper>
            </NavActiveLink>
            <NavActiveLink href="/trade" matches={/^\/trade/}>
              <NavTextLgWrapper isMobile={isMobile}>
                <Typography variant="navText">{t('header-trade')}</Typography>
              </NavTextLgWrapper>
            </NavActiveLink>
            <NavActiveLink href="https://docs.algodex.com/">
              <NavTextLgWrapper isMobile={isMobile}>
                <Typography variant="navText">{t('header-docs')}</Typography>
              </NavTextLgWrapper>
            </NavActiveLink>
            <NavActiveLink href="/support" matches={/^\/support/}>
              <NavTextLgWrapper isMobile={isMobile}>
                <Typography variant="navText">{t('header-support')}</Typography>
              </NavTextLgWrapper>
            </NavActiveLink>
            <NavActiveLink href={MAILBOX_URL}>
              <NavTextLgWrapper isMobile={isMobile}>
                <Typography variant="navText">{t('header-mailbox')}</Typography>
              </NavTextLgWrapper>
            </NavActiveLink>
            <NavActiveLink href="https://rewards.algodex.com/">
              <NavTextLgWrapper isMobile={isMobile}>
                <Typography variant="navText">{t('header-rewards')}</Typography>
              </NavTextLgWrapper>
            </NavActiveLink>

            <Button
              onClick={() => {
                setOpenWalletConnectDropdown(!openWalletConnectDropdown)
              }}
              sx={{ minWidth: '4rem' }}
              className="md:text-xs sm:text-xs lg:text-md font-semibold hover:font-bold text-white border-white hover:border-white"
              variant="outlined"
            >
              {wallet ? (
                <>
                  <Image
                    src={getWalletLogo(wallet)}
                    alt="Algorand Wallet Client Image"
                    style={{ borderRadius: '100%' }}
                    width={15}
                    height={15}
                  />
                  &nbsp;
                  {`${truncatedWalletAddress(wallet.address, 6)}`}
                </>
              ) : (
                'CONNECT A WALLET'
              )}
            </Button>
            {openWalletConnectDropdown && (
              <WalletConnectDropdown
                setOpenWalletConnectDropdown={setOpenWalletConnectDropdown}
                openWalletConnectDropdown={openWalletConnectDropdown}
                closeDropdown={() => setOpenWalletConnectDropdown(false)}
              />
            )}
            <LanguageSelection isMobile={isMobile} />
          </Navigation>
        )}
        {isMobile && (
          <Stack direction="row" alignItems="center" justifyContent="center">
            <LanguageSelection isMobile={isMobile} />
            <Hamburger className="ml-4" onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
          </Stack>
        )}
        <MobileNavigation data-testid="mobile-nav-element" isOpen={isOpen}>
          <MobileNavContainer>
            <NavActiveLink href="/trade" matches={/^\/trade/}>
              <NavTextSmWrapper isMobile={isMobile}>
                <Typography variant="navText">Trade</Typography>
              </NavTextSmWrapper>
            </NavActiveLink>
            <NavActiveLink target="_blank" href="https://docs.algodex.com/" rel="noreferrer">
              <NavTextSmWrapper isMobile={isMobile}>
                <Typography variant="navText">Docs</Typography>
              </NavTextSmWrapper>
            </NavActiveLink>
            <NavActiveLink target="_blank" href="/support" rel="noreferrer">
              <NavTextSmWrapper isMobile={isMobile}>
                <Typography variant="navText">Support</Typography>
              </NavTextSmWrapper>
            </NavActiveLink>
            <NavActiveLink target="_blank" href={MAILBOX_URL} rel="noreferrer">
              <NavTextSmWrapper isMobile={isMobile}>
                <Typography variant="navText">Mailbox</Typography>
              </NavTextSmWrapper>
            </NavActiveLink>
            <NavActiveLink target="_blank" href="https://rewards.algodex.com/" rel="noreferrer">
              <NavTextSmWrapper isMobile={isMobile}>
                <Typography variant="navText">Rewards</Typography>
              </NavTextSmWrapper>
            </NavActiveLink>
          </MobileNavContainer>
        </MobileNavigation>
      </Container>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-2">
        <div>
          {providers?.map((provider) => (
            <div key={provider.metadata.id}>
              <h4>
                <img
                  width={30}
                  height={30}
                  alt={`${provider.metadata.name} icon`}
                  src={provider.metadata.icon}
                />
                {provider.metadata.name} {provider.isActive && '[active]'}
              </h4>

              <div>
                <button type="button" onClick={provider.connect} disabled={provider.isConnected}>
                  Connect
                </button>
                <button
                  type="button"
                  onClick={provider.disconnect}
                  disabled={!provider.isConnected}
                >
                  Disconnect
                </button>
                <button
                  type="button"
                  onClick={provider.setActiveProvider}
                  disabled={!provider.isConnected || provider.isActive}
                >
                  Set Active
                </button>

                <div>
                  {provider.isActive && provider.accounts.length && (
                    <select
                      value={activeAccount?.address}
                      onChange={(e) => provider.setActiveAccount(e.target.value)}
                    >
                      {provider.accounts.map((account) => (
                        <option key={account.address} value={account.address}>
                          {account.address}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </nav>
    </>
  )
}

Header.propTypes = {
  router: PropTypes.object
}

export default Header
