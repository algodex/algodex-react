import styled from 'styled-components'
import { fontSize, color } from 'styled-system'

export const StyledListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[100]};
  padding: 0.5rem 1rem;
  transition: all 0.1s ease-in;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-weight: 500;
  ${fontSize}
  ${color}

  &:hover {
    color: ${({ theme }) => theme.colors.gray[100]};
  }

  &:active {
    color: ${({ theme }) => theme.colors.gray[100]};
  }

  @media (min-width: 1024px) {
    color: ${({ theme }) => theme.colors.gray[500]};
  }
`

export const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`
