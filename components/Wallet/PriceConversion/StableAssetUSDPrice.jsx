import PropTypes from 'prop-types'
import { formatUSDPrice } from '@/components/helpers'
// import { withAlgorandPriceQuery } from '@/hooks/withAlgoExplorer'
import { withCurrentAssetPricesQuery } from '@/hooks/withAlgoExplorer'

export function StableAssetUSDPrice({ asaWorth, priceToConvert, currency, usdPrice, assetId }) {
  console.log(assetId)
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
  usdPrice: PropTypes.any,
  assetId: PropTypes.number
}

StableAssetUSDPrice.defaultProps = {
  priceToConvert: 0,
  algoPrice: 0,
  asaWorth: 1,
  currency: ''
}

// export default withAlgorandPriceQuery(USDPrice)
export default withCurrentAssetPricesQuery(StableAssetUSDPrice)
