import { BodyCopySm } from '@/components/Typography'
import { withAlgorandPriceQuery } from '@/hooks/withAlgoExplorer'
import PropTypes from 'prop-types'

export function UsdPrice({ algoPrice, priceToConvert, currency, ...props }) {
  return (
    <BodyCopySm fontFamily="'Open Sans Condensed', inherit" color={`gray.500`} {...props}>
      {currency} {(priceToConvert * algoPrice).toLocaleString()}
    </BodyCopySm>
  )
}

UsdPrice.propTypes = {
  algoPrice: PropTypes.number,
  priceToConvert: PropTypes.number,
  currency: PropTypes.string
}

UsdPrice.defaultProps = {
  priceToConvert: 0,
  algoPrice: 0,
  currency: '$'
}

export default withAlgorandPriceQuery(UsdPrice)
