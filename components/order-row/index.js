import { format } from 'date-fns'
import { CancelButton, RowContainer, RowItem } from './order-row.css'
import styled from 'styled-components'

const Currency = styled.span`
  color: ${({ theme }) => theme.colors.gray[500]};
`

function OrderRow({ date, pair, type, filled, price, amount }) {
  let color = 'grey'
  type === 'buy' && (color = 'green')
  type === 'sell' && (color = 'red')

  return (
    <RowContainer>
      <RowItem>{format(date, 'yyyy-MM-dd HH:mm:ss')}</RowItem>
      <RowItem uppercase>
        {`${pair[0]}`}
        <Currency>{`/${pair[1]}`}</Currency>
      </RowItem>
      <RowItem uppercase color={color}>
        {type}
      </RowItem>
      <RowItem justify="flex-end">
        {price}
        <Currency>{`/${pair[1]}`}</Currency>
      </RowItem>
      <RowItem justify="flex-end">{amount}</RowItem>
      <RowItem justify="flex-end">{`${(filled > 0 ? amount / filled : 0).toFixed(2)}%`}</RowItem>
      <RowItem justify="flex-end">
        {price * amount}
        <Currency>{`/${pair[1]}`}</Currency>
      </RowItem>
      <RowItem justify="flex-end">
        <CancelButton>Cancel</CancelButton>
      </RowItem>
    </RowContainer>
  )
}

export default OrderRow

OrderRow.propTypes = {}
OrderRow.defaultProps = {}
