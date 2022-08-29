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

import Button from '@mui/material/Button'
import Hamburger from 'components/Button/Hamburger'
import LanguageSelection from 'components/Nav/LanguageSelection'
import Link from 'next/link'
import NavActiveLink from 'components/Nav/ActiveLink'
import PropTypes from 'prop-types'
import WalletConnectDropdown from 'components/Wallet/Connect/WalletDropdown'
import { truncatedWalletAddress } from 'components/helpers'
import useMobileDetect from '@/hooks/useMobileDetect'
import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from 'store/use-user-state'
import useWallets from '@/hooks/useWallets'

const ENABLE_NETWORK_SELECTION =
  process.env.NEXT_PUBLIC_TESTNET_LINK && process.env.NEXT_PUBLIC_MAINNET_LINK
const MAINNET_LINK = process.env.NEXT_PUBLIC_MAINNET_LINK
const TESTNET_LINK = process.env.NEXT_PUBLIC_TESTNET_LINK

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [openWalletConnectDropdown, setOpenWalletConnectDropdown] = useState(false)
  const activeNetwork = useUserStore((state) => state.activeNetwork)
  const { t } = useTranslation('common')
  // const { wallet } = useAlgodex()
  const wallet = useWallets()
  // console.log(addresses, 'addresses updated')
  const isMobile = useMobileDetect()

  /**
   * Route to other network
   * @type {(function(*): void)|*}
   */
  const handleNetworkChangeFn = (value) => {
    if (!ENABLE_NETWORK_SELECTION) {
      return
    }
    if (value === 'mainnet') {
      window.location = MAINNET_LINK
    } else {
      window.location = TESTNET_LINK
    }
  }

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
      <NetworkDropdown
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
      </NetworkDropdown>
      <Navigation data-testid="header-navigation-element">
        <NavActiveLink href="/about" matches={/^\/about/}>
          <NavTextLg>{t('header-about')}</NavTextLg>
        </NavActiveLink>
        {/*<a target="_blank" href="//about.algodex.com" rel="noreferrer">*/}
        {/*  <NavTextLg>{t('header-about')}</NavTextLg>*/}
        {/*</a>*/}
        <NavActiveLink href="/trade" matches={/^\/trade/}>
          <NavTextLg>{t('header-trade')}</NavTextLg>
        </NavActiveLink>
        {/* <NavActiveLink href="/docs" matches={/^\/docs/}>
          <NavTextLg>{t('header-docs')}</NavTextLg>
        </NavActiveLink> */}
        <NavActiveLink href="https://docs.algodex.com/">
          <NavTextLg>{t('header-docs')}</NavTextLg>
        </NavActiveLink>
        {/*<a*/}
        {/*  target="_blank"*/}
        {/*  href="//about.algodex.com/docs/trading-algorand-standard-assets-testnet/"*/}
        {/*  rel="noreferrer"*/}
        {/*>*/}
        {/*  <NavTextLg>{t('header-docs')}</NavTextLg>*/}
        {/*</a>*/}
        <NavActiveLink href="/support" matches={/^\/support/}>
          <NavTextLg>{t('header-support')}</NavTextLg>
        </NavActiveLink>
        <NavActiveLink href={MAILBOX_URL}>
          <NavTextLg>{t('header-mailbox')}</NavTextLg>
        </NavActiveLink>
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
            onClick={() => setOpenWalletConnectDropdown(!openWalletConnectDropdown)}
            className="font-semibold hover:font-bold text-white border-white hover:border-white"
            variant="outlined"
          >
            {wallet && wallet?.address
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
          <NavActiveLink target="_blank" href="//about.algodex.com/support/" rel="noreferrer">
            <NavTextSm>Support</NavTextSm>
          </NavActiveLink>
          <NavActiveLink target="_blank" href={MAILBOX_URL} rel="noreferrer">
            <NavTextSm>Mailbox</NavTextSm>
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
