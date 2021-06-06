import styled from 'styled-components'
import { lighten } from 'polished'

export const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background.dark};
  padding: 0.75rem 0.25rem 1rem;
`

export const ButtonContainer = styled.div`
  flex-shrink: 0%;
  display: flex;
  width: 100%;

  button {
    flex-grow: 1;
    margin: 0 0.75rem;
  }
`

export const MyAlgoLink = styled.a`
  margin-top: 1rem;

  svg {
    transition: color 50ms ease-in-out;
  }

  &:hover {
    svg {
      color: ${({ theme }) => lighten(0.1, theme.colors.gray['500'])};
    }
  }
`

export const EmptyState = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  text-align: center;
`

const gridStyles = `
  grid-template-columns: repeat(2, 1fr);
  column-gap: 0.25rem;
`

export const Header = styled.header`
  flex-shrink: 0%;
  display: grid;
  ${gridStyles}
  padding: 0 0.75rem 0.25rem;
  margin-top: 1.5rem;
`

export const Wallets = styled.div`
  flex: 1 1 0%;
  position: relative;
  overflow-y: auto;
`

export const WalletsWrapper = styled.div`
  flex: 1 1 0%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`

export const Balance = styled.p`
  margin: 0;
  text-align: right;
  font-weight: 500;

  span {
    > span {
      opacity: 0.5;
    }
  }
`

export const WalletRow = styled.div`
  display: grid;
  ${gridStyles}
  margin: 0.25rem 0.5rem;
  padding: 0 0.25rem;
  border-radius: 0.125rem;
  cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
  transition: color 50ms ease-out;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.gray['000'] : theme.colors.gray['500']};

  span,
  p {
    color: inherit;
  }

  span {
    display: inline-flex;
    align-items: center;

    svg {
      margin-right: 0.375rem;
    }
  }

  &:hover,
  &:focus {
    color: ${({ theme, isActive }) =>
      isActive ? theme.colors.gray['000'] : theme.colors.gray['300']};
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(121, 255, 156, 0.5);
  }

  ${Balance} {
    span {
      > span {
        opacity: ${({ isActive }) => (isActive ? 0.5 : 0.68)};
      }
    }
  }
`
