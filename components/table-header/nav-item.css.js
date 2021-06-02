import styled from 'styled-components'
import { fontSize, color } from 'styled-system'

export const StyledListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  & > a {
    color: ${({ theme }) => theme.colors.gray[100]};
    padding: '../components 0;
    transition: all 0.1s ease-in;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    font-weight: 600;
    ${fontSize}
    ${color}
    border-bottom: ${({ isActive, border, theme }) =>
      isActive && border ? `6px inset ${theme.colors.green[500]}` : `6px inset transparent`};

    &:hover {
      color: ${({ theme }) => theme.colors.gray[100]};
    }

    &:active {
      color: ${({ theme }) => theme.colors.gray[100]};
    }

    @media (min-width: 1024px) {
      color: ${({ isActive, theme }) =>
        isActive ? theme.colors.gray[100] : theme.colors.gray[500]};
    }
  }
`

export const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`
