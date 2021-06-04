import PropTypes from 'prop-types'
import styled from 'styled-components'
import ICONS from './defs'
import theme from 'theme'

const parseThemeColor = (str) => {
  return str.split('.').reduce((o, i) => o[i], theme.colors)
}

const Svg = styled.svg`
  display: inline-block;
  vertical-align: middle;

  ${({ color, use }) =>
    ICONS[use].format === 'data' &&
    `
		path {
			fill: ${color ? parseThemeColor(color) : 'currentColor'};
		}
	`};
`

/**
 * Component for custom icons that aren't included in the Feather Icons set.
 *
 * Icon definitions live in './defs' and have two possible `format` values:
 * 'data' and 'markup'. For as icon to be styled with the `color` prop or
 * inherit the color of its parent (by leaving `color` undefined), it must be
 * in 'data' format and consist of a single <path/>, its `d` attribute set as
 * a string.
 *
 * @param {Object} props
 * @param {String} props.use - Key of icon to use
 * @param {Number} props.size - Icon size in rem units
 * @param {String} props.color - A theme color in dot notation, e.g. 'gray.000'
 *
 * @example <Icon use="wallet" size={0.75} color="gray.000" />
 */
function Icon(props) {
  if (!ICONS[props.use]) {
    return null
  }

  const useIcon = ICONS[props.use]

  const content = useIcon.format === 'data' ? <path d={useIcon.path} /> : useIcon.markup

  return (
    <Svg
      width={`${props.size}rem`}
      height={`${props.size}rem`}
      viewBox={useIcon.viewBox}
      {...props}
    >
      {content}
    </Svg>
  )
}

Icon.propTypes = {
  use: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string
}

Icon.defaultProps = {
  size: 1
}

export default Icon
