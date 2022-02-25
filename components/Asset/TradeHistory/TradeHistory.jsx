import { floatToFixed } from 'services/display'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { rgba } from 'polished'
import useTranslation from 'next-translate/useTranslation'
import Icon from 'components/Icon'
import Big from 'big.js'
import dayjs from 'dayjs'
import { Section } from '@/components/Layout/Section'
import { withAssetTradeHistoryQuery } from '@/hooks/withAlgodex'
import Typography from '@mui/material/Typography'

const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background.dark};
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
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 12px grey;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme, color = 'gray', gradient = 600 }) => theme.colors[color][gradient]};
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme, color = 'gray', gradient = 400 }) => theme.colors[color][gradient]};
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
      return rgba(theme.colors[color]['500'], 0.15)
    }};

    p {
      &:not(:first-child) {
        color: ${({ theme }) => theme.colors.gray['000']};
      }
    }
  }
`

const PriceHeaderBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  color: ${({ theme }) => theme.colors.gray['500']};

  svg {
    margin-left: 0.25rem;
  }
`

const PriceHeader = () => {
  const { t } = useTranslation('common')
  return (
    <PriceHeaderBox>
      <Typography variant="bodyCopyTiny">{t('price')}</Typography>
      <Icon use="algoLogo" size={0.625} />
    </PriceHeaderBox>
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
              component="p"
              variant="bodyCopyTinyMono"
              color={getColor(row.type)}
              title={row.price}
              m={0}
            >
              {floatToFixed(row.price)}
            </Typography>
            <Typography
              component="p"
              variant="bodyCopyTinyMono"
              color="gray.400"
              textAlign="right"
              title={amount.toFixed(asset.decimals)}
              m={0}
            >
              {amount.toFixed(Math.min(3, asset.decimals))}
            </Typography>
            <Typography
              component="p"
              variant="bodyCopyTinyMono"
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
        <Typography variant="headerCaps" color="gray.500" mb={1}>
          {t('trade-history')}
        </Typography>
        <br />
        <Header>
          <PriceHeader />
          <Typography variant="bodyCopyTiny" component="p" color="gray.500" textAlign="right">
            {t('amount')}
          </Typography>
          <Typography variant="bodyCopyTiny" component="p" color="gray.500" textAlign="right">
            {t('time')}
          </Typography>
        </Header>
        <Trades>
          <TradesWrapper>
            {hasTradeHistory ? (
              renderHistory()
            ) : (
              <Typography variant="bodyCopyTiny" component="p" color="gray.600" textAlign="center">
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
