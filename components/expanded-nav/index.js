import PropTypes from 'prop-types'
import { Container, StyledList } from './expanded-nav.css'
import NavItemContainer from 'components/nav-item-container'

function ExtendedNav({ isOpen = false }) {
  return (
    <Container isOpen={isOpen}>
      <NavItemContainer fontSize={4} variant="small" />
    </Container>
  )
}

export default ExtendedNav

ExtendedNav.propTypes = {
  isOpen: PropTypes.bool
}
ExtendedNav.defaultProps = {
  isOpen: false
}
