/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// import { color, fontSize } from 'styled-system'

import ReactCountryFlag from 'react-country-flag'
import { ReactSVG } from 'react-svg'
import styled from '@emotion/styled'

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.gray[800]};
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray['700']};
  padding: 1rem;
  margin: 0;
  // display: none;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  z-index: 99;

  @media (min-width: 1024px) {
    display: flex;
    // padding: 2rem;
  }
`

export const MobileNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 30%;
  margin: auto;
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
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
  background-color: ${({ theme }) => theme.palette.gray[800]};
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
  justify-content: flex-end;
  align-items: center;
  width: 75%;
  position: absolute;
  z-index: 99;
  right: 0;
  @media (max-width: 1284px) {
    width: 75%;
  }
  @media (min-width: 1284px) {
    width: 60%;
  }
`

export const NavTextLgWrapper = styled.span`
    color: ${({ isActive, theme }) => isActive ? theme.palette.gray[100] : theme.palette.gray[500]};
    display: ${({ isMobile }) => isMobile ? 'none' : 'flex'};
    @media (min-width: 1024px) {
      color: ${({ isActive, theme }) =>
        isActive ? theme.palette.gray[100] : theme.palette.gray[500]};
      display: flex;
      margin: 0 15px;
    }
`

export const NavTextSmWrapper = styled.span`
  color: ${({ isActive, theme }) => isActive ? theme.palette.gray[100] : theme.palette.gray[500]};
  display: ${({ isMobile }) => isMobile ? 'flex' : 'none'};
`

export const NavIcon = styled.span`
  display: flex;
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
  color: ${({ theme }) => theme.palette.gray[500]};
  padding: 0.5rem 1rem;
  transition: color 0.1s ease-in;
  cursor: pointer;
  font-size: ${(fontSize) => fontSize}

  &:hover {
    color: ${({ theme }) => theme.palette.gray[100]};
  }

  &:active {
    color: ${({ theme }) => theme.palette.gray[100]};
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
