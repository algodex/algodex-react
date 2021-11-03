import styled from 'styled-components'

export const OrderBookSection = styled.section`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};

  @media (min-width: 1024px) and (orientation: landscape) {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
  }

  display: ${({ active }) => (active ? 'flex' : 'none')};

  @media (min-width: 996px) {
    grid-area: book;
    display: flex;
  }
`

export const TradeHistorySection = styled.section`
  display: flex;
  flex-direction: column;

  display: ${({ active }) => (active ? 'flex' : 'none')};

  height: calc(100% - 50px);

  @media (min-width: 996px) {
    grid-area: history;
    display: flex;
    height: inherit;
  }
`

export const OrdersSection = styled.section`
  border-top: 1px solid ${({ theme }) => theme.colors.gray['700']};

  @media (min-width: 1024px) and (orientation: landscape) {
    border-top: none;
    border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};
  }
  display: ${({ active }) => (active ? 'flex' : 'none')};

  @media (min-width: 996px) {
    grid-area: orders;
    display: flex;
  }
`
