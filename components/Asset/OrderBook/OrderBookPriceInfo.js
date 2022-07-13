// import { BodyCopy, HeaderSmInter, LabelLg } from '@/components/Typography'

import Icon from '@mdi/react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import convertFromAsaUnits from '@algodex/algodex-sdk/lib/utils/units/fromAsaUnits'
import floatToFixed from '@algodex/algodex-sdk/lib/utils/format/floatToFixed'
import { formatUSDPrice } from '@/components/helpers'
import { mdiApproximatelyEqual } from '@mdi/js'
import { withAlgorandPriceQuery } from '@algodex/algodex-hooks'
export function OrderBookPriceInfo({ algoPrice, asset }) {
  const asaValue = floatToFixed(convertFromAsaUnits(asset?.price_info?.price, asset.decimals))
  return (
    <>
      <Typography variant="h5" color="white">
        {asaValue}
      </Typography>
      {asset && asset.price_info && (
        <Typography className="ml-3" data-testid="price-info">
          {(asset?.price_info?.price24Change &&
            `${floatToFixed(asset?.price_info?.price24Change, 2)}%`) ||
            '0.00%'}
        </Typography>
      )}
      <div className="flex items-center ml-4 text-gray-500">
        <Icon className="m-0 p-0" path={mdiApproximatelyEqual} title="Approximately" size={0.7} />
        <Typography variant="subtitle_medium_bold">
          ${formatUSDPrice(algoPrice * asaValue)}
        </Typography>
      </div>
    </>
  )
}

OrderBookPriceInfo.propTypes = {
  asset: PropTypes.object,
  algoPrice: PropTypes.any
}

export default withAlgorandPriceQuery(OrderBookPriceInfo)
