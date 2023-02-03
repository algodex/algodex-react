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
import axios from 'axios'
export const fetchCurrentPrices = async () => {
  // const url = `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.NEXT_PUBLIC_PORTAL_ID}/${formId}`
  const url = `https://testnet.analytics.tinyman.org/api/v1/current-asset-prices/`
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // }
  const response = await axios
    .get(url)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error
    })

  return response
}

import PropTypes from 'prop-types'
import { formatUSDPrice } from '@/components/helpers'
import { withAlgorandPriceQuery } from '@/hooks'
export function USDPrice({ algoPrice, asaWorth, priceToConvert, currency }) {
  // const res = fetchCurrentPrices()
  return (
    <span data-testid="USDprice-element">
      {currency}
      {formatUSDPrice(asaWorth * priceToConvert * algoPrice)}
    </span>
  )
}

USDPrice.propTypes = {
  algoPrice: PropTypes.any,
  priceToConvert: PropTypes.number,
  asaWorth: PropTypes.number,
  currency: PropTypes.string
}

USDPrice.defaultProps = {
  priceToConvert: 0,
  algoPrice: 0,
  asaWorth: 1,
  currency: ''
}

export default withAlgorandPriceQuery(USDPrice)
