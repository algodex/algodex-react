import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { BodyCopyTiny } from 'components/type'
import PriceHeader from 'components/price-header'

import { Container, Header, Trades, TradesWrapper, TradesRow } from './trade-history.css'

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
      .map((row) => (
        <TradesRow key={row.id} type={row.type} data-testid="trade-history-row">
          <BodyCopyTiny fontFamily="'Roboto Mono', monospace" color={getColor(row.type)} m={0}>
            {row.price.toFixed(3)}
          </BodyCopyTiny>
          <BodyCopyTiny
            fontFamily="'Roboto Mono', monospace"
            color="gray.400"
            textAlign="right"
            m={0}
            title={row.amount.toFixed(asset.decimals)}
          >
            {row.amount.toFixed(3)}
          </BodyCopyTiny>
          <BodyCopyTiny
            fontFamily="'Roboto Mono', monospace"
            color="gray.400"
            textAlign="right"
            m={0}
          >
            {dayjs(row.timestamp).format('HH:mm:ss')}
          </BodyCopyTiny>
        </TradesRow>
      ))
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
