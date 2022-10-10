/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2022 Algodex VASP (BVI) Corp.
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

import React from 'react'
import { USDPrice as Component } from './USDPrice'

export default {
  title: '@algodex/recipes/Wallet/Price Conversion',
  component: Component,
  parameters: { layout: 'fullscreen' },
  args: {
    isRegenerate: false,
    algoPrice: 260,
    priceToConvert: 3000,
    currency: '$'
  }
}

/* eslint-disable */
export const USDPrice = ({ isRegenerate, algoPrice, priceToConvert, currency, ...props }) => {
  if (isRegenerate) {
    algoPrice = 0
  }
  return (
    <Component
      algoPrice={algoPrice}
      priceToConvert={priceToConvert}
      currency={currency}
      {...props}
    />
  )
}
