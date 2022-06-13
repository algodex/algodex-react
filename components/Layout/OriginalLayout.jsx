import { useRef } from 'react'

import AssetSearch from '@/components/Nav/SearchSidebar'
import OrderBook from '@/components/Asset/OrderBook'
import Orders from '@/components/Wallet/WalletTabs'
import PlaceOrder from '@/components/Wallet/PlaceOrder/Original'
import PropTypes from 'prop-types'
import Spinner from '@/components/Spinner'
import TradeHistory from '@/components/Asset/TradeHistory'
import Wallet from '@/components/Wallet/Connect/WalletConnect'
import styled from '@emotion/styled'

const WalletSection = styled.section`
  grid-area: 1 / 1 / 3 / 3;
  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};

  display: ${({ active }) => (active ? 'flex' : 'none')};

  @media (min-width: 996px) {
    grid-area: wallet;
    display: flex;
  }
`

const PlaceOrderSection = styled.section`
  grid-area: 1 / 1 / 3 / 3;

  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
  display: ${({ active }) => (active ? 'flex' : 'none')};
  // overflow: hidden scroll;
  @media (min-width: 996px) {
    grid-area: trade;
    display: flex;
  }
`

const ContentSection = styled.section`
  position: relative;
  height: auto;
  overflow-y: scroll;
`

const AssetsSection = styled.section`
  // overflow: hidden;
  @media (min-width: 1536px) {
    display: flex !important;
  }
`

const SearchAndChartSection = styled.section`
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

const AssetOrderBookSection = styled.section`
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
const AssetTradeHistorySection = styled.section`
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

const WalletOrdersSection = styled.section`
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

const MainWrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: 500px;

  @media (min-width: 996px) {
    min-height: 100%;
    height: auto;
  }
`

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
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
/**
 * @param asset
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function MainLayout({ asset, children }) {
  console.debug(`Main Layout Render ${asset?.id || 'Missing'}`)
  const gridRef = useRef()
  const searchTableRef = useRef()

  if (!asset) {
    return <Spinner flex={true} />
  }
  // console.log(isMobile)
  return (
    <MainWrapper>
      <Main ref={gridRef}>
        <WalletSection active={false}>
          <Wallet />
        </WalletSection>
        <PlaceOrderSection active={false}>
          <PlaceOrder asset={asset} />
        </PlaceOrderSection>
        <SearchAndChartSection active={false}>
          <AssetsSection ref={searchTableRef}>
            <AssetSearch
              style={{ height: '6rem' }}
              className="h-24"
              searchTableRef={searchTableRef}
              gridRef={gridRef}
            />
          </AssetsSection>
          <ContentSection>{children}</ContentSection>
        </SearchAndChartSection>

        <AssetOrderBookSection active={false}>
          <OrderBook asset={asset} />
        </AssetOrderBookSection>
        <AssetTradeHistorySection active={false}>
          <TradeHistory asset={asset} />
        </AssetTradeHistorySection>
        <WalletOrdersSection active={false}>
          <Orders asset={asset} />
        </WalletOrdersSection>
      </Main>
    </MainWrapper>
  )
}
MainLayout.propTypes = {
  asset: PropTypes.object,
  children: PropTypes.any
}
export default MainLayout
