import styled from 'styled-components'
import theme from '../../theme'
import PropTypes from 'prop-types'
import { Fragment } from 'react'
const FooterExample = styled.div`
  height: 100%;
  background-color: ${theme.colors.gray['700']};
`
const Footer = ({ children }) => (
  <Fragment>{children || <FooterExample>{'<FooterExample/>'}</FooterExample>}</Fragment>
)

Footer.propTypes = {
  children: PropTypes.any
}

export default Footer
