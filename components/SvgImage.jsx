import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme, { parseThemeColor } from 'theme'

const IMAGES = {
  logoLg: {
    viewBox: '0 0 1024 165.69',
    markup: (
      <g>
        <path
          fill="#f2f2f2"
          d="M44.74,138,30.65,165.8H0L82.85.1l55.3,110.6H107.08L82.85,62,58.41,110.7Zm121,27.76H134.83l-13.67-27.55h30.66Z"
        />
        <path
          fill="#f2f2f2"
          d="M203.37.1V100.55l-27.55,27.76V.1ZM286.21,138V165.8H175.82L203.37,138Z"
        />
        <path
          fill="#f2f2f2"
          d="M397.43,119.4,425,128.52a77.24,77.24,0,0,1-13.25,15.32,84.68,84.68,0,0,1-16.36,11.81,71.58,71.58,0,0,1-18.85,7.45,75.51,75.51,0,0,1-20.71,2.7c-23,0-42.25-8.29-58.41-24.45S273,105.94,273,83c0-22.78,8.08-42.25,24.44-58.41C313.34,8.18,332.81.1,355.8.1a81.07,81.07,0,0,1,32.31,6.42,86.09,86.09,0,0,1,26.51,18L394.74,44A52.88,52.88,0,0,0,355.8,27.86c-15.12,0-28.17,5.18-39.15,16.15C305.88,54.78,300.71,67.83,300.71,83s5.17,28.37,15.94,39.14S340.68,138,355.8,138a56.33,56.33,0,0,0,23-4.76A57.87,57.87,0,0,0,397.43,119.4ZM355.8,69.28H425L397.43,96.82H355.8Z"
        />
        <path
          fill="#f2f2f2"
          d="M573.9,24.54C590.26,40.7,598.54,60.17,598.54,83c0,23-8.28,42.46-24.64,58.4-16.16,16.16-35.42,24.45-58.41,24.45s-42.25-8.29-58.41-24.45S432.64,105.94,432.64,83c0-22.78,8.29-42.25,24.44-58.41C473,8.39,492.5.1,515.49.1S557.74,8.39,573.9,24.54ZM476.34,44C465.58,54.78,460.4,67.83,460.4,83s5.18,28.37,15.94,39.14,24,15.95,39.15,15.95,28.17-5.18,38.94-15.95c11-11,16.15-24,16.15-39.14A53.18,53.18,0,0,0,554.43,44a53.18,53.18,0,0,0-38.94-16.15C500.37,27.86,487.32,33,476.34,44Z"
        />
        <path
          fill="#f2f2f2"
          d="M721.43,83A78.35,78.35,0,0,1,715,114.84a90.08,90.08,0,0,1-17.81,26.51,84,84,0,0,1-26.51,17.82,79.49,79.49,0,0,1-32.1,6.63H583.5L611,138h27.55a57.06,57.06,0,0,0,21.54-4.14,54.21,54.21,0,0,0,17.6-12,59.78,59.78,0,0,0,11.81-17.61,54.47,54.47,0,0,0,0-42.66,56.62,56.62,0,0,0-12-17.61,57.58,57.58,0,0,0-17.6-12,56.78,56.78,0,0,0-21.33-4.14H611L583.5.1h55.09a80.23,80.23,0,0,1,32.1,6.63A85.6,85.6,0,0,1,697,24.54a86.92,86.92,0,0,1,18,26.51A78.43,78.43,0,0,1,721.43,83Z"
        />
        <path
          fill="#f2f2f2"
          d="M838,.1V27.86H755.18L727.63.1ZM755.18,69.28H838V96.82H727.63V69.28Zm0,68.76H838V165.8H727.63v-2.28Z"
        />
        <path
          fill="#f2f2f2"
          d="M941.77,60.58,924.38,83,859.34.1h35.42ZM924.38,83l17.39,22.37-47,60.48H859.34Zm35,0L941.77,60.58,989,.1h35Zm0,0L1024,165.8H989l-47.23-60.48Z"
        />
      </g>
    )
  },
  myAlgo: {
    viewBox: '0 0 119 32.226',
    markup: (
      <g transform="translate(-838.283 -220.034)">
        <g transform="translate(838.441 219.668)">
          <path
            d="M15 30A15 15 0 0 1 4.394 4.394a15 15 0 1 1 21.213 21.213A14.9 14.9 0 0 1 15 30zm3.991-19.508l.122.468 2.459 8.91h2L20.216 8.314 20.134 8h-1.745l-.04.063-1.633 2.9-1.674 2.974-.04.071-.019-.071-.2-.764-.572-2.21-.061-.22-.633-2.429L13.432 8h-1.745l-.041.063-1.633 2.9-1.674 2.974L6.675 16.9 5 19.873h2L8.676 16.9l1.674-2.963 1.663-2.974.275-.471.122.471.51 1.958.634 2.439.221.832-.4.707-1.675 2.974h2l.707-1.255 1.228-2.179 1.414-2.5 1.663-2.974.274-.469z"
            fill="currentColor"
            transform="translate(-.158 .366)"
          />
        </g>
        <path
          d="M45.177 26.634l3.37-18.266a.549.549 0 0 1 .489-.408h.435a.552.552 0 0 1 .462.3l5.681 13.89h.109l5.654-13.89a.518.518 0 0 1 .462-.3h.435a.549.549 0 0 1 .489.408l3.343 18.266a.463.463 0 0 1-.489.625H63.85a.565.565 0 0 1-.516-.381l-2.011-12.15h-.082l-4.893 12.5a.462.462 0 0 1-.462.3H55.4a.488.488 0 0 1-.462-.3l-4.92-12.5h-.109l-1.959 12.15a.529.529 0 0 1-.489.381h-1.767a.488.488 0 0 1-.517-.625zm26.1.245l-4.73-9.785a.48.48 0 0 1 .462-.707h1.794a.591.591 0 0 1 .462.3l3.37 7.23h.027l3.262-7.23a.547.547 0 0 1 .571-.3h1.549a.466.466 0 0 1 .462.707l-8.313 17.993a.543.543 0 0 1-.462.326H68.1a.487.487 0 0 1-.462-.734zm12.227.381a.48.48 0 0 1-.462-.707L91.39 8.259a.636.636 0 0 1 .462-.3h.272a.636.636 0 0 1 .462.3l8.29 18.293a.48.48 0 0 1-.462.707H98.7a.633.633 0 0 1-.625-.408l-1.685-3.724H87.5c-.544 1.25-1.114 2.474-1.658 3.724a.683.683 0 0 1-.625.408zm5.056-6.469h6.8l-3.343-7.448h-.136zm13.41 5.953V8.748a.535.535 0 0 1 .516-.516h1.549a.535.535 0 0 1 .516.516v17.994a.535.535 0 0 1-.516.516h-1.549a.535.535 0 0 1-.513-.516zm4.385-.136a3.747 3.747 0 0 1 1.93-3.1 4.365 4.365 0 0 1-.843-2.637 4.657 4.657 0 0 1 4.675-4.757h4.757a.5.5 0 0 1 .516.516v.68c0 .19-.109.435-.3.462l-1.495.408a3.638 3.638 0 0 1 1.169 2.908 4.442 4.442 0 0 1-4.621 4.431 8 8 0 0 1-2.365-.435 1.5 1.5 0 0 0-1.114 1.332 1.159 1.159 0 0 0 1.3 1.114h3.7c2.365 0 4.267 1.278 4.267 3.642 0 2.392-2.174 4.512-5.79 4.512-3.833 0-5.382-1.957-5.382-3.724a3 3 0 0 1 1.6-2.555v-.082a2.805 2.805 0 0 1-2.001-2.717zm5.817-3.18a2.289 2.289 0 0 0 2.283-2.5 2.289 2.289 0 0 0-2.283-2.5 2.357 2.357 0 0 0-2.392 2.5 2.357 2.357 0 0 0 2.395 2.498zm-2.881 8.1c0 1.114 1.169 1.93 2.827 1.93s3.1-.843 3.1-2.147c0-.435-.272-1.549-2.039-1.549-.788 0-1.6 0-2.392.054-.161.052-1.493.484-1.493 1.71zm9.2-9.731a5.5 5.5 0 1 1 5.491 5.735 5.623 5.623 0 0 1-5.492-5.732zm2.419 0a3.087 3.087 0 1 0 6.143 0 3.08 3.08 0 1 0-6.143 0z"
          fill="currentColor"
          transform="translate(827.812 216.575)"
        />
      </g>
    )
  },
  walletArrow: {
    viewBox: '0 0 27.18 55.5',
    markup: (
      <path
        d="M27.17,54.15c-0.01-0.06-0.01-0.11-0.02-0.17c-0.04-0.39-0.27-0.72-0.61-0.91c-5.17-2.97-9.62-7.07-12.98-12.02 c-2.81-4.14-4.76-8.81-5.73-13.72C6.43,20.52,6.93,13.45,9.3,6.91c0.08-0.21,0.2-0.4,0.34-0.58c0.09-0.04,0.2-0.04,0.29,0 c0.11,0.02,0.2,0.08,0.26,0.17c0.32,1.19,0.62,2.4,0.95,3.59c0.21,0.77,0.46,1.51,0.71,2.26c0.27,0.38,0.73,0.56,1.18,0.47 c0.45-0.12,0.78-0.51,0.83-0.97c0.05-0.33,0.05-0.67-0.01-1c-0.66-2.99-1.33-5.97-2.02-8.95c-0.12-0.44-0.3-0.85-0.54-1.24 c-0.42-0.56-1.15-0.8-1.81-0.57C9.07,0.26,8.67,0.48,8.31,0.74C5.82,2.71,3.34,4.68,0.87,6.68C0.6,6.89,0.37,7.15,0.19,7.44 C-0.07,7.82-0.06,8.33,0.2,8.7C0.53,9.19,1.18,9.35,1.7,9.08c1.35-1.03,2.63-2.11,4.01-3.13c0.19-0.11,0.4-0.16,0.62-0.16 c0.1,0.01,0.18,0.07,0.23,0.16c0.02,0.22,0.01,0.45-0.03,0.67c-0.3,1.43-0.62,2.87-0.93,4.31c-2.58,11.21-0.44,21.67,5.68,31.21 c3.58,5.6,8.37,9.93,14.05,13.2c0.15,0.09,0.31,0.14,0.48,0.16c0.01,0,0.01,0,0.02,0C26.59,55.58,27.26,54.93,27.17,54.15z"
        fill="currentColor"
      />
    )
  },
  verified: {
    viewBox: '0 0 24 24',
    markup: (
      <g>
        <circle fill={theme.colors.green['500']} cx="12" cy="12" r="10.8" />
        <path
          fill={theme.colors.gray['000']}
          d="M12,23.5C5.7,23.5,0.5,18.3,0.5,12C0.5,5.7,5.7,0.5,12,0.5c6.3,0,11.5,5.2,11.5,11.5 C23.5,18.3,18.3,23.5,12,23.5z M12,1.9C6.4,1.9,1.9,6.4,1.9,12S6.4,22.1,12,22.1S22.1,17.6,22.1,12S17.6,1.9,12,1.9z"
        />
        <path
          fill={theme.colors.gray['000']}
          d="M10.2,16.9L10.2,16.9c-0.4,0-0.7-0.1-1-0.4L5.8,13c-0.5-0.5-0.5-1.4,0-1.9c0.5-0.5,1.4-0.5,1.9,0l2.6,2.6 l6.1-6.1c0.5-0.5,1.4-0.5,1.9,0c0.5,0.5,0.5,1.4,0,1.9l-7,7C10.9,16.7,10.6,16.9,10.2,16.9z"
        />
      </g>
    )
  }
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
 * @deprecated
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