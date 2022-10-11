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

import { PlaceOrderForm as Component } from './Form'
// import generateAsset, { Example } from 'spec/Asset'
import { Example } from 'spec/Asset'

export default {
  title: '@algodex/recipes/Wallet/Place Order Form',
  component: Component,
  parameters: { layout: 'fullscreen' },
  args: {
    isRegenerate: false,
    asset: Example,
    wallet: {
      address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I',
      balance: 100,
      assets: {
        [Example.id]: {
          balance: 100
        }
      }
    },
    onSubmit: (e) => {
      let order = {
        amount: e.target.amount.value,
        type: e.target.type.value,
        price: e.target.price.value,
        total: e.target.total.value,
        asset: e.target.asset.value
        // execution: e.target.execution.value
      }
      console.log(order)
      e.preventDefault()
    }
  }
}

/* eslint-disable */
// export const PlaceOrderForm = ({isRegenerate, asset, wallet, ...props}) => {
//   if (isRegenerate) {
//     asset = generateAsset()
//     wallet.assets[asset.id] = wallet.assets[Example.id]
//   }
//   return <Component asset={asset} wallet={wallet} {...props} />
// }
