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

import { useCallback, useMemo } from 'react'

import Big from 'big.js'
import { Box } from '@mui/material'
import Icon from 'components/Icon'
import PropTypes from 'prop-types'
import { Section } from '@/components/Layout/Section'
// import { Typography, Typography } from 'components/Typography'
import Typography from '@mui/material/Typography'
import { assetVeryShortNameFn } from '@/components/helpers'
import dayjs from 'dayjs'
import floatToFixed from '@algodex/algodex-sdk/lib/utils/format/floatToFixed'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { rgba } from 'polished'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'
import { withAssetTradeHistoryQuery } from '@algodex/algodex-hooks'

dayjs.extend(localizedFormat)

const Container = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.background.dark};
  // padding: 0.75rem 0.625rem 1rem;
  padding: ${({ isMobile }) => (isMobile ? `0 0.625rem 1rem;` : '0.75rem 0.625rem 1rem;')};
`

const gridStyles = `
  grid-template-columns: repeat(3, 1fr);
  column-gap: 0.25rem;
`
// const HeaderWrapper = styled.div`
//   padding: ${({ isMobile }) => (isMobile ? `0 0.5rem 0rem` : '0.5rem 0.5rem 0.75rem')};
// `

const Header = styled.header`
  flex-shrink: 0;
  display: grid;
  ${gridStyles}
`

const Trades = styled.div`
  flex: 1 1 0;
  position: relative;
  overflow: hidden scroll;
  scrollbar-width: thin;
  /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 12px grey;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme, color = 'gray', gradient = 600 }) => theme.palette[color][gradient]};
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme, color = 'gray', gradient = 400 }) => theme.palette[color][gradient]};
  }
`

const TradesWrapper = styled.div`
  flex: 1 1 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow: visible;
`

const TradesRow = styled.div`
  display: grid;
  padding: 0 0.5rem;
  transition: background-color 150ms ease-out;
  cursor: pointer;
  ${gridStyles}
  &:hover {
    background-color: ${({ theme, type }) => {
      const color = type === 'buyASA' ? 'green' : 'red'
      return rgba(theme.palette[color]['500'], 0.15)
    }};

    p {
      &:not(:first-of-type) {
        color: ${({ theme }) => theme.palette.gray['000']};
      }
    }
  }
`

const PriceHeaderText = styled(Typography)`
  display: flex;
  align-items: center;
  margin: 0;
  color: ${({ theme }) => theme.palette.gray['500']};

  svg {
    margin-left: 0.25rem;
  }
`

const PriceHeader = ({ currencySymbol }) => {
  const { t } = useTranslation('common')
  return (
    <PriceHeaderText variant="body_tiny_cap">
      {t('price')}
      {!currencySymbol && <Icon color="gray" fillGradient={500} use="algoLogo" size={0.625} />}
      {currencySymbol && <span>&nbsp;{currencySymbol}</span>}
    </PriceHeaderText>
  )
}

PriceHeader.propTypes = {
  currencySymbol: PropTypes.string
}

/**
 * Asset Trade History
 *
 * @param {object} props Component Properties
 * @param {object} props.asset Algorand Asset Information
 * @param {object} props.orders Algodex Historical Orders
 * @returns {JSX.Element}
 * @constructor
 */
export function TradeHistory({ asset, orders: tradesData }) {
  const { t } = useTranslation('common')
  const hasTradeHistory = tradesData.length > 0

  const assetVeryShortName = useMemo(() => assetVeryShortNameFn(asset), [asset])

  const renderHistory = useCallback(() => {
    const getColor = (type) => (type === 'buyASA' ? 'green.500' : 'red.500')

    const avgPrice = tradesData && tradesData.length > 0 ?
      tradesData.slice(0, 20).map(row => row.price).reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / tradesData.length
      : 0

    const getPriceDecimals = (avgPrice) => {
      if (avgPrice > 10000) {
        return 2
      } else if (avgPrice > 1000) {
        return 3
      } else if (avgPrice > 100) {
        return 4
      }
      return 6
    }

    const priceDecimals = getPriceDecimals(avgPrice);

    return tradesData
      .sort((a, b) => {
        if (a.timestamp === b.timestamp) {
          return a.id > b.id ? -1 : 1
        }
        return b.timestamp - a.timestamp
      })
      .map((row) => {
        const amount = new Big(row.amount)
        if (row.price === 0) {
          return
        }
        const price = asset.isStable ? 1 / row.price : row.price
        return (
          <TradesRow key={row.id} type={row.type} data-testid="trade-history-row">
            <Typography variant="price" color={getColor(row.type)} title={row.price} m={0}>
              {/* {floatToFixed(price)} */}
              {floatToFixed(row.price, priceDecimals, 6)}
            </Typography>
            <Typography
              variant="body_tiny_cap"
              fontFamily="'Roboto Mono', monospace"
              color="gray.400"
              textAlign="right"
              title={amount.toFixed(asset.decimals)}
              m={0}
            >
              {amount.toFixed(Math.max(0, asset.decimals - 2))}
            </Typography>
            <Typography
              variant="body_tiny_cap"
              fontFamily="'Roboto Mono', monospace"
              color="gray.400"
              textAlign="right"
              title={dayjs(row.timestamp).format('lll')}
              m={0}
            >
              {dayjs(row.timestamp).format('HH:mm:ss')}
            </Typography>
          </TradesRow>
        )
      })
  }, [asset.decimals, tradesData])

  return (
    <Section area="bottomLeft" data-testid="trade-history-section">
      <Container>
        <Box className="p-2">
          <Typography variant="subtitle_medium_cap_bold" color="gray.500" mb={1}>
            {t('trade-history')}
          </Typography>
          <Header className="mt-4">
            <PriceHeader currencySymbol={asset.isStable ? `(${assetVeryShortName})` : ''} />
            <Typography variant="body_tiny_cap" color="gray.500" textAlign="right" m={0}>
              {t('amount')} ({asset.isStable ? 'ALGO' : assetVeryShortName})
            </Typography>
            <Typography variant="body_tiny_cap" color="gray.500" textAlign="right" m={0}>
              {t('time')}
            </Typography>
          </Header>
        </Box>

        <Trades>
          <TradesWrapper>
            {hasTradeHistory ? (
              renderHistory()
            ) : (
              <Typography
                variant="body_tiny_cap"
                className="flex items-center justify-center"
                color="gray.600"
                textAlign="center"
                m={4}
              >
                {t('no-trades-completed')}
              </Typography>
            )}
          </TradesWrapper>
        </Trades>
      </Container>
    </Section>
  )
}

TradeHistory.propTypes = {
  isMobile: PropTypes.bool,
  asset: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired
}

TradeHistory.defaultProps = {
  orders: [],
  isMobile: false
}
export default withAssetTradeHistoryQuery(TradeHistory)
