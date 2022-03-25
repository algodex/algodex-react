import { withAlgorandPriceQuery } from '@/hooks/withAlgoExplorer'
import PropTypes from 'prop-types'

export function USDPrice({ algoPrice, priceToConvert }) {
  return <>${(priceToConvert * algoPrice).toLocaleString()}</>
}

USDPrice.propTypes = {
  algoPrice: PropTypes.any,
  priceToConvert: PropTypes.number
}

USDPrice.defaultProps = {
  priceToConvert: 0,
  algoPrice: 0
}

export default withAlgorandPriceQuery(USDPrice)
