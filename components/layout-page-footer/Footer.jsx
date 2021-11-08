import styled from 'styled-components'
import theme from '../../theme'
import PropTypes from 'prop-types'
import { Fragment, useEffect } from 'react'
import { useEventDispatch } from '../../events'
const FooterExample = styled.div`
  height: 100%;
  background-color: ${theme.colors.gray['700']};
`
const Footer = ({ children }) => {
  const dispatcher = useEventDispatch()
  useEffect(() => {
    console.log('Dispatch: loaded')
    dispatcher('loaded', 'footer')
  }, [dispatcher])
  return <Fragment>{children || <FooterExample>{'<FooterExample/>'}</FooterExample>}</Fragment>
}

Footer.propTypes = {
  children: PropTypes.any
}

export default Footer
