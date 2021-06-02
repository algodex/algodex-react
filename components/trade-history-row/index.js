import { format } from 'date-fns'
import { RowContainer, RowItem } from './trade-history-row.css'
import styled from 'styled-components'

const Currency = styled.span`
  color: ${({ theme }) => theme.colors.gray[500]};
`

function TradeHistoryRow({ date, pair, side, price, executed, fee }) {
  let color = 'grey'
  side === 'buy' && (color = 'green')
  side === 'sell' && (color = 'red')

  return (
    <RowContainer>
      <RowItem>{format(date, 'yyyy-MM-dd HH:mm:ss')}</RowItem>
      <RowItem uppercase>
        {`${pair[0]}`}
        <Currency>{`/${pair[1]}`}</Currency>
      </RowItem>
      <RowItem uppercase color={color}>
        {side}
      </RowItem>
      <RowItem justify="flex-end">
        {price}
        <Currency>{`/${pair[1]}`}</Currency>
      </RowItem>
      <RowItem justify="flex-end">{executed}</RowItem>
      <RowItem justify="flex-end">
        {fee}
        <Currency>/ALGO</Currency>
      </RowItem>
      <RowItem justify="flex-end">
        {price * executed}
        <Currency>{`/${pair[1]}`}</Currency>
      </RowItem>
    </RowContainer>
  )
}

export default TradeHistoryRow

TradeHistoryRow.propTypes = {}
TradeHistoryRow.defaultProps = {}
