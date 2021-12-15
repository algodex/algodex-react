import Button from 'components/button'
import styled from 'styled-components'

export const WalletSection = styled.section`
  grid-area: 1 / 1 / 3 / 3;
  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};

  display: ${({ active }) => (active ? 'flex' : 'none')};

  @media (min-width: 996px) {
    grid-area: wallet;
    display: flex;
  }
`

export const PlaceOrderSection = styled.section`
  grid-area: 1 / 1 / 3 / 3;

  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
  display: ${({ active }) => (active ? 'block' : 'none')};
  overflow: hidden scroll;

  @media (min-width: 996px) {
    grid-area: trade;
    display: flex;
  }
`

export const ContentSection = styled.section`
  position: relative;
  height: auto;
`

export const AssetsSection = styled.section`
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
  }

  @media (min-width: 1536px) {
    grid-template-columns: 365px 1fr;
    grid-template-rows: 1fr;
  }
`

export const AssetOrderBookSection = styled.section`
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
export const AssetTradeHistorySection = styled.section`
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

export const WalletOrdersSection = styled.section`
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

export const MainWrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: 500px;

  @media (min-width: 996px) {
    min-height: 100%;
    height: auto;
  }
`

export const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  overflow: hidden scroll;
  height: 100%;


  @media (min-width: 996px) {
    height: 100%;
    min-height: 900px;
    display: grid;
    grid-template-columns: 1fr 1fr 280px;
    grid-template-rows: 240px 200px 300px 300px;
    grid-template-areas:
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
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      'chart book wallet'
      'chart book trade'
      'orders history trade';
  }

  @media (min-width: 1536px) {
    grid-template-columns: 1fr 3fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      'chart chart book wallet'
      'chart chart book trade'
      'orders orders history trade';
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
    flex: 1 0 auto;
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
  max-width: ${({ characterLength }) => (characterLength > 5 ? '6rem' : '5rem')};
  overflow-wrap: anywhere;
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
