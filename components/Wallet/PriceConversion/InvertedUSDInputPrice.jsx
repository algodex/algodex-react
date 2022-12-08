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

import PropTypes from 'prop-types'
import { formatUSDPrice } from '@/components/helpers'
import { withOtherAssetPriceQuery } from '@/hooks'
import { useRouter } from 'next/router'

export function InvertedUSDInputPrice(props) {
	const { query } = useRouter()
	const invertedAssetPrice = props[`${query.id}`]?.price
	const { asaWorth, priceToConvert, currency } = props
	if (invertedAssetPrice) {
		return (
			<span data-testid="USDprice-element">
				{currency}
				{formatUSDPrice(asaWorth * priceToConvert * invertedAssetPrice)}
			</span>
		)
	} else {
		return <>No USD Price</>
	}

}

InvertedUSDInputPrice.propTypes = {
	priceToConvert: PropTypes.number,
	asaWorth: PropTypes.number,
	currency: PropTypes.string
}

InvertedUSDInputPrice.defaultProps = {
	priceToConvert: 0,
	asaWorth: 1,
	currency: ''
}

export default withOtherAssetPriceQuery(InvertedUSDInputPrice)
