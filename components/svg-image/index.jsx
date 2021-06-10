import PropTypes from 'prop-types'
import styled from 'styled-components'
import IMAGES from './defs'
import theme from '../../theme'

const parseThemeColor = (str) => {
  return str.split('.').reduce((o, i) => o[i], theme.colors)
}

const Svg = styled.svg`
  display: inline-block;
  vertical-align: middle;
  width: ${({ w }) => (w ? `${w}rem` : 'auto')};
  height: ${({ h }) => (h ? `${h}rem` : 'auto')};
  ${({ color }) => color && `color: ${parseThemeColor(color)}`};
`

/**
 * Component for displaying SVG images from a collection of definitions
 *
 * If the image has multiple colors or custom styles, they must be defined in
 * the SVG markup. Otherwise, the color can be set via the `color` prop by
 * defining all elements' `fill` and/or `stroke` attributes to "currentColor".
 * The parent <svg/> color style will be set to the value of `color` and all
 * child elements will inherit that color.
 *
 * @param {Object} props
 * @param {String} props.use - Key of image to use
 * @param {Number} props.w - Display width in rem units ('auto' if undefined)
 * @param {String} props.h - Display height in rem units ('auto' if undefined)
 * @param {String} props.color - A theme color in dot notation, e.g. 'gray.000'
 *
 * @example <SvgImage use="myAlgo" w={3} color="gray.000" />
 */
function SvgImage(props) {
  if (!IMAGES[props.use]) {
    return null
  }

  const { viewBox, markup } = IMAGES[props.use]

  return (
    <Svg viewBox={viewBox} {...props}>
      {markup}
    </Svg>
  )
}

SvgImage.propTypes = {
  use: PropTypes.string.isRequired,
  w: PropTypes.number,
  h: PropTypes.number
}

export default SvgImage
