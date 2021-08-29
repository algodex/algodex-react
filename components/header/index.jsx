import Hamburger from 'components/hamburger'
import Link from 'next/link'
import { useState } from 'react'
import { Bell, User } from 'react-feather'
import ActiveLink from 'components/active-link'

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

  return (
    <Container data-testid="header-container">
      <Link href="/">
        <a>
          <InlineLogo src="/logo-inline-dark.svg" />
          <IconLogo src="/logo-icon-dark.svg" />
        </a>
      </Link>
      <Navigation>
        <ActiveLink href="/trade" matches={/^\/trade/}>
          <NavTextLg>Trade</NavTextLg>
        </ActiveLink>
        <a target="_blank" href="//about.algodex.com/docs/trading-algorand-standard-assets-testnet/">
          <NavTextLg>Docs</NavTextLg>
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
        <NavTextLg>
          EN <Flag countryCode="US" svg />
        </NavTextLg>
        <Hamburger onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      </Navigation>
      <MobileNavigation isOpen={isOpen}>
        <MobileNavContainer>
          <ActiveLink href="/trade" matches={/^\/trade/}>
            <NavTextSm>Trade</NavTextSm>
          </ActiveLink>
          <ActiveLink href="//about.algodex.com/docs/trading-algorand-standard-assets-testnet/">
            <NavTextSm>Docs</NavTextSm>
          </ActiveLink>
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
