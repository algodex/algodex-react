// import { Typography, Typography } from 'components/Typography'
import Typography from '@mui/material/Typography'
import Big from 'big.js'
import Icon from 'components/Icon'
import PropTypes from 'prop-types'
import { Section } from '@/components/Layout/Section'
import dayjs from 'dayjs'
import floatToFixed from '@algodex/algodex-sdk/lib/utils/format/floatToFixed'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { rgba } from 'polished'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'
import { withAssetTradeHistoryQuery } from '@algodex/algodex-hooks'

dayjs.extend(localizedFormat)

const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.background.dark};
  padding: 0.75rem 0.625rem 1rem;
`

const gridStyles = `
  grid-template-columns: repeat(3, 1fr);
  column-gap: 0.25rem;
`

const Header = styled.header`
  flex-shrink: 0%;
  display: grid;
  ${gridStyles}
  padding: 0 0.5rem 0.75rem;
`

const Trades = styled.div`
  flex: 1 1 0%;
  position: relative;
  overflow: hidden scroll;
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
  flex: 1 1 0%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow: visible;
`

const TradesRow = styled.div`
  display: grid;
  ${gridStyles}
  padding: 0 0.5rem;
  transition: background-color 150ms ease-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, type }) => {
      const color = type === 'buyASA' ? 'green' : 'red'
      return rgba(theme.palette[color]['500'], 0.15)
    }};

    p {
      &:not(:first-child) {
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

const PriceHeader = () => {
  const { t } = useTranslation('common')
  return (
    <PriceHeaderText>
      {t('price')}
      <Icon color="gray" fillGradient={500} use="algoLogo" size={0.625} />
    </PriceHeaderText>
  )
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

  const renderHistory = () => {
    const getColor = (type) => (type === 'buyASA' ? 'green.500' : 'red.500')

    return tradesData
      .sort((a, b) => {
        if (a.timestamp === b.timestamp) {
          return a.id > b.id ? -1 : 1
        }
        return b.timestamp - a.timestamp
      })
      .map((row) => {
        const amount = new Big(row.amount)

        return (
          <TradesRow key={row.id} type={row.type} data-testid="trade-history-row">
            <Typography
              fontFamily="'Roboto Mono', monospace"
              color={getColor(row.type)}
              title={row.price}
              m={0}
            >
              {floatToFixed(row.price)}
            </Typography>
            <Typography
              fontFamily="'Roboto Mono', monospace"
              color="gray.400"
              textAlign="right"
              title={amount.toFixed(asset.decimals)}
              m={0}
            >
              {amount.toFixed(Math.min(3, asset.decimals))}
            </Typography>
            <Typography
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
  }

  return (
    <Section area="bottomLeft" data-testid="trade-history-section">
      <Container>
        <Typography color="gray.500" mb={1}>
          {t('trade-history')}
        </Typography>
        <br />
        <Header>
          <PriceHeader />
          <Typography color="gray.500" textAlign="right" m={0}>
            {t('amount')}
          </Typography>
          <Typography color="gray.500" textAlign="right" m={0}>
            {t('time')}
          </Typography>
        </Header>
        <Trades>
          <TradesWrapper>
            {hasTradeHistory ? (
              renderHistory()
            ) : (
              <Typography color="gray.600" textAlign="center" m={4}>
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
  asset: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired
}

TradeHistory.defaultProps = {
  orders: []
}
export default withAssetTradeHistoryQuery(TradeHistory)
