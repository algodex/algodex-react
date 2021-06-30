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
  MobileNavWrapper,
  DesktopItem
} from './header.css'
import { BodyCopySm } from 'components/type'

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
        <DesktopItem>
          <BodyCopySm textTransform="uppercase">Trade</BodyCopySm>
        </DesktopItem>
        <DesktopItem>
          <BodyCopySm textTransform="uppercase">Wallet</BodyCopySm>
        </DesktopItem>
        <DesktopItem>
          <BodyCopySm textTransform="uppercase">Support</BodyCopySm>
        </DesktopItem>
        <NavIcon color="gray.500">
          <Bell />
        </NavIcon>
        <NavIcon color="gray.500">
          <User />
        </NavIcon>
        <DesktopItem>
          <BodyCopySm textTransform="uppercase">
            EN <Flag countryCode="US" svg />
          </BodyCopySm>
        </DesktopItem>

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
