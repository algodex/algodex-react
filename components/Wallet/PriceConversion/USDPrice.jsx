import { withAlgorandPriceQuery } from '@/hooks/withAlgoExplorer'
import PropTypes from 'prop-types'

export function USDPrice({ asaWorth, algoPrice, priceToConvert, currency }) {
  return (
    <span data-testid="USDprice-element">
      {currency}
      {(asaWorth * priceToConvert * algoPrice).toLocaleString()}
    </span>
  )
}

USDPrice.propTypes = {
  algoPrice: PropTypes.any,
  priceToConvert: PropTypes.number,
  asaWorth: PropTypes.number,
  currency: PropTypes.string
}

USDPrice.defaultProps = {
  priceToConvert: 0,
  algoPrice: 0,
  asaWorth: 1,
  currency: ''
}

export default withAlgorandPriceQuery(USDPrice)
