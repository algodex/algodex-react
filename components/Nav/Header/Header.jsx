import NavActiveLink from '@/components/Nav/ActiveLink'
import { NavTextLg, NavTextSm } from '@/components/Nav/Typography'
import Hamburger from '@/components/Button/Hamburger'
import LanguageSelection from '@/components/Nav/LanguageSelection'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from '@/store/use-user-state'
import styled from '@emotion/styled'
import { ReactSVG } from 'react-svg'

const ENABLE_NETWORK_SELECTION =
  process.env.NEXT_PUBLIC_TESTNET_LINK && process.env.NEXT_PUBLIC_MAINNET_LINK
const MAINNET_LINK = process.env.NEXT_PUBLIC_MAINNET_LINK
const TESTNET_LINK = process.env.NEXT_PUBLIC_TESTNET_LINK

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[800]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
  padding: 1rem;
  margin: 0;
  // display: none;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  z-index: 99;

  @media (min-width: 1024px) {
    display: flex;
    padding: 2rem;
  }
`

const MobileNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 30%;
  margin: auto;

  @media (min-width: 768px) {
    height: 15%;
  }
`

const MobileNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  top: 103%;
  left: 0;
  height: calc(100vh - 65.16px);
  flex: 1 1 0%;
  position: absolute;
  width: 100%;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
  background-color: ${({ theme }) => theme.colors.gray[800]};
  z-index: 10;

  @media (min-width: 1024px) {
    display: none;
  }
`
const Navigation = styled.nav`
  display: flex;
  justify-content: flex-end;
  width: 75%;
  align-items: center;
`

const InlineLogo = styled(ReactSVG)`
  height: auto;
  width: 10rem;
  display: none;
  @media (min-width: 1024px) {
    display: block;
  }
`
const IconLogo = styled(ReactSVG)`
  height: auto;
  width: 1.7rem;
  @media (min-width: 1024px) {
    display: none;
  }
`

const NetworkDropdown = styled.select`
  background: unset;
  border: solid 2px
    ${({ theme, value }) =>
      value == 'mainnet' ? theme.colors.blue['500'] : theme.colors.green['500']};
  color: ${({ theme, value }) =>
    value == 'mainnet' ? theme.colors.blue['500'] : theme.colors.green['500']};
  border-radius: 3px;
  padding: 0.3rem 0.5rem;
`

const NetworkDropdownOption = styled.option`
  color: ${({ enableLinks }) => (enableLinks ? 'black' : '#AAA')};
`

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const activeNetwork = useUserStore((state) => state.activeNetwork)
  const { t } = useTranslation('common')

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
        className="font-medium"
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
      <MobileNavigation data-testid="mobile-nav-element" isOpen={isOpen}>
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

export default Header
