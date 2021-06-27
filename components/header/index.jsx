import Hamburger from 'components/hamburger'
import Link from 'next/link'
import { useState } from 'react'
import { Bell, User } from 'react-feather'
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
  MobileNavContainer,
  MobileNavWrapper
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
        <NavTextLg>Trade</NavTextLg>
        <NavTextLg>Wallet</NavTextLg>
        <NavTextLg>Support</NavTextLg>
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
          <NavTextSm>Trade</NavTextSm>
          <NavTextSm>Wallet</NavTextSm>
          <NavTextSm>Support</NavTextSm>
          <NavTextSm>
            EN <Flag countryCode="US" svg />
          </NavTextSm>
        </MobileNavContainer>
      </MobileNavigation>
    </Container>
  )
}
