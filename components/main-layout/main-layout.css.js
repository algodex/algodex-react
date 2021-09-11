import styled from 'styled-components'
import Button from 'components/button'

export const WalletSection = styled.section`
  grid-area: 1 / 1 / 3 / 3;
  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};

  display: ${({ active }) => (active ? 'flex' : 'none')};

  @media (min-width: 996px) {
    height: 100%;
    grid-area: wallet;
    display: flex;
  }
`

export const TradeSection = styled.section`
  grid-area: 1 / 1 / 3 / 3;

  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
  display: ${({ active }) => (active ? 'block' : 'none')};
  overflow: hidden scroll;

  @media (min-width: 996px) {
    grid-area: trade;
    display: flex;
  }
`

export const ChartSection = styled.section`
  position: relative;
  height: auto%;
  width: 100%;

  @media (min-width: 996px) {
    height: 100%;
  }
`

export const AssetsSection = styled.section`

  @media (min-width: 996px) {
    height: 100%;
    margin-right: 5px;
  }
  @media (min-width: 1536px) {
    display: flex;


  }
`


export const SearchAndChartSection = styled.section`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
  position: relative;

  @media (min-width: 1024px) and (orientation: landscape) {
    border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};
  }

  display: ${({ active }) => (active ? 'grid' : 'none')};
  grid-template-rows: 50px 1fr;

  @media (min-width: 996px) {
    display: grid;
    grid-area: chart;
    resize: both;
    overflow: hidden;
  }

  @media (min-width: 1536px) {
    grid-template-columns: 320px 1fr;
    grid-template-rows: 1fr;


  }

`

export const OrderBookSection = styled.section`
  display: ${({ active }) => (active ? 'flex' : 'none')};

  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};

  @media (min-width: 996px) {
    grid-area: book;
    display: flex;
    height: 100%;
  }

  @media (min-width: 1024px) and (orientation: landscape) {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
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
    height: 100%;
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
    height: 100%;
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
  grid-template-rows: 1fr;
  overflow: hidden scroll;
  height: calc(var(--vh, 1vh) * 100);


  @media (min-width: 996px) {
    padding: 0.5rem;
    height: 100%;


    & > section {
      // for demo
      &.demo {
        border: 1px dotted rgba(255, 255, 255, 0.125);
      }
    }
  }


`

export const MobileMenu = styled.nav`
  height: 50px;
  width: 100%;

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
  grid-area: 1 / 1 / 2 / 2;
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
