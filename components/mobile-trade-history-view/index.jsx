import PropTypes from 'prop-types'
import {
  Container,
  Header,
  Trades,
  TradesWrapper,
  TradesRow
} from './mobile-trade-history-view.css'
import PriceHeader from 'components/price-header'
import { BodyCopyTiny } from 'components/type'
import dayjs from 'dayjs'

function MobileTradeHistoryView({ asset, tradesData }) {
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
          <BodyCopyTiny
            fontFamily="'Roboto Mono', monospace"
            color={getColor(row.type)}
            title={row.price.toFixed(6)}
            m={0}
          >
            {row.price.toFixed(3)}
          </BodyCopyTiny>
          <BodyCopyTiny
            fontFamily="'Roboto Mono', monospace"
            color="gray.400"
            textAlign="right"
            title={row.amount.toFixed(asset.decimals)}
            m={0}
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

export default MobileTradeHistoryView

MobileTradeHistoryView.propTypes = {
  asset: PropTypes.object,
  tradesData: PropTypes.arrayOf(PropTypes.object)
}
