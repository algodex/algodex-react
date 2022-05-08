// import { color, fontSize } from 'styled-system'

import ReactCountryFlag from 'react-country-flag'
import styled from '@emotion/styled'

export const NavTextLg = styled.span`
  display: none;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  color: ${({ theme }) => theme.palette.gray[500]};
  font-weight: 600;
  font-size: ${(fontSize) => fontSize}
  color: ${(color) => color}
  cursor: pointer;
  transition: color 0.1s ease-in;

  &:hover {
    color: ${({ theme }) => theme.palette.gray[100]};
  }

  & > a {
    color: ${({ theme }) => theme.palette.gray[100]};
    padding: 1rem 0;

    text-decoration: none;
    border-bottom: ${({ isActive, border, theme }) =>
      isActive && border ? `6px inset ${theme.palette.green[500]}` : `6px inset transparent`};

    &:hover {
      color: ${({ theme }) => theme.palette.gray[100]};
    }

    &:active {
      color: ${({ theme }) => theme.palette.gray[100]};
    }

    @media (min-width: 1024px) {
      color: ${({ isActive, theme }) =>
        isActive ? theme.palette.gray[100] : theme.palette.gray[500]};
    }
  }

  @media (min-width: 1024px) {
    color: ${({ isActive, theme }) =>
      isActive ? theme.palette.gray[100] : theme.palette.gray[500]};
    display: flex;
    margin: 0 15px;
  }
`

export const NavTextSm = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  color: ${({ theme, isActive }) => (isActive ? theme.palette.gray[100] : theme.palette.gray[500])};
  font-weight: 600;
  font-size: ${(fontSize) => fontSize}
  color: ${(color) => color}
  cursor: pointer;
  transition: color 0.1s ease-in;

  &:hover {
    color: ${({ theme }) => theme.palette.gray[100]};
  }

  & > a {
    color: ${({ theme }) => theme.palette.gray[100]};
    padding: 1rem 0;
    text-decoration: none;
    border-bottom: ${({ isActive, border, theme }) =>
      isActive && border ? `6px inset ${theme.palette.green[500]}` : `6px inset transparent`};

    &:hover {
      color: ${({ theme }) => theme.palette.gray[100]};
    }

    &:active {
      color: ${({ theme }) => theme.palette.gray[100]};
    }

    @media (min-width: 1024px) {
      color: ${({ isActive, theme }) =>
        isActive ? theme.palette.gray[100] : theme.palette.gray[500]};
    }
  }

  @media (min-width: 1024px) {
    color: ${({ isActive, theme }) =>
      isActive ? theme.palette.gray[100] : theme.palette.gray[500]};
    display: none;
  }
`
export const Flag = styled(ReactCountryFlag)`
  margin-left: 0.5rem;
  width: 1rem;
  height: auto;
`

export const LanguageButton = styled.div`
  @media (max-width: 1024px) {
    background: ${({ theme }) => theme.palette.gray['700']};
    padding: 0.3rem 0.6rem;
    border-radius: 3px;
  }
`

export const LanguageDropdownContainerMob = styled.div`
  position: absolute;
  top: 45px;
  right: 54px;
  z-index: 40;
  background: ${({ theme }) => theme.palette.gray['700']};
  padding: 0.3rem 0.5rem;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 35vh;
  overflow-x: scroll;
`

export const LanguagesContainer = styled.ul`
  width: 100px;
  &:hover,
  &:focus-within {
    ul {
      position: absolute;
      display: block;
      top: 20px;
    }
  }
`

export const LanguageDropDown = styled.ul`
  background-color: ${({ theme }) => theme.palette.gray[900]};
  display: none;
  max-height: 500px;
  overflow: scroll;
  right: 2rem;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
`

export const LanguageItem = styled.li`
  display: block;
  height: 50px;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  span {
    line-height: 50px;
  }
`
