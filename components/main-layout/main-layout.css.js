import styled from 'styled-components'
import Button from "components/button";

export const WalletSection = styled.section`
  grid-area: wallet;
  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};

  display: ${({ active }) => active ? "flex" : "none"};
  height: 20%;

  @media (min-width: 996px) {
    display: flex;
    height: inherit;
  }
`

export const TradeSection = styled.section`
  grid-area: trade;
  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};

  display: ${({ active }) => active ? "flex" : "none"};

  height: calc(100% - 50px);

  @media (min-width: 996px) {
    display: flex;
    height: inherit;
  }
`

export const ChartSection = styled.section`
  grid-area: chart;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
  position: relative;

  @media (min-width: 1024px) and (orientation: landscape) {
    border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};
  }

  height: calc(100% - 101px);
  display: ${({ active }) => active ? "flex" : "none"};

  @media (min-width: 996px) {
    display: flex;
    height: inherit;
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

  display: ${({ active }) => active ? "flex" : "none"};

  height: calc(100% - 50px);

  @media (min-width: 996px) {
    display: flex;
    height: inherit;
  }
`
export const TradeHistorySection = styled.section`
  grid-area: history;
  display: flex;
  flex-direction: column;

  display: ${({ active }) => active ? "flex" : "none"};

  height: calc(100% - 50px);

  @media (min-width: 996px) {
    display: flex;
    height: inherit;
  }
`

export const OrdersSection = styled.section`
  grid-area: orders;
  border-top: 1px solid ${({ theme }) => theme.colors.gray['700']};

  @media (min-width: 1024px) and (orientation: landscape) {
    border-top: none;
    border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};
  }

  display: ${({ active }) => active ? "flex" : "none"};

  height: calc(100% - 50px);

  @media (min-width: 996px) {
    display: flex;
    height: inherit;
  }
`

export const AssetsSection = styled.section`
  grid-area: assets;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};

  @media (min-width: 1536px) {
    border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};
  }

  display: ${({ active }) => active ? "flex" : "none"};


  @media (min-width: 996px) {
    display: flex;
  }
`

export const MainWrapper = styled.div`
  position: relative;
  height: 100%;
`

export const Main = styled.main`
  position: absolute;
  inset: 0;
  flex: 1 1 0%;

  @media (min-width: 996px) {
    display: grid;
    grid-template-columns: 1fr 1fr 280px;
    grid-template-rows: auto 240px 1fr 1fr 180px;
    grid-template-areas:
      'assets assets assets'
      'chart chart wallet'
      'chart chart trade'
      'book history trade'
      'orders orders orders';

    & > section {
      // for demo
      &.demo {
        border: 1px dotted rgba(255, 255, 255, 0.125);
      }
    }
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 320px 280px;
    grid-template-rows: auto 240px 2fr 2fr;
    grid-template-areas:
      'assets assets assets'
      'chart book wallet'
      'chart book trade'
      'orders history trade';
  }

  @media (min-width: 1024px) and (orientation: portrait) {
    grid-template-columns: 1fr 1fr 280px;
    grid-template-rows: auto 240px 1fr 1fr 280px;
    grid-template-areas:
      'assets assets assets'
      'chart chart wallet'
      'chart chart trade'
      'book history trade'
      'orders orders orders';
  }

  @media (min-width: 1536px) {
    grid-template-columns: 320px 1fr 320px 320px;
    grid-template-rows: 240px 1fr 1fr 2fr;
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

export const MobileMenu = styled.nav`
  height: 50px;

  & > ul {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  & > ul > li {
    flex: 1;
    height: 100%;
  }

  @media (min-width: 996px) {
    display: none;
  }
`

export const MobileMenuButton = styled(Button)`
  height: 100%;
  width: 100%;
  background-color: transparent;
  padding: 0;

  border: 1px solid ${({ theme }) => theme.colors.gray['700']};

  
`