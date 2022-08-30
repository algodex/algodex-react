import PropTypes from 'prop-types'
import { formatUSDPrice } from '@/components/helpers'
import { withAlgorandPriceQuery } from '@algodex/algodex-hooks'
export function USDPrice({ algoPrice, asaWorth, priceToConvert, currency }) {
  return (
    <span data-testid="USDprice-element">
      {currency}
      {formatUSDPrice(asaWorth * priceToConvert * algoPrice)}
    </span>
  )
}

USDPrice.propTypes = {
  algoPrice: PropTypes.any,
  priceToConvert: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  asaWorth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  currency: PropTypes.string
}

USDPrice.defaultProps = {
  priceToConvert: 0,
  algoPrice: 0,
  asaWorth: 1,
  currency: ''
}

export default withAlgorandPriceQuery(USDPrice)
