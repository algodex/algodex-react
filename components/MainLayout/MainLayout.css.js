import styled from 'styled-components'

export const TradeSection = styled.section`
  grid-area: trade;
`

export const ChartSection = styled.section`
  grid-area: chart;
`

export const BookFeedSection = styled.section`
  grid-area: book;
`

export const OrdersSection = styled.section`
  grid-area: orders;
`

export const AssetsSection = styled.section`
  grid-area: assets;
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
    grid-template-rows: 48px 1fr 1fr 180px;
    grid-template-areas:
      'assets assets assets'
      'chart chart trade'
      'book book trade'
      'orders orders trade';

    & > section {
      display: block;

      // for demo
      border: 1px solid rgba(255, 255, 255, 0.125);
    }
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 280px 280px;
    grid-template-rows: 48px 1fr 1fr;
    grid-template-areas:
      'assets assets assets'
      'chart book trade'
      'orders orders trade';
  }

  @media (min-width: 1024px) and (orientation: portrait) {
    grid-template-columns: 1fr 1fr 280px;
    grid-template-rows: 48px 1fr 1fr 280px;
    grid-template-areas:
      'assets assets assets'
      'chart chart trade'
      'book book trade'
      'orders orders orders';
  }

  @media (min-width: 1536px) {
    grid-template-columns: 280px 1fr 280px 280px;
    grid-template-rows: 3fr 300px;
    grid-template-areas:
      'assets chart book trade'
      'orders orders book trade';
  }

  @media (min-width: 1920px) {
    grid-template-columns: 320px 1fr 320px 320px;
  }
`
