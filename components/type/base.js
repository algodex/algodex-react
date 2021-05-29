import styled from 'styled-components'

import {
  space,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  textAlign,
  color,
  system
} from 'styled-system'

export default styled.div`
  ${space}
  ${fontFamily}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}
  ${letterSpacing}
  ${textAlign}
  ${color}
  ${system({
    textTransform: true,
    cursor: true
  })}
`
