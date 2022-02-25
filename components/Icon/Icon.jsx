import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import theme from 'theme'
import * as Icons from 'react-feather'
import { has } from 'lodash/object'
import { isNumber } from 'lodash'

export const ICONS = {
  wallet: {
    format: 'data',
    viewBox: '0 0 24 24',
    path: 'M21.23,5.51V4.96c0-0.99-0.39-1.91-1.08-2.61c-0.7-0.7-1.62-1.08-2.6-1.08c-0.21-0.02-0.46,0.02-0.67,0.06L3,3.7 C1.26,4.03,0,5.55,0,7.32v1.33V9.9v9.66c0,1.76,1.43,3.18,3.18,3.18h17.63c1.76,0,3.18-1.43,3.18-3.18V8.65 C24,7.04,22.79,5.71,21.23,5.51z M17.25,3.42c0.1-0.02,0.19-0.03,0.29-0.03c0,0,0,0,0,0c0.42,0,0.81,0.16,1.11,0.46 c0.3,0.3,0.46,0.69,0.46,1.11v0.51H5.25L17.25,3.42z M21.88,19.55c0,0.58-0.48,1.06-1.06,1.06H3.18c-0.59,0-1.06-0.48-1.06-1.06V9.9 V8.65c0-0.59,0.48-1.06,1.06-1.06h17.63c0.58,0,1.06,0.48,1.06,1.06V19.55z M19.57,14.1c0,0.93-0.75,1.68-1.68,1.68 s-1.68-0.75-1.68-1.68c0-0.93,0.75-1.68,1.68-1.68S19.57,13.17,19.57,14.1z'
  },
  sortNone: {
    format: 'markup',
    viewBox: '0 0 24 24',
    markup: (
      <g>
        <polygon fill={theme.colors.gray['600']} points="12,0 4,10 20,10" />
        <polygon fill={theme.colors.gray['600']} points="12,24 20,14 4,14" />
      </g>
    )
  },
  sortAsc: {
    format: 'markup',
    viewBox: '0 0 24 24',
    markup: (
      <g>
        <polygon fill={theme.colors.green['500']} points="12,0 4,10 20,10" />
        <polygon fill={theme.colors.gray['600']} points="12,24 20,14 4,14" />
      </g>
    )
  },
  sortDesc: {
    format: 'markup',
    viewBox: '0 0 24 24',
    markup: (
      <g>
        <polygon fill={theme.colors.gray['600']} points="12,0 4,10 20,10" />
        <polygon fill={theme.colors.green['500']} points="12,24 20,14 4,14" />
      </g>
    )
  },
  algoLogo: {
    format: 'data',
    viewBox: '0 0 24 24',
    path: 'M23.98,23.99h-3.75l-2.44-9.07l-5.25,9.07H8.34l8.1-14.04l-1.3-4.88L4.22,24H0.02L13.88,0h3.67l1.61,5.96 h3.79l-2.59,4.5L23.98,23.99z'
  }
}

function getFillColor({ theme, color = 'gray', fillGradient = 500 }) {
  return theme.colors[color][fillGradient]
}
function getSize({ size }) {
  return isNumber(size) ? `${size}px` : size
}
function getColor({ theme, color = 'gray', gradient = 900 }) {
  return theme.colors[color][gradient]
}

const Svg = styled.svg`
  display: ${(flex) => (flex ? 'flex' : 'inline-block')};
  vertical-align: middle;
  cursor: pointer;
  path {
    height: ${getSize}
    fill: ${getFillColor};
    color: ${getColor};      
  }
`

/**
 * Component for custom icons that aren't included in the Feather Icons set.
 *
 * Icon definitions live in 'ICONS' and have two possible `format` values:
 * 'data' and 'markup'. For an icon to be styled with the `color` prop or
 * inherit the color of its parent (by leaving `color` undefined), it must be
 * in 'data' format and consist of a single <path/>, its `d` attribute set as
 * a string.
 *
 * @param {Object} props
 * @param {String} props.use Key of icon to use
 * @param {Number} props.size Icon size in rem units
 * @param {String} props.color A theme color in dot notation, e.g. 'gray.000'
 *
 * @example <Icon use="wallet" size={0.75} color="gray.000" />
 */
export function Icon(props) {
  const isCustomIcon = has(ICONS, props.use)
  const isFeatherIcon = has(Icons, props.use)
  if (!isCustomIcon && !isFeatherIcon) {
    return null
  }

  const SvgIcon = isFeatherIcon ? Icons[props.use] : Svg

  const svgProps = {
    width: `${props.size}rem`,
    height: `${props.size}rem`
  }

  if (isCustomIcon) {
    const useIcon = ICONS[props.use]
    svgProps.children = useIcon.format === 'data' ? <path d={useIcon.path} /> : useIcon.markup
    svgProps.viewBox = useIcon.viewBox
  }

  return <SvgIcon custom={isCustomIcon} {...svgProps} {...props} />
}

Icon.propTypes = {
  flex: PropTypes.bool,
  use: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string
}

Icon.defaultProps = {
  color: 'red',
  use: 'algoLogo',
  size: 1
}

export default Icon
