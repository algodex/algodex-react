import styled from 'styled-components'
import { ReactSVG } from 'react-svg'
import ReactCountryFlag from 'react-country-flag'

export const Logo = styled(ReactSVG)`
  height: auto;
  width: 10rem;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  & > *:not(:first-child) {
    margin-left: 3rem;
  }
`
