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
import { useEffect, useState } from 'react'

import ActiveLink from 'components/active-link'
// import AssetSearch from "../asset-search";
/* eslint-disable */
import Hamburger from 'components/hamburger'
import LanguageSelection from 'components/language-selection'
import Link from 'next/link'
import _ from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from 'store/use-user-state'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [networkUpdate, setNetworkUpdate] = useState(null)
  const setActiveNetwork = useUserStore((state) => state.setActiveNetwork)
  const activeNetwork = useUserStore((state) => state.activeNetwork)
  
  
  const { t } = useTranslation('common')

  const handleNetworkChangeFn = (value) => {
    setNetworkUpdate(value)
  }

  useEffect(() => {
    networkUpdate == "mainnet" ? setActiveNetwork("mainnet") : setActiveNetwork("testnet")
  }, [networkUpdate])

  return (
    <Container className="flex" data-testid="header-container">
      <Link href="/trade">
        <a>
          <InlineLogo src="/logo-inline-dark.svg" />
          <IconLogo src="/logo-icon-dark.svg" />
        </a>
      </Link>
      &nbsp;
      <NetworkDropdown className="font-medium" activeNetwork={activeNetwork} onChange={(e) => handleNetworkChangeFn(e.target.value)}>
        <option value="mainnet" selected={activeNetwork === "mainnet"}>MAINNET</option>
        <option value="testnet" selected={activeNetwork === "testnet"}>TESTNET</option>
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
