import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { LabelSm, BodyCopyTiny } from 'components/type'

import { Container, Header, HistoryRow, HistoryWrapper } from './trade-history.css'

function TradeHistory(props) {
  const { assetName, tradesData } = props

  const renderHistory = () =>
    tradesData
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((row) => (
        <HistoryRow key={`buy-${row.price}`} data-testid="trade-history-row">
          <BodyCopyTiny color="green.500" m={0}>
            {row.price}
          </BodyCopyTiny>
          <BodyCopyTiny color="gray.000" m={0}>
            {row.amount}
          </BodyCopyTiny>
          <BodyCopyTiny color="gray.000" textAlign="right" m={0}>
            {dayjs(row.timestamp).format('HH:mm:ss')}
          </BodyCopyTiny>
        </HistoryRow>
      ))

  return (
    <Container>
      <Header>
        <LabelSm color="gray.500">Price (ALGO)</LabelSm>
        <LabelSm color="gray.500">{`Amount (${assetName})`}</LabelSm>
        <LabelSm color="gray.500" textAlign="right">
          Time
        </LabelSm>
      </Header>
      <HistoryWrapper>{renderHistory()}</HistoryWrapper>
    </Container>
  )
}

TradeHistory.propTypes = {
  assetName: PropTypes.string.isRequired,
  tradesData: PropTypes.array.isRequired
}

export default TradeHistory
