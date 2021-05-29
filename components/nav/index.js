import Link from 'next/link'
import { Container, Bar, InlineLogo, IconLogo, StyledList, Flag, MenuButton } from './nav.css'
import NavItem from 'components/nav-item'
import { Bell, Menu } from 'react-feather'

export default function Nav() {
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
        <MenuButton>
          <Menu />
        </MenuButton>
      </Container>
    </Bar>
  )
}
