/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// import { BodyCopy, HeaderSmInter, LabelLg } from '@/components/Typography'

import Icon from '@mdi/react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import convertFromAsaUnits from '@algodex/algodex-sdk/lib/utils/units/fromAsaUnits'
import floatToFixed from '@algodex/algodex-sdk/lib/utils/format/floatToFixed'
import { formatUSDPrice } from '@/components/helpers'
import { mdiApproximatelyEqual } from '@mdi/js'
import { withAlgorandPriceQuery } from '@algodex/algodex-hooks'
import { useMemo } from 'react'

export function OrderBookPriceInfo({ algoPrice, asset }) {
  return useMemo(() => {
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
          <Typography variant="subtitle_small_bold">
            ${formatUSDPrice(algoPrice * asaValue)}
          </Typography>
        </div>
      </>
  )}, [algoPrice, asset])
}

OrderBookPriceInfo.propTypes = {
  asset: PropTypes.object,
  algoPrice: PropTypes.any
}

export default withAlgorandPriceQuery(OrderBookPriceInfo)
