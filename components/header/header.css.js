import styled from 'styled-components'
import { ReactSVG } from 'react-svg'
import { fontSize, color } from 'styled-system'
import ReactCountryFlag from 'react-country-flag'

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[800]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
  padding: 1rem;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  z-index: 99;
  @media (min-width: 1024px) {
    padding: 2rem;
  }
`

export const MobileNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 30%;
  margin: auto;

  @media (min-width: 768px) {
    height: 15%;
  }
`

export const MobileNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  top: 103%;
  left: 0;
  height: calc(100vh - 65.16px);
  flex: 1 1 0%;
  position: absolute;
  width: 100%;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  background-color: ${({ theme }) => theme.colors.gray[800]};
  z-index: 10;

  @media (min-width: 1024px) {
    display: none;
  }
`

export const Flag = styled(ReactCountryFlag)`
  margin-left: 0.5rem;
  width: 1rem;
  height: auto;
`

export const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 30%;
  align-items: center;

  @media (min-width: 768px) {
    width: 20%;
  }

  @media (min-width: 1024px) {
    width: 50%;
  }

  @media (min-width: 1536px) {
    width: 40%;
  }

  @media (min-width: 1920px) {
    width: 30%;
  }
`

export const NavTextLg = styled.span`
  display: none;
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
  transition: all 0.1s ease-in;

  &:hover {
    color: ${({ theme }) => theme.colors.gray[100]};
  }

  & > a {
    color: ${({ theme }) => theme.colors.gray[100]};
    padding: 1rem 0;

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

  @media (min-width: 1024px) {
    color: ${({ isActive, theme }) => (isActive ? theme.colors.gray[100] : theme.colors.gray[500])};
    display: flex;
  }
`

export const NavTextSm = styled.span`
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
  transition: all 0.1s ease-in;

  &:hover {
    color: ${({ theme }) => theme.colors.gray[100]};
  }

  & > a {
    color: ${({ theme }) => theme.colors.gray[100]};
    padding: 1rem 0;
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

  @media (min-width: 1024px) {
    color: ${({ isActive, theme }) => (isActive ? theme.colors.gray[100] : theme.colors.gray[500])};
    display: none;
  }
`

export const NavIcon = styled.span`
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
  transition: all 0.1s ease-in;

  &:hover {
    color: ${({ theme }) => theme.colors.gray[100]};
  }

  & > a {
    color: ${({ theme }) => theme.colors.gray[100]};
    padding: 1rem 0;
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

  @media (min-width: 1024px) {
    color: ${({ isActive, theme }) => (isActive ? theme.colors.gray[100] : theme.colors.gray[500])};
  }
`

export const InlineLogo = styled(ReactSVG)`
  height: auto;
  width: 10rem;
  display: none;
  @media (min-width: 1024px) {
    display: block;
  }
`
export const IconLogo = styled(ReactSVG)`
  height: auto;
  width: 1.7rem;
  @media (min-width: 1024px) {
    display: none;
  }
`

export const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.gray[500]};
  padding: 0.5rem 1rem;
  transition: all 0.1s ease-in;
  cursor: pointer;
  ${fontSize}

  &:hover {
    color: ${({ theme }) => theme.colors.gray[100]};
  }

  &:active {
    color: ${({ theme }) => theme.colors.gray[100]};
  }

  & > svg {
    margin: 0;
  }
  @media (min-width: 1024px) {
    display: none;
  }
`

export const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 1024px) {
    display: none;
  }
`
