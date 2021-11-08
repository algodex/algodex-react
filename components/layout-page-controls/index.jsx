import styled from 'styled-components'
import theme from '../../theme'
import { Fragment } from 'react'
import PropTypes from 'prop-types'

const Row = styled.div`
  background-color: transparent;
  display: flex;
  width: 100%;
  transition: 'height 2s ease-out';
  height: ${({ height = '100%' }) => height};
`
const Col = styled.div`
  outline: 2px dashed blue;
  background-color: ${theme.colors.gray['700']};
  flex: ${({ size = 1 }) => size};
`
const DefaultControls = ({ children }) => (
  <Fragment>
    {children || (
      <Row height={'100%'}>
        <Col>{'<ControlColExample/>'}</Col>
        <Col>{'<ControlColExample/>'}</Col>
      </Row>
    )}
  </Fragment>
)

DefaultControls.propTypes = {
  children: PropTypes.any
}

export default DefaultControls
