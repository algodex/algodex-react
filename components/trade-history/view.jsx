import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import Big from 'big.js'
import { BodyCopyTiny } from 'components/type'
import PriceHeader from 'components/price-header'
import { floatToFixed } from 'services/display'

import { Container, Header, Trades, TradesWrapper, TradesRow } from './trade-history.css'

import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

function TradeHistoryView(props) {
  const { asset, tradesData } = props

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
            <BodyCopyTiny
              fontFamily="'Roboto Mono', monospace"
              color={getColor(row.type)}
              title={row.price}
              m={0}
            >
              {floatToFixed(row.price)}
            </BodyCopyTiny>
            <BodyCopyTiny
              fontFamily="'Roboto Mono', monospace"
              color="gray.400"
              textAlign="right"
              title={amount.toFixed(asset.decimals)}
              m={0}
            >
              {amount.toFixed(Math.min(3, asset.decimals))}
            </BodyCopyTiny>
            <BodyCopyTiny
              fontFamily="'Roboto Mono', monospace"
              color="gray.400"
              textAlign="right"
              title={dayjs(row.timestamp).format('lll')}
              m={0}
            >
              {dayjs(row.timestamp).format('HH:mm:ss')}
            </BodyCopyTiny>
          </TradesRow>
        )
      })
  }

  return (
    <Container>
      <Header>
        <PriceHeader />
        <BodyCopyTiny color="gray.500" textAlign="right" m={0}>
          Amount
        </BodyCopyTiny>
        <BodyCopyTiny color="gray.500" textAlign="right" m={0}>
          Time
        </BodyCopyTiny>
      </Header>
      <Trades>
        <TradesWrapper>{renderHistory()}</TradesWrapper>
      </Trades>
    </Container>
  )
}

TradeHistoryView.propTypes = {
  asset: PropTypes.object.isRequired,
  tradesData: PropTypes.array.isRequired
}

export default TradeHistoryView
