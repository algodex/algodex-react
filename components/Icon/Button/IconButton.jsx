/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
