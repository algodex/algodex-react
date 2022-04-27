import { BodyCopy, HeaderSm, LabelLg } from '@/components/Typography'

import PropTypes from 'prop-types'
import { convertFromAsaUnits } from '@/services/convert'
import { floatToFixed } from '@/services/display'
import { formatUSDPrice } from '@/components/helpers'
import { withAlgorandPriceQuery } from 'hooks/withAlgoExplorer'

export function OrderBookPriceInfo({ algoPrice, asset }) {
  const asaValue = floatToFixed(convertFromAsaUnits(asset?.price_info?.price, asset.decimals))
  return (
    <>
      <HeaderSm>{asaValue}</HeaderSm>
      <BodyCopy data-testid="has-price-info" as="span">
        {(asset?.price_info?.price24Change &&
          `${floatToFixed(asset?.price_info?.price24Change, 2)}%`) ||
          '0.00%'}
      </BodyCopy>
      {console.log(algoPrice, asaValue, 'both here')}
      <LabelLg color="gray.500">=${formatUSDPrice(algoPrice * asaValue)}</LabelLg>
    </>
  )
}

OrderBookPriceInfo.propTypes = {
  asset: PropTypes.object,
  algoPrice: PropTypes.any
}

export default withAlgorandPriceQuery(OrderBookPriceInfo)
