import styled from '@emotion/styled'
import { AlertTriangle } from 'react-feather'
import { parseThemeColor } from 'theme'

export const AlertIcon = styled(AlertTriangle)`
  stroke: ${({ color }) => parseThemeColor(color)};
  width: ${({ size }) => `${size}rem`};
  height: ${({ size }) => `${size}rem`};
  margin: ${({ flex }) => (flex ? '0' : '0 0.5rem 0 0')};
`

export default AlertIcon
