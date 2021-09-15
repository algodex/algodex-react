import Hamburger from 'components/hamburger'
import Link from 'next/link'
import { useState } from 'react'
import { Bell, User } from 'react-feather'
import ActiveLink from 'components/active-link'
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";

import {
  Container,
  IconLogo,
  InlineLogo,
  Navigation,
  NavTextLg,
  NavTextSm,
  NavIcon,
  Flag,
  MobileNavigation,
  MobileNavContainer
} from './header.css'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { t, lang } = useTranslation("common");

  return (
    <Container data-testid="header-container">
      <Link href="/">
        <a>
          <InlineLogo src="/logo-inline-dark.svg" />
          <IconLogo src="/logo-icon-dark.svg" />
        </a>
      </Link>
      <Navigation>
        <a
          target="_blank"
          href="//about.algodex.com"
        >
        <NavTextLg>{t("header-about")}</NavTextLg>
        </a>
        <ActiveLink href="/trade" matches={/^\/trade/}>
          <NavTextLg>{t("header-trade")}</NavTextLg>
        </ActiveLink>
        <a
          target="_blank"
          href="//about.algodex.com/docs/trading-algorand-standard-assets-testnet/"
        >
          <NavTextLg>{t("header-docs")}</NavTextLg>
        </a>
        <a target="_blank" href="//about.algodex.com/support/">
          <NavTextLg>{t("header-support")}</NavTextLg>
        </a>
        {/*
        <ActiveLink href="/wallet">
          <NavTextLg>Wallet</NavTextLg>
        </ActiveLink>
        <ActiveLink href="/support">
          <NavTextLg>Support</NavTextLg>
        </ActiveLink>
        */}
        <NavIcon color="gray.500">
          <Bell />
        </NavIcon>
        <NavIcon color="gray.500">
          <User />
        </NavIcon>
        <NavTextLg onClick={async () => await setLanguage("en")}>
          EN <Flag countryCode="US" svg />
        </NavTextLg>
  

        <NavTextLg onClick={async () => await setLanguage("es")}>
          ES <Flag countryCode="ES" svg />
        </NavTextLg>

        
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
          >
            <NavTextSm>Docs</NavTextSm>
          </a>
          <a target="_blank" href="//about.algodex.com/support/">
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
          <NavTextSm>
            EN <Flag countryCode="US" svg />
          </NavTextSm>
        </MobileNavContainer>
      </MobileNavigation>
    </Container>
  )
}
