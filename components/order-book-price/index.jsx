import PropTypes from 'prop-types'
import { Price, PriceIcon, PercentChange } from './order-book-price.css'
import { floatToFixed } from 'services/display'

function OrderBookPrice(props) {
  const { price, change } = props

  const isDecrease = change < 0
  const color = isDecrease ? 'red' : 'green'

  return (
    <Price data-testid="order-book-price">
      <PriceIcon use="algoLogo" size={0.9} />
      {floatToFixed(price)}
      <PercentChange color={color}>{`${floatToFixed(change, 2)}%`}</PercentChange>
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
