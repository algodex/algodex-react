import PropTypes from 'prop-types'
import { StyledList, Flag } from './nav-item-container.css'
import { Bell, User } from 'react-feather'
import NavItem from 'components/nav-item'

function NavItemContainer({ fontSize = 2, variant = 'small' }) {
  return (
    <>
      <StyledList variant={variant}>
        <NavItem fontSize={fontSize}>Trade</NavItem>
        <NavItem fontSize={fontSize}>Wallet</NavItem>
        <NavItem fontSize={fontSize}>Support</NavItem>
        {variant !== 'small' && (
          <NavItem fontSize={fontSize}>
            <Bell />
          </NavItem>
        )}
        {variant !== 'small' && (
          <NavItem fontSize={fontSize}>
            <User />
          </NavItem>
        )}
        <NavItem fontSize={fontSize}>
          EN
          <Flag countryCode="US" svg />
        </NavItem>
      </StyledList>
    </>
  )
}

export default NavItemContainer

NavItemContainer.propTypes = {
  fontSize: PropTypes.number,
  variant: PropTypes.string
}
NavItemContainer.defaultProps = {
  fontSize: 2,
  variant: 'small'
}
