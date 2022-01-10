import {
  ConnectWalletBtn,
  Container,
  IconLogo,
  InlineLogo,
  MobileNavContainer,
  MobileNavigation,
  NavTextLg,
  NavTextSm,
  Navigation,
  NetworkDropdown
} from './header.css'
import { useCallback, useState } from 'react'

import ActiveLink from 'components/active-link'
import DropdownWrapper from 'components/dropdown'
import Hamburger from 'components/hamburger'
import LanguageSelection from 'components/language-selection'
import Link from 'next/link'
import PropTypes from 'prop-types'
import WalletConnectDropdown from 'components/wallet-connect-dropdown'
import { useStorePersisted } from 'store/use-store'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from 'store/use-user-state'
import { withRouter } from 'next/router'

export function Header({ router }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isWalletConnectDropDownVisible, setIsWalletConnectDropDownVisible] = useState(false)
  const activeNetwork = useUserStore((state) => state.activeNetwork)
  const allAddresses = useStorePersisted((state) => state.allAddresses)
  const { t } = useTranslation('common')
  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)


  /**
   * Route to other network
   * @type {(function(*): void)|*}
   */
  const handleNetworkChangeFn = useCallback(
    (value) => {
      if (activeNetwork !== value) {
        // This can also be window.location =
        router.push(window.location.href.replace(activeNetwork, value))
      }
    },
    [router, activeNetwork]
  )

  const renderWalletConnectDropdown = () => {
    return (
      <DropdownWrapper>
        <WalletConnectDropdown
          activeWalletAddress={activeWalletAddress}
          closeFn={() => setIsWalletConnectDropDownVisible(false)}
          allAddresses={allAddresses}
        />
      </DropdownWrapper>
    )
  }

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
        className="font-medium"
        value={activeNetwork}
        onChange={(e) => handleNetworkChangeFn(e.target.value)}
      >
        <option value="testnet">TESTNET</option>
        <option disabled value="mainnet">
          MAINNET
        </option>
      </NetworkDropdown>
      <Navigation>
        <ActiveLink href="/about" matches={/^\/about/}>
          <NavTextLg>{t('header-about')}</NavTextLg>
        </ActiveLink>
        {/*<a target="_blank" href="//about.algodex.com" rel="noreferrer">*/}
        {/*  <NavTextLg>{t('header-about')}</NavTextLg>*/}
        {/*</a>*/}
        <ActiveLink href="/trade" matches={/^\/trade/}>
          <NavTextLg>{t('header-trade')}</NavTextLg>
        </ActiveLink>
        <ActiveLink href="/docs" matches={/^\/docs/}>
          <NavTextLg>{t('header-docs')}</NavTextLg>
        </ActiveLink>
        {/*<a*/}
        {/*  target="_blank"*/}
        {/*  href="//about.algodex.com/docs/trading-algorand-standard-assets-testnet/"*/}
        {/*  rel="noreferrer"*/}
        {/*>*/}
        {/*  <NavTextLg>{t('header-docs')}</NavTextLg>*/}
        {/*</a>*/}
        <ActiveLink href="/support" matches={/^\/support/}>
          <NavTextLg>{t('header-support')}</NavTextLg>
        </ActiveLink>
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
        <div>
          <ConnectWalletBtn onClick={() => setIsWalletConnectDropDownVisible(!isWalletConnectDropDownVisible)}>
            { activeWalletAddress ? `${activeWalletAddress.substring(0, 4)}....${activeWalletAddress.substring(activeWalletAddress.length - 4, activeWalletAddress.length)}` : 'CONNECT A WALLET' }
          </ConnectWalletBtn>
          {isWalletConnectDropDownVisible && renderWalletConnectDropdown()}
        </div>
        <LanguageSelection isMobile={false} />
        <LanguageSelection isMobile={true} /> &nbsp;&nbsp;&nbsp;
        <Hamburger onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      </Navigation>
      <MobileNavigation isOpen={isOpen}>
        <MobileNavContainer>
          <ActiveLink href="/trade" matches={/^\/trade/}>
            <NavTextSm>Trade</NavTextSm>
          </ActiveLink>
          <a
            target="_blank"
            href="//about.algodex.com/docs/trading-algorand-standard-assets-testnet/"
            rel="noreferrer"
          >
            <NavTextSm>Docs</NavTextSm>
          </a>
          <a target="_blank" href="//about.algodex.com/support/" rel="noreferrer">
            <NavTextSm>Support</NavTextSm>
          </a>
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

export default withRouter(Header)
