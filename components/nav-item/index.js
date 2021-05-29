import PropTypes from 'prop-types'
import Link from 'next/link'
import { StyledListItem, StyledLink } from './nav-item.css'

function NavItem({ to, children }) {
  return (
    <Link href={`/${to}`}>
      <StyledListItem fontSize={1}>
        <StyledLink>{children}</StyledLink>
      </StyledListItem>
    </Link>
  )
}

export default NavItem

NavItem.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node.isRequired
}

NavItem.defaultProps = {
  to: ''
}
