import styled from 'styled-components'
import theme from '../../theme'
import PropTypes from 'prop-types'
import { Fragment, useEffect } from 'react'
import { useEventDispatch } from '../../events'
// import useEventDispatch from 'events/index.js'
const SidebarExample = styled.div`
  height: 100%;
  background-color: ${theme.colors.gray['700']};
`
export const Sidebar = ({ children }) => {
  const dispatcher = useEventDispatch()
  useEffect(() => {
    console.log('Dispatch: loaded')
    dispatcher('loaded', 'sidebar')
  }, [dispatcher])
  return <Fragment>{children || <SidebarExample>{'<SidebarExample/>'}</SidebarExample>}</Fragment>
}

Sidebar.propTypes = {
  children: PropTypes.any
}
