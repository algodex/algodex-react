import NavItem from 'components/nav-item'
import Link from 'next/link'
import { Bell, User } from 'react-feather'
import MenuButton from 'components/menu-button'
import { Bar, Container, IconLogo, InlineLogo, MenuContainer } from './header.css'
import { useState } from 'react'
import ExpandedNav from 'components/expanded-nav'
import Nav from 'components/nav'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Bar>
        <Container>
          <Link href="/">
            <a>
              <InlineLogo src="/logo-inline-dark.svg" />
              <IconLogo src="/logo-icon-dark.svg" />
            </a>
          </Link>
          <Nav variant="large" />
          <MenuContainer>
            <NavItem color="gray.500">
              <Bell />
            </NavItem>
            <NavItem color="gray.500">
              <User />
            </NavItem>
            <MenuButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
          </MenuContainer>
        </Container>
      </Bar>
      <ExpandedNav isOpen={isOpen} />
    </>
  )
}
