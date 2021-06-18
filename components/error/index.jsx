import PropTypes from 'prop-types'
import styled from 'styled-components'
import { AlertTriangle } from 'react-feather'
import { parseThemeColor } from 'theme'

const FlexContainer = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const AlertIcon = styled(AlertTriangle)`
  stroke: ${({ color }) => parseThemeColor(color)};
  width: ${({ size }) => `${size}rem`};
  height: ${({ size }) => `${size}rem`};
  margin: ${({ flex }) => (flex ? '0' : '0 0.5rem 0 0')};
`

const Message = styled.p`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 600;
  margin: ${({ flex }) => (flex ? '0.375rem 0' : '0 0 1rem 0')};
  color: ${({ color }) => {
    const split = color.split('.')
    const value = Number(split[1])
    if (value >= 300) {
      const str = [split[0], `${value - 200}`].join('.')
      return parseThemeColor(str)
    }
    return parseThemeColor('gray.000')
  }};
`

function Error(props) {
  const { size, color, flex, message } = props
  const showMsg = message?.length > 0

  return flex ? (
    <FlexContainer>
      <AlertIcon size={size} color={color} />
      {showMsg && <Message {...props}>{message}</Message>}
    </FlexContainer>
  ) : (
    <Message {...props}>
      <AlertIcon size={1.5} color={color} />
      {message}
    </Message>
  )
}

Error.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  message: PropTypes.string,
  flex: PropTypes.bool
}

Error.defaultProps = {
  size: 4,
  color: 'gray.600',
  flex: false
}

export default Error
