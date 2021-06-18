import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { parseThemeColor } from 'theme'

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`

const FlexContainer = styled.div`
  flex: 1 1 0%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Svg = styled.svg.attrs({
  viewBox: '0 0 50 50'
})`
  animation: ${rotate} 2s linear infinite;
  width: ${({ size }) => `${size}rem`};
  height: ${({ size }) => `${size}rem`};
  opacity: 0.75;
  will-change: transform;

  circle {
    stroke: ${({ color }) => parseThemeColor(color)};
    stroke-width: 4;
    stroke-linecap: round;
    fill: none;
    animation: ${dash} 1300ms ease-in-out infinite;
    will-change: stroke-dasharray, stroke-dashoffset;
  }
`

function Spinner(props) {
  const { size, color, flex, ...rest } = props

  return flex ? (
    <FlexContainer>
      <Svg size={size} color={color} {...rest}>
        <circle cx="25" cy="25" r="20" />
      </Svg>
    </FlexContainer>
  ) : (
    <Svg size={size} color={color} {...rest}>
      <circle cx="25" cy="25" r="20" />
    </Svg>
  )
}

Spinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  flex: PropTypes.bool
}

Spinner.defaultProps = {
  size: 5,
  color: 'gray.600',
  flex: false
}

export default Spinner
