import { BodyCopySm } from '@/components/Typography'
import { withUSDPriceQuery } from '@/hooks/withAlgodex'
import PropTypes from 'prop-types'

export function UsdPrice({ data, fontSize, priceToConvert, currency }) {
  console.log('algoData', data)
  console.log('priceToConvert', priceToConvert)
  return (
    <BodyCopySm fontFamily="'Open Sans Condensed', inherit" color={`gray.500`} fontSize={fontSize}>
      {currency} {(priceToConvert * data.algoPrice).toLocaleString()}
    </BodyCopySm>
  )
}

UsdPrice.propTypes = {
  /** Algorand price Information*/
  data: PropTypes.object.isRequired,
  /**  Price to convert to USD */
  priceToConvert: PropTypes.number.isRequired,
  /**  Font size to render the text as expected */
  fontSize: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired
}

UsdPrice.defaultProps = {
  data: { algoPrice: 70 },
  fontSize: '1rem',
  priceToConvert: 0,
  currency: ''
}

export default withUSDPriceQuery(UsdPrice)
