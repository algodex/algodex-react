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
  width: 3rem;
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

export const Flag = styled(ReactCountryFlag)`
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 0.75rem;
`

export const Bar = styled.div`
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[700]};
  background-color: ${({ theme }) => theme.colors.gray[900]};
`

export const Container = styled.div`
  padding: 1rem 0;
  width: 95%;
  margin: 0 auto;
  display: flex;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const StyledList = styled.ul`
  display: none;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  & > *:not(:first-child) {
    margin-left: 3rem;
  }

  @media (min-width: 1024px) {
    display: flex;
  }
`
