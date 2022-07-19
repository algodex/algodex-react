import PropTypes from 'prop-types'
import { formatUSDPrice } from '@/components/helpers'
import { withCurrentAssetPricesQuery } from '@/hooks/withAlgoExplorer'

export function StableAssetUSDPrice({ asaWorth, priceToConvert, currency, usdPrice }) {
  return (
    <span data-testid="USDprice-element">
      {currency}
      {formatUSDPrice(asaWorth * priceToConvert * usdPrice)}
    </span>
  )
}

StableAssetUSDPrice.propTypes = {
  priceToConvert: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  asaWorth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  currency: PropTypes.string,
  usdPrice: PropTypes.any
}

StableAssetUSDPrice.defaultProps = {
  priceToConvert: 0,
  asaWorth: 1,
  currency: '',
  usdPrice: 1
}

export default withCurrentAssetPricesQuery(StableAssetUSDPrice)
