import { BodyCopySm } from '@/components/Typography'
import { withUSDPriceQuery } from '@/hooks/withAlgodex'
import PropTypes from 'prop-types'

export function UsdPrice({ data, fontSize, priceToConvert }) {
  console.log('algoData', data)
  console.log('priceToConvert', priceToConvert)
  return (
    <BodyCopySm fontFamily="'Roboto Mono', monospace" color={`gray.500`} fontSize={fontSize}>
      ${(priceToConvert * data.algoPrice).toLocaleString()}
    </BodyCopySm>
  )
}

UsdPrice.propTypes = {
  /**
   * Algorand price Information
   */
  data: PropTypes.object.isRequired,

  /**
   * Price to convert to USD
   */
  priceToConvert: PropTypes.number.isRequired
}

UsdPrice.defaultProps = {
  data: { algoPrice: '' },
  priceToConvert: 0
}

export default withUSDPriceQuery(UsdPrice)
