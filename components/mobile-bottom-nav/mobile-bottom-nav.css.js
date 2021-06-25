import styled from 'styled-components'
import { lighten } from 'polished'

export const Container = styled.nav`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  height: 7vh;
`

export const NavItem = styled.div`
  display: flex;
  flex: 1 1 0%;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.background.dark};

  border: ${({ isActive, theme }) =>
    isActive ? `2px solid ${theme.colors.gray['500']}` : `2px solid ${theme.colors.gray['700']}`};
  border-bottom: none;

  &:first-child {
    border-left: none;
  }

  &:last-child {
    border-right: none;
  }

  &:not(:first-child) {
    border-left: 2px solid
      ${({ isActive, theme }) =>
        isActive
          ? `2px solid ${theme.colors.gray['500']}`
          : `2px solid ${theme.colors.gray['700']}`};
  }

  &:not(:last-child) {
    border-right: 2px solid
      ${({ isActive, theme }) =>
        isActive
          ? `2px solid ${theme.colors.gray['500']}`
          : `2px solid ${theme.colors.gray['700']}`};
  }
`
