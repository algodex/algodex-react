import styled from 'styled-components'
import Button from 'components/button'

export const WalletSection = styled.section`
  grid-area: main;
  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};

  display: ${({ active }) => (active ? 'flex' : 'none')};

  @media (min-width: 996px) {
    grid-area: wallet;
    display: flex;
  }
`

export const TradeSection = styled.section`
  grid-area: main;
  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
  display: ${({ active }) => (active ? 'flex' : 'none')};

  @media (min-width: 996px) {
    grid-area: trade;
    display: flex;
  }
`

export const ChartSection = styled.section`
  grid-area: main;
  
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
  position: relative;

  @media (min-width: 1024px) and (orientation: landscape) {
    border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};
  }

  display: ${({ active }) => (active ? 'grid' : 'none')};
  grid-template-rows: 1fr;

  @media (min-width: 996px) {
    display: block;
    grid-area: chart;
    resize: both;
    overflow: hidden;
  }
`

export const OrderBookSection = styled.section`
  grid-area: main;
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
  grid-area: main;
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
  grid-area: main;
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

export const AssetsSection = styled.section`
  grid-area: header;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};

  @media (min-width: 1536px) {
    border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};
  }

  display: ${({ active }) => (active ? 'flex' : 'none')};

  @media (min-width: 996px) {
    display: flex;
    grid-area: assets;
  }
`

export const MainWrapper = styled.div`
  position: relative;
  height: calc(var(--vh, 1vh) * 100);
  min-height: 500px;
`

export const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr 50px;
  grid-template-areas:
   'header'
   'main'
   'footer';
   
   height: calc(var(--vh, 1vh) * 100);


  @media (min-width: 996px) {
    padding: 0.5rem;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 280px;
    grid-template-rows: auto 240px 1fr 1fr 180px;
    grid-template-areas:
      'assets assets wallet'
      'chart chart wallet'
      'chart chart trade'
      'book history trade'
      'orders orders trade';

    & > section {
      // for demo
      &.demo {
        border: 1px dotted rgba(255, 255, 255, 0.125);
      }
    }
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 280px;
    grid-template-rows: auto 1fr 2fr 1fr 1fr;
    grid-template-areas:
      'assets book wallet'
      'chart book wallet'
      'chart book trade'
      'orders history trade'
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
    grid-template-rows: 180px 1fr 1fr 2fr;
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
  width: 100%;
  grid-area: footer;

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


  z-index: 99;

  @media (min-width: 996px) {
    display: none;
  }
`

export const MobileMenuButton = styled(Button)`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray['800']};
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.gray['700']};
`

export const MobilePriceSection = styled.section`
  grid-area: header;
  height: 50px;

  display: ${({ active }) => (active ? 'grid' : 'none')};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  justify-content: space-around;
  align-content: center;
  padding: 1.125rem;
  h3 {
    font-family: ${({ theme }) => theme.fontFamilies.body};
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray[500]};
    white-space: nowrap;

    span {
      color: ${({ theme }) => theme.colors.gray[100]};
    }

    display: flex;
    align-items: center;

    @media (min-width: 1024px) {
      font-size: 1.25rem;
    }
  }
`