import PropTypes from 'prop-types'
import { StyledList, Flag } from './nav.css'
import { Bell, User } from 'react-feather'
import NavItem from 'components/nav-item'
import { useRouter } from 'next/router'

function Nav({ fontSize = 2, variant = 'small' }) {
  const router = useRouter()
  const currentPath = router.pathname
  return (
    <StyledList variant={variant}>
      <NavItem fontSize={fontSize} isActive={currentPath === '/'}>
        Trade
      </NavItem>
      <NavItem fontSize={fontSize} isActive={currentPath === '/wallet'}>
        Wallet
      </NavItem>
      <NavItem fontSize={fontSize} isActive={currentPath === '/support'}>
        Support
      </NavItem>
      {variant !== 'small' && (
        <>
          <NavItem fontSize={fontSize}>
            <User />
          </NavItem>
          <NavItem fontSize={fontSize}>
            <Bell />
          </NavItem>
        </>
      )}
      <NavItem fontSize={fontSize}>
        EN
        <Flag countryCode="US" svg />
      </NavItem>
    </StyledList>
  )
}

export default Nav

Nav.propTypes = {
  fontSize: PropTypes.number,
  variant: PropTypes.string
}
Nav.defaultProps = {
  fontSize: 2,
  variant: 'small'
}
