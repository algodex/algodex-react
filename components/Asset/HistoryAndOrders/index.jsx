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

import OrderBook from '@/components/Asset/OrderBook'
import PropTypes from 'prop-types'
import TradeHistory from '@/components/Asset/TradeHistory'
import styled from '@emotion/styled'
import { useState, useCallback } from 'react'
import useTranslation from 'next-translate/useTranslation'

const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.palette.gray[100]};
  padding: 0.5rem 0;
  transition: all 0.1s ease-in;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 600;
  line-height: 1.25;
  opacity: ${({ isActive }) => (isActive ? `1` : `0.5`)};

  border-bottom: ${({ isActive, theme }) =>
    isActive ? `4px inset ${theme.palette.green[500]}` : `4px inset transparent`};

  &:hover {
    color: ${({ theme }) => theme.palette.gray[100]};
    opacity: 1;
  }

  &:active {
    color: ${({ theme }) => theme.palette.gray[100]};
  }

  @media (min-width: 1024px) {
    color: ${({ isActive, theme }) =>
      isActive ? theme.palette.gray[100] : theme.palette.gray[500]};
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray[600]};
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
`
function HistoryAndOrderBook({ asset, isMobile }) {
  const { t } = useTranslation('common')
  const [selectedPanel, setSelectedPanel] = useState('order-book')
  const ORDER_BOOK_PANEL = 'order-book'
  const TRADE_HISTORY_PANEL = 'trade-history'

  const renderPanel = useCallback((panelName) => {
    switch (panelName) {
      case ORDER_BOOK_PANEL:
        return <OrderBook isMobile={isMobile} asset={asset} />
      case TRADE_HISTORY_PANEL:
        return <TradeHistory isMobile={isMobile} asset={asset} />
      default:
        return null
    }
  }, [asset, isMobile])

  return (
    <Container>
      <Header>
        <Tab
          // data-testid="assets-panel-tab"
          isActive={selectedPanel === ORDER_BOOK_PANEL}
          onClick={() => setSelectedPanel(ORDER_BOOK_PANEL)}
        >
          {t('order-book')}
        </Tab>
        <Tab
          // data-testid="assets-panel-tab"
          isActive={selectedPanel === TRADE_HISTORY_PANEL}
          onClick={() => setSelectedPanel(TRADE_HISTORY_PANEL)}
        >
          {t('trade-history')}
        </Tab>
      </Header>
      {renderPanel(selectedPanel)}
    </Container>
  )
}

export default HistoryAndOrderBook

HistoryAndOrderBook.propTypes = {
  asset: PropTypes.object,
  isMobile: PropTypes.bool
}

HistoryAndOrderBook.defaultProps = {
  asset: {},
  isMobile: false
}
