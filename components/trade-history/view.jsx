import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { BodyCopyTiny } from 'components/type'

import { Container, Header, Trades, TradesWrapper, TradesRow } from './trade-history.css'

function TradeHistoryView(props) {
  const { assetName, tradesData } = props

  const renderHistory = () => {
    const getColor = (type) => (type === 'buyASA' ? 'green.500' : 'red.500')

    return tradesData
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((row) => (
        <TradesRow key={row.id} type={row.type} data-testid="trade-history-row">
          <BodyCopyTiny color={getColor(row.type)} m={0}>
            {row.price}
          </BodyCopyTiny>
          <BodyCopyTiny color="gray.000" m={0}>
            {row.amount}
          </BodyCopyTiny>
          <BodyCopyTiny color="gray.000" textAlign="right" m={0}>
            {dayjs(row.timestamp).format('HH:mm:ss')}
          </BodyCopyTiny>
        </TradesRow>
      ))
  }

  return (
    <Container>
      <Header>
        <BodyCopyTiny color="gray.500" m={0}>
          Price (ALGO)
        </BodyCopyTiny>
        <BodyCopyTiny color="gray.500" m={0}>{`Amount (${assetName})`}</BodyCopyTiny>
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
  assetName: PropTypes.string.isRequired,
  tradesData: PropTypes.array.isRequired
}

export default TradeHistoryView
