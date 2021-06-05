import styled from 'styled-components'
import ReactCountryFlag from 'react-country-flag'
import { fontSize, color } from 'styled-system'

export const NavContainer = styled.ul`
  display: flex;
  flex-direction: ${(props) => (props.variant === 'large' ? 'row' : 'column')};
  justify-content: space-between;
  align-items: center;
  list-style: none;
  height: 35%;
  width: 100%;
  padding: 0;
  margin: 0;

  @media (min-width: 768px) {
    height: 30%;
    width: 60%;
  }

  @media (min-width: 1024px) {
    display: ${(props) => (props.variant !== 'small' ? 'flex' : 'none')};
    height: 100%;
    width: 50%;
  }
`

export const NavItem = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-weight: 600;
  ${fontSize}
  ${color}
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.gray[100]};
  }

  & > a {
    color: ${({ theme }) => theme.colors.gray[100]};
    padding: 1rem 0;
    transition: all 0.1s ease-in;
    text-decoration: none;
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

export const Flag = styled(ReactCountryFlag)`
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 0.75rem;
`
