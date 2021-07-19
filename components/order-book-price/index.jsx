import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ArrowUp, ArrowDown } from 'react-feather'
import { displayPrice } from 'services/display'

const Price = styled.p`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme, color }) => theme.colors[color]['500']};
  margin: 0;

  svg {
    margin-right: 0.5rem;
  }
`

function OrderBookPrice(props) {
  const { price, change } = props

  const isDecrease = change < 0
  const color = isDecrease ? 'red' : 'green'

  return (
    <Price color={color} data-testid="order-book-price">
      {isDecrease ? <ArrowDown data-testid="arrow-down" /> : <ArrowUp data-testid="arrow-up" />}
      {displayPrice(price)}
    </Price>
  )
}

OrderBookPrice.propTypes = {
  price: PropTypes.number.isRequired,
  change: PropTypes.number.isRequired,
  decimals: PropTypes.number
}

OrderBookPrice.defaultProps = {
  decimals: 3
}

export default OrderBookPrice
