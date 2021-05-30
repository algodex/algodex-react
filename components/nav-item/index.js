import PropTypes from 'prop-types'
import Link from 'next/link'
import { StyledListItem, StyledLink } from './nav-item.css'

function NavItem({ to, children, fontSize = 2, color = 'gray.100' }) {
  return (
    <Link href={`/${to}`}>
      <StyledListItem fontSize={fontSize} color={color}>
        <StyledLink>{children}</StyledLink>
      </StyledListItem>
    </Link>
  )
}

export default NavItem

NavItem.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
  fontSize: PropTypes.number
}

NavItem.defaultProps = {
  to: '',
  fontSize: 2
}
