import styled from 'styled-components'

export const Bar = styled.div`
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[700]};
  background-color: ${({ theme }) => theme.colors.gray[900]};
`
