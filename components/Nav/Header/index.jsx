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

import {
  Container,
  IconLogo,
  InlineLogo,
  MobileNavContainer,
  MobileNavigation,
  NavTextLg,
  NavTextSm,
  Navigation,
  NetworkDropdown,
  NetworkDropdownOption
} from './header.css'
import { color, fontSize } from 'styled-system'

import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Hamburger from 'components/Button/Hamburger'
import LanguageSelection from 'components/Nav/LanguageSelection'
import Link from 'next/link'
import MenuItem from '@mui/material/MenuItem'
import NavActiveLink from 'components/Nav/ActiveLink'
import NavLink from '@/components/Nav/Link'
import PropTypes from 'prop-types'
import Select from '@mui/material/Select'
import { Typography } from '@mui/material'
import WalletConnectDropdown from 'components/Wallet/Connect/WalletDropdown'
import { truncatedWalletAddress } from 'components/helpers'
import { useEvent } from 'hooks/useEvents'
import useMobileDetect from '@/hooks/useMobileDetect'
import { useState, useCallback } from 'react'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from 'store/use-user-state'
import useWallets from '@/hooks/useWallets'
import { getActiveNetwork } from 'services/environment'

const ENABLE_NETWORK_SELECTION =
  process.env.NEXT_PUBLIC_TESTNET_LINK && process.env.NEXT_PUBLIC_MAINNET_LINK
const MAINNET_LINK = process.env.NEXT_PUBLIC_MAINNET_LINK
const TESTNET_LINK = process.env.NEXT_PUBLIC_TESTNET_LINK

const NavTextLgSec = ({children, fontSize, color, isActive, border}) => {
  return <Typography
    variant="subtitle_medium_bold"
    sx={{
      // display: 'none',
      // justifyContent: 'center',
      // alignItems: 'center',
      textAlign: 'center',
      textTransform: 'uppercase',
      // letterSpacing: '0.2rem',
      // fontWeight: '600',
      // fontSize: `${fontSize}`,
      color: 'gray.500',
      // color: `${color}`,
      cursor: 'pointer',
      transition: 'color 0.1s ease-in',
      '&:hover': {
        color: 'gray.100',
      },
      '& > a': {
        color: 'gray.100',
        padding: '1rem 0',
    
        textDecoration: 'none',
        borderBottom: 
          `${isActive && border ? '6px inset green.500' : '6px inset transparent'}`,
    
        '&:hover': {
          color: 'gray.100',
        },
    
        '&:active': {
          color: 'gray.100',
        },
    
        '@media (min-width: 1024px)': {
          color: `${isActive ? 'gray.100' : 'gray.500'}`
        }
      },
      '@media (min-width: 1024px)': {
        // color: theme.palette.gray[500]};
        display: 'flex',
        margin: '0 15px'
      }
    }}
  >
    {children}
  </Typography>
}

NavTextLgSec.propTypes = {
  // router: PropTypes.object
  text: PropTypes.string,
  fontSize: PropTypes.string,
  color: PropTypes.string,
  isActive: PropTypes.bool,
  border: PropTypes.string,
  children: PropTypes.string
}
export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [openWalletConnectDropdown, setOpenWalletConnectDropdown] = useState(false)
  const { t } = useTranslation('common')
  const activeNetwork = getActiveNetwork()

  const { wallet } = useWallets()
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
    <Container className="flex" data-testid="header-container">
      <Link href="/trade">
        <a>
          <InlineLogo src="/logo-inline-dark.svg" />
          <IconLogo src="/logo-icon-dark.svg" />
        </a>
      </Link>
      &nbsp;
      {/* <NetworkDropdown
        data-testid="header-network-dropdown-element"
        className="font-bold"
        value={activeNetwork}
        onChange={(e) => handleNetworkChangeFn(e.target.value)}
      >
        <NetworkDropdownOption value="testnet" enableLinks={ENABLE_NETWORK_SELECTION}>
          TESTNET
        </NetworkDropdownOption>
        <NetworkDropdownOption value="mainnet" enableLinks={ENABLE_NETWORK_SELECTION}>
          MAINNET
        </NetworkDropdownOption>
      </NetworkDropdown> */}
      <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
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
          <MenuItem
            sx={{
              color: ENABLE_NETWORK_SELECTION ? 'black' : '#AAA'
            }}
            value="testnet"
          >
            TESTNET
          </MenuItem>
          <MenuItem
            sx={{
              color: ENABLE_NETWORK_SELECTION ? 'black' : '#AAA'
            }}
            value="mainnet"
          >
            MAINNET
          </MenuItem>
        </Select>
      </FormControl>
      <Navigation data-testid="header-navigation-element">
        <NavLink href="/about" matches={/^\/about/}>
          <NavTextLg>{t('header-about')}</NavTextLg>
        </NavLink>
        {/*<a target="_blank" href="//about.algodex.com" rel="noreferrer">*/}
        {/*  <NavTextLg>{t('header-about')}</NavTextLg>*/}
        {/*</a>*/}
        <NavLink href="/trade" matches={/^\/trade/}>
          <NavTextLg>{t('header-trade')}</NavTextLg>
        </NavLink>
        {/* <NavActiveLink href="/docs" matches={/^\/docs/}>
          <NavTextLg>{t('header-docs')}</NavTextLg>
        </NavActiveLink> */}
        <NavLink href="https://docs.algodex.com/">
          <NavTextLg>{t('header-docs')}</NavTextLg>
        </NavLink>
        {/*<a*/}
        {/*  target="_blank"*/}
        {/*  href="//about.algodex.com/docs/trading-algorand-standard-assets-testnet/"*/}
        {/*  rel="noreferrer"*/}
        {/*>*/}
        {/*  <NavTextLg>{t('header-docs')}</NavTextLg>*/}
        {/*</a>*/}
        <NavLink href="/support" matches={/^\/support/}>
          <NavTextLg>{t('header-support')}</NavTextLg>
        </NavLink>
        {/* <NavLink href={MAILBOX_URL}>
          <NavTextLg>{t('header-mailbox')}</NavTextLg>
        </NavLink> */}
        <NavLink href="https://rewards.algodex.com/">
          <NavTextLg>{t('header-rewards')}</NavTextLg>
        </NavLink>
        {/*<a target="_blank" href="//about.algodex.com/support/" rel="noreferrer">*/}
        {/*  <NavTextLg>{t('header-support')}</NavTextLg>*/}
        {/*</a>*/}
        {/*
        <ActiveLink href="/wallet">
          <NavTextLg>Wallet</NavTextLg>
        </ActiveLink>
        <ActiveLink href="/support">
          <NavTextLg>Support</NavTextLg>
        </ActiveLink>
        */}
        {/* <NavIcon color="gray.500">
          <Bell />
        </NavIcon>
        <NavIcon color="gray.500">
          <User />
        </NavIcon>
        <NavTextLg onClick={async () => await setLanguage("en")}>
        </NavIcon> */}
        {!isMobile && (
          <Button
            onClick={() => {
              setOpenWalletConnectDropdown(!openWalletConnectDropdown)
            }}
            className="font-semibold hover:font-bold text-white border-white hover:border-white"
            variant="outlined"
          >
            {wallet && wallet?.connector?.connected && wallet?.address
              ? `${truncatedWalletAddress(wallet.address, 5)}`
              : 'CONNECT A WALLET'}
          </Button>
        )}
        {!isMobile && openWalletConnectDropdown && (
          <WalletConnectDropdown closeDropdown={() => setOpenWalletConnectDropdown(false)} />
        )}
        <LanguageSelection isMobile={false} />
        <LanguageSelection isMobile={true} /> &nbsp;&nbsp;&nbsp;
        <Hamburger onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      </Navigation>
      <MobileNavigation data-testid="mobile-nav-element" isOpen={isOpen}>
        <MobileNavContainer>
          <NavActiveLink href="/trade" matches={/^\/trade/}>
            <NavTextSm>Trade</NavTextSm>
          </NavActiveLink>
          <NavActiveLink target="_blank" href="https://docs.algodex.com/" rel="noreferrer">
            <NavTextSm>Docs</NavTextSm>
          </NavActiveLink>
          <NavActiveLink target="_blank" href="/about.algodex.com/support/" rel="noreferrer">
            <NavTextSm>Support</NavTextSm>
          </NavActiveLink>
          <NavActiveLink target="_blank" href={MAILBOX_URL} rel="noreferrer">
            <NavTextSm>Mailbox</NavTextSm>
          </NavActiveLink>
          <NavActiveLink target="_blank" href="https://rewards.algodex.com/" rel="noreferrer">
            <NavTextSm>Rewards</NavTextSm>
          </NavActiveLink>
          {/*
          <ActiveLink href="/wallet">
            <NavTextSm>Wallet</NavTextSm>
          </ActiveLink>
          <ActiveLink href="/support">
            <NavTextSm>Support</NavTextSm>
          </ActiveLink>
          */}
        </MobileNavContainer>
      </MobileNavigation>
    </Container>
  )
}

Header.propTypes = {
  router: PropTypes.object
}

export default Header
