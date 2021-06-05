import PropTypes from 'prop-types'
import { NavContainer, Flag, NavItem } from './nav.css'
import { Bell, User } from 'react-feather'
import { useRouter } from 'next/router'
import Link from 'next/link'

function Nav({ fontSize = 2, variant = 'small' }) {
  const router = useRouter()
  const currentPath = router?.pathname
  return (
    <NavContainer variant={variant}>
      <NavItem fontSize={fontSize} isActive={currentPath === '/'}>
        <Link href="/">
          <a>Trade</a>
        </Link>
      </NavItem>
      <NavItem fontSize={fontSize} isActive={currentPath === '/wallet'}>
        <Link href="/">
          <a>Wallet</a>
        </Link>
      </NavItem>
      <NavItem fontSize={fontSize} isActive={currentPath === '/support'}>
        <Link href="/">
          <a>Support</a>
        </Link>
      </NavItem>
      {variant === 'large' && (
        <>
          <NavItem fontSize={fontSize}>
            <User data-testid="account" />
          </NavItem>
          <NavItem fontSize={fontSize}>
            <Bell data-testid="notifications" />
          </NavItem>
        </>
      )}
      <NavItem fontSize={fontSize}>
        EN
        <Flag countryCode="US" svg />
      </NavItem>
    </NavContainer>
  )
}

export default Nav

Nav.propTypes = {
  fontSize: PropTypes.number,
  variant: PropTypes.string
}
