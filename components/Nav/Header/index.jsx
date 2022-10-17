// import Button from '@mui/material/Button'
// import FormControl from '@mui/material/FormControl'
import { Button, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material'
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
import { useCallback, useState } from 'react'

import Hamburger from 'components/Button/Hamburger'
import LanguageSelection from 'components/Nav/LanguageSelection'
import Link from 'next/link'
// import MenuItem from '@mui/material/MenuItem'
import NavActiveLink from 'components/Nav/ActiveLink'
import PropTypes from 'prop-types'
// import Select from '@mui/material/Select'
import WalletConnectDropdown from 'components/Wallet/Connect/WalletDropdown'
import { getActiveNetwork } from 'services/environment'
import { truncatedWalletAddress } from 'components/helpers'
import { useEvent } from 'hooks/useEvents'
import useMobileDetect from '@/hooks/useMobileDetect'
import useTranslation from 'next-translate/useTranslation'
import useWallets from '@/hooks/useWallets'

const ENABLE_NETWORK_SELECTION =
  process.env.NEXT_PUBLIC_TESTNET_LINK && process.env.NEXT_PUBLIC_MAINNET_LINK
const MAINNET_LINK = process.env.NEXT_PUBLIC_MAINNET_LINK
const TESTNET_LINK = process.env.NEXT_PUBLIC_TESTNET_LINK

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
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Link href="/trade">
          <a>
            <InlineLogo src="/logo-inline-dark.svg" />
            <IconLogo src="/logo-icon-dark.svg" />
          </a>
        </Link>
        &nbsp;
        <FormControl className='ml-4 sm:ml-4 md:ml-6 lg:ml-12' sx={{ minWidth: 100 }} size="small">
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
      </Stack>
      {!isMobile &&
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
          {/* {!isMobile && ( */}
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
          {/* )} */}
          {openWalletConnectDropdown && (
            <WalletConnectDropdown closeDropdown={() => setOpenWalletConnectDropdown(false)} />
          )}
          <LanguageSelection isMobile={isMobile} />
        </Navigation>
      }
      {isMobile && <Stack direction="row" alignItems="center" justifyContent="center">
        {/* <LanguageSelection isMobile={false} /> */}
          <LanguageSelection isMobile={isMobile} />
          <Hamburger className="ml-4" onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
        </Stack>
      }
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
          <NavActiveLink target="_blank" href="/about.algodex.com/support/" rel="noreferrer">
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
  )
}

Header.propTypes = {
  router: PropTypes.object
}

export default Header



