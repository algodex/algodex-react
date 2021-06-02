import styled from 'styled-components'

export const Container = styled.div`
  flex: 1 1 0%;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto 1fr;
  background-color: ${({ theme }) => theme.colors.background.dark};
`

const gridColumns = `
  grid-template-columns: repeat(3, 1fr);
`

export const Header = styled.header`
  display: grid;
  ${gridColumns}
  padding: 0.5rem 0.75rem 0.625rem;
`

export const BookRow = styled.div`
  display: grid;
  ${gridColumns}
  padding: 0 0.75rem;
  transition: background-color 150ms ease-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray['700']};
  }
`

export const OrdersWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
`

export const SellOrders = styled.div`
  position: relative;
  overflow: hidden;

  ${OrdersWrapper} {
    bottom: 0;
  }
`

export const BuyOrders = styled.div`
  position: relative;
  overflow: hidden;

  ${OrdersWrapper} {
    right: 0;
  }
`

export const CurrentPrice = styled.div`
  padding: 1rem 0.75rem;
`
