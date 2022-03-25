import { withAlgorandPriceQuery } from '@/hooks/withAlgoExplorer'
import PropTypes from 'prop-types'

export function USDPrice({ algoPrice, priceToConvert, currency }) {
  return (
    <>
      {currency}
      {(priceToConvert * algoPrice).toLocaleString()}
    </>
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
