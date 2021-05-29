import styled from 'styled-components'
import { fontSize } from 'styled-system'

export const StyledListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[500]};
  padding: 0.5rem 1rem;
  transition: all 0.1s ease-in;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-weight: 600;
  ${fontSize}

  &:hover {
    color: ${({ theme }) => theme.colors.gray[100]};
  }

  &:active {
    color: ${({ theme }) => theme.colors.gray[100]};
  }
`

export const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`
