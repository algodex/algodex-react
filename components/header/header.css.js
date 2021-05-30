import styled from 'styled-components'
import { ReactSVG } from 'react-svg'
import ReactCountryFlag from 'react-country-flag'
import { fontSize } from 'styled-system'

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

export const Bar = styled.div`
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[700]};
  background-color: ${({ theme }) => theme.colors.gray[900]};
  display: fixed;
  z-index: 99;
  position: relative;
  @media (min-width: 1024px) {
    display: block;
  }
`

export const Container = styled.div`
  padding: 1rem 0;
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 1024px) {
    width: 95%;
  }
`
