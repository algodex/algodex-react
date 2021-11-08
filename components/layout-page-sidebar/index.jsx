import styled from 'styled-components'
import theme from '../../theme'
import PropTypes from 'prop-types'
import { Fragment } from 'react'

const SidebarExample = styled.div`
  height: 100%;
  background-color: ${theme.colors.gray['700']};
`
const Sidebar = ({ children }) => (
  <Fragment>{children || <SidebarExample>{'<SidebarExample/>'}</SidebarExample>}</Fragment>
)

Sidebar.propTypes = {
  children: PropTypes.any
}

export default Sidebar
