import styled from 'styled-components'

export const WalletSection = styled.section`
  grid-area: wallet;
  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
`

export const TradeSection = styled.section`
  grid-area: trade;
  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
`

export const ChartSection = styled.section`
  grid-area: chart;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};

  @media (min-width: 1024px) and (orientation: landscape) {
    border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};
  }
`

export const OrderBookSection = styled.section`
  grid-area: book;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};

  @media (min-width: 1024px) and (orientation: landscape) {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
  }
`
export const TradeHistorySection = styled.section`
  grid-area: history;
  display: flex;
  flex-direction: column;
`

export const OrdersSection = styled.section`
  grid-area: orders;
  border-top: 1px solid ${({ theme }) => theme.colors.gray['700']};

  @media (min-width: 1024px) and (orientation: landscape) {
    border-top: none;
    border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};
  }
`

export const AssetsSection = styled.section`
  grid-area: assets;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};

  @media (min-width: 1536px) {
    border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};
  }
`

export const Main = styled.main`
  flex: 1 1 0%;
  width: 100vw;

  & > section {
    display: none;
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr 280px;
    grid-template-rows: 48px 320px 1fr 1fr 180px;
    grid-template-areas:
      'assets assets assets'
      'chart chart wallet'
      'chart chart trade'
      'book history trade'
      'orders orders orders';

    & > section {
      display: flex;

      // for demo
      &.demo {
        border: 1px dotted rgba(255, 255, 255, 0.125);
      }
    }
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 320px 280px;
    grid-template-rows: 48px 320px 2fr 2fr;
    grid-template-areas:
      'assets assets assets'
      'chart book wallet'
      'chart book trade'
      'orders history trade';
  }

  @media (min-width: 1024px) and (orientation: portrait) {
    grid-template-columns: 1fr 1fr 280px;
    grid-template-rows: 48px 320px 1fr 1fr 280px;
    grid-template-areas:
      'assets assets assets'
      'chart chart wallet'
      'chart chart trade'
      'book history trade'
      'orders orders orders';
  }

  @media (min-width: 1536px) {
    grid-template-columns: 280px 1fr 320px 320px;
    grid-template-rows: 320px 1fr 1fr 2fr;
    grid-template-areas:
      'assets chart book wallet'
      'assets chart book trade'
      'assets chart book trade'
      'orders orders history trade';
  }

  @media (min-width: 1920px) {
    grid-template-columns: 320px 1fr 320px 320px;
  }
`
