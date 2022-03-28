import * as Icons from 'react-feather'

import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import { isNumber } from 'lodash'
import styled from '@emotion/styled'

export function getFillColor({ theme, color = 'gray', fillGradient = 500 }) {
  return theme.palette[color][fillGradient]
}

export function getSize({ size }) {
  return isNumber(size) ? `${size}px` : size
}

export function getColor({ theme, color = 'gray', gradient = 900 }) {
  return theme.palette[color][gradient]
}
const style = (props) => css`
  cursor: pointer;
  pointer-events: all;
  border: none;
  background: transparent;
  margin: 0;
  padding: 0;
  height: ${getSize(props)};
  width: ${getSize(props)};
  color: ${getColor(props)};
  svg {
    height: ${getSize(props)};
    fill: ${getFillColor(props)};
    color: ${getColor(props)};
  }
`
/**
 * IconButton
 * @type {StyledComponent}
 * @todo refactor to TailwindsCSS
 */
export const IconButton = styled(({ icon, color, ...rest }) => {
  if (typeof Icons[icon] === 'undefined') throw new Error('Icon Not Found!')
  const Icon = Icons[icon]
  return (
    <button data-testid="info-icon-wrapper" color={color} {...rest}>
      <Icon data-testid="info-icon" {...rest} />
    </button>
  )
})`
  ${style}
`
IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
  gradient: PropTypes.number,
  fillGradient: PropTypes.number
}

IconButton.defaultProps = {
  color: 'gray',
  gradient: 900,
  fillGradient: 500
}
export default IconButton
