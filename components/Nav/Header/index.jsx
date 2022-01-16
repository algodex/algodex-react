import {
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

import NavActiveLink from 'components/Nav/ActiveLink'
import Hamburger from 'components/hamburger'
import LanguageSelection from 'components/language-selection'
import Link from 'next/link'
import PropTypes from 'prop-types'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from 'store/use-user-state'
import { withRouter } from 'next/router'

export function Header({ router }) {
  const [isOpen, setIsOpen] = useState(false)
  const activeNetwork = useUserStore((state) => state.activeNetwork)
  const { t } = useTranslation('common')

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
        <NavActiveLink href="/about" matches={/^\/about/}>
          <NavTextLg>{t('header-about')}</NavTextLg>
        </NavActiveLink>
        {/*<a target="_blank" href="//about.algodex.com" rel="noreferrer">*/}
        {/*  <NavTextLg>{t('header-about')}</NavTextLg>*/}
        {/*</a>*/}
        <NavActiveLink href="/trade" matches={/^\/trade/}>
          <NavTextLg>{t('header-trade')}</NavTextLg>
        </NavActiveLink>
        <NavActiveLink href="/docs" matches={/^\/docs/}>
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
        <LanguageSelection isMobile={false} />
        <LanguageSelection isMobile={true} /> &nbsp;&nbsp;&nbsp;
        <Hamburger onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      </Navigation>
      <MobileNavigation isOpen={isOpen}>
        <MobileNavContainer>
          <NavActiveLink href="/trade" matches={/^\/trade/}>
            <NavTextSm>Trade</NavTextSm>
          </NavActiveLink>
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
