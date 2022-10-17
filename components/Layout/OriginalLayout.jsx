/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
// import '@/wdyr';
import React, { useRef } from 'react'

import AssetSearch from '@/components/Nav/SearchSidebar'
import OrderBook from '@/components/Asset/OrderBook'
import Orders from '@/components/Wallet/WalletTabs'
import PlaceOrder from '@/components/Wallet/PlaceOrder/Form'
import PropTypes from 'prop-types'
import Spinner from '@/components/Spinner'
import TradeHistory from '@/components/Asset/TradeHistory'
import Wallet from '@/components/Wallet/Connect/WalletConnect'
import styled from '@emotion/styled'
import { useAlgodex } from '@algodex/algodex-hooks'

export const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.dark};
  overflow: hidden scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`
// Offline PlaceOrder Header
export const Header = styled.header`
  padding: 1.125rem;
`

const WalletSection = styled.section`
  grid-area: 1 / 1 / 3 / 3;
  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
  grid-area: wallet;
  display: flex;
`

const PlaceOrderSection = styled.section`
  grid-area: 1 / 1 / 3 / 3;

  border-left: 1px solid ${({ theme }) => theme.colors.gray['700']};
  // overflow: hidden scroll;
  grid-area: trade;
  display: flex;
`

const ContentSection = styled.section`
  position: relative;
  height: auto;
  overflow-y: scroll;
  overflow-x: hidden;
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

  display: grid;
  grid-area: chart;
  grid-template-rows: 50px 1fr;

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

  grid-area: book;
  display: flex;
`
const AssetTradeHistorySection = styled.section`
  display: flex;
  flex-direction: column;
  grid-area: history;
  display: flex;
  height: inherit;
`

const WalletOrdersSection = styled.section`
  border-top: 1px solid ${({ theme }) => theme.colors.gray['700']};

  @media (min-width: 1024px) and (orientation: landscape) {
    border-top: none;
    border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};
  }
  grid-area: orders;
  display: flex;
`

const MainWrapper = styled.div`
  position: relative;
  min-height: 100%;
  height: auto;
`

const Main = styled.main`
  display: grid;
  height: 100%;
  min-height: 900px;
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
`
/**
 * @param asset
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function MainLayout({ asset, children }) {
  const { wallet } = useAlgodex()
  const gridRef = useRef()
  const searchTableRef = useRef()
  if (!asset || !asset?.decimals) {
    return <Spinner flex={true} />
  }

  return (
    <MainWrapper>
      <Main ref={gridRef}>
        <WalletSection>
          <Wallet />
        </WalletSection>
        <PlaceOrderSection>
          <PlaceOrder wallet={wallet} asset={asset} />
        </PlaceOrderSection>
        <SearchAndChartSection>
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

        <AssetOrderBookSection>
          <OrderBook asset={asset} />
        </AssetOrderBookSection>
        <AssetTradeHistorySection>
          <TradeHistory asset={asset} />
        </AssetTradeHistorySection>
        <WalletOrdersSection>
          <Orders asset={asset} />
        </WalletOrdersSection>
      </Main>
    </MainWrapper>
  )
}
// MainLayout.whyDidYouRender = true
MainLayout.propTypes = {
  asset: PropTypes.object,
  children: PropTypes.any
}

export default MainLayout
