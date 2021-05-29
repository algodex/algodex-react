import Link from 'next/link'
import { Container, Bar, Logo, StyledList, Flag } from './nav.css'
import NavItem from 'components/nav-item'
import { Bell } from 'react-feather'

export default function Nav() {
  return (
    <Bar>
      <Container>
        <Link href="/">
          <a>
            <Logo src="/logo-inline-light.svg" />
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
      </Container>
    </Bar>
  )
}
