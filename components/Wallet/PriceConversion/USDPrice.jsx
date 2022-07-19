import PropTypes from 'prop-types'
import { formatUSDPrice } from '@/components/helpers'
// import { withAlgorandPriceQuery } from '@/hooks/withAlgoExplorer'
import { withCurrentAssetPricesQuery } from '@/hooks/withAlgoExplorer'

export function USDPrice({ asaWorth, algoPrice, priceToConvert, currency, usdPrice, asset }) {
  const displayPrice = asset?.isStable
    ? asaWorth * priceToConvert * usdPrice
    : asaWorth * priceToConvert * algoPrice

  return (
    <span data-testid="USDprice-element">
      {currency}
      {formatUSDPrice(displayPrice)}
    </span>
  )
}

USDPrice.propTypes = {
  algoPrice: PropTypes.any,
  priceToConvert: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  asaWorth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  currency: PropTypes.string,
  usdPrice: PropTypes.any,
  asset: PropTypes.any
}

USDPrice.defaultProps = {
  priceToConvert: 0,
  algoPrice: 0,
  asaWorth: 1,
  currency: ''
}

// export default withAlgorandPriceQuery(USDPrice)
export default withCurrentAssetPricesQuery(USDPrice)
