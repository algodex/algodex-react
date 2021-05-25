import styled from 'styled-components'

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.gray['000']};
  font-size: 5rem;
  letter-spacing: -0.055em;
  line-height: 0.9em;
  text-align: center;

  a {
    color: ${({ theme }) => theme.colors.green['400']};
    text-decoration: none;
  }
`
