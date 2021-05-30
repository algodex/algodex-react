import PropTypes from 'prop-types'
import { Container } from './expanded-nav.css'
import Nav from 'components/nav'

function ExtendedNav({ isOpen = false }) {
  return (
    <Container isOpen={isOpen}>
      <Nav fontSize={4} variant="small" />
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
