import { withAlgorandPriceQuery } from '@algodex/algodex-hooks'
import PropTypes from 'prop-types'

export function USDPrice({ algoPrice, priceToConvert, currency }) {
  return (
    <span data-testid="USDprice-element">
      {currency}
      {(priceToConvert * algoPrice).toLocaleString()}
    </span>
  )
}

USDPrice.propTypes = {
  algoPrice: PropTypes.any,
  priceToConvert: PropTypes.number,
  currency: PropTypes.string
}

USDPrice.defaultProps = {
  priceToConvert: 0,
  algoPrice: 0,
  currency: ''
}

export default withAlgorandPriceQuery(USDPrice)
