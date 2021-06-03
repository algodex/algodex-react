import styled from 'styled-components'
import { rgba } from 'polished'

export const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background.dark};
  padding: 0.75rem 0.625rem 1rem;
`

const gridStyles = `
  grid-template-columns: repeat(3, 1fr);
  column-gap: 0.25rem;
`

export const Header = styled.header`
  flex-shrink: 0%;
  display: grid;
  ${gridStyles}
  padding: 0 0.5rem 0.75rem;
`

export const BookRow = styled.div`
  display: grid;
  ${gridStyles}
  padding: 0 0.5rem;
  transition: background-color 150ms ease-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => rgba(theme.colors.gray['000'], 0.04)};
  }
`

export const OrdersWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
`

export const SellOrders = styled.div`
  flex: 1 1 0%;
  position: relative;
  overflow: hidden;

  ${OrdersWrapper} {
    bottom: 0;
  }
`

export const BuyOrders = styled.div`
  flex: 1 1 0%;
  position: relative;
  overflow: hidden;

  ${OrdersWrapper} {
    right: 0;
  }
`

export const CurrentPrice = styled.div`
  padding: 1rem 0;
`
