import { BodyCopy, HeaderSmInter, LabelLg } from '@/components/Typography'

import Icon from '@mdi/react'
import PropTypes from 'prop-types'
import { convertFromAsaUnits } from '@/services/convert'
import { floatToFixed } from '@/services/display'
import { formatUSDPrice } from '@/components/helpers'
import { mdiApproximatelyEqual } from '@mdi/js'
import { withAlgorandPriceQuery } from 'hooks/withAlgoExplorer'

export function OrderBookPriceInfo({ algoPrice, asset }) {
  const asaValue = floatToFixed(convertFromAsaUnits(asset?.price_info?.price, asset.decimals))
  return (
    <>
      <HeaderSmInter color="white">{asaValue}</HeaderSmInter>
      {asset && asset.price_info && (
        <BodyCopy data-testid="price-info" as="span">
          {(asset?.price_info?.price24Change &&
            `${floatToFixed(asset?.price_info?.price24Change, 2)}%`) ||
            '0.00%'}
        </BodyCopy>
      )}
      <div className="flex items-center ml-4 text-gray-500">
        <Icon className="m-0 p-0" path={mdiApproximatelyEqual} title="Approximately" size={0.7} />
        <LabelLg as="p">${formatUSDPrice(algoPrice * asaValue)}</LabelLg>
      </div>
    </>
  )
}

OrderBookPriceInfo.propTypes = {
  asset: PropTypes.object,
  algoPrice: PropTypes.any
}

export default withAlgorandPriceQuery(OrderBookPriceInfo)
