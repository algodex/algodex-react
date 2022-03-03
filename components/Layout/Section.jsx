import styled from '@emotion/styled'

export const Section = styled.section`
  height: 100%;
  width: 100%;
  grid-area: ${({ area }) => area};
  display: ${({ flex }) => (flex ? 'flex' : 'block')};
`

Section.defaultProps = {
  area: 'content',
  flex: true
}
