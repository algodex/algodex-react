import NavItem from 'components/nav-item'
import Link from 'next/link'
import { Bell } from 'react-feather'
import { MenuButton } from 'components/menu-button'
import { Bar, Container, Flag, IconLogo, InlineLogo, StyledList } from './nav.css'
import { useState } from 'react'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Bar>
      <Container>
        <Link href="/">
          <a>
            <InlineLogo src="/logo-inline-dark.svg" />
            <IconLogo src="/logo-icon-dark.svg" />
          </a>
        </Link>
        <StyledList>
          <NavItem>Trade</NavItem>
          <NavItem>Wallet</NavItem>
          <NavItem>Support</NavItem>
          <NavItem>
            <Bell />
          </NavItem>
          <NavItem>
            EN
            <Flag countryCode="US" svg />
          </NavItem>
        </StyledList>
        <MenuButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      </Container>
    </Bar>
  )
}
