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

const unrestrictedAssets = {
  31566704: 'USDC', //USDC
  465865291: 'STBL', //STBL
  386192725: 'goBTC', //goBTC
  386195940: 'goETH', //goETH
  793124631: 'gALGO', //gALGO
  441139422: 'goMINT', //goMINT
  312769: 'USDt', //USDt
  19386452: 'goETH Testet',
  15322902: 'LAMP', // LAMP Testnet
  26707058: 'SEDU', // SEDU Testnet
  15921880: 'HEAP' // HEAP Testnet
}

const NETWORK_TYPE = process.env.NEXT_PUBLIC_ALGORAND_NETWORK
export function getIsRestricted(id) {
  if (NETWORK_TYPE !== 'mainnet') return false
  return !Object.keys(unrestrictedAssets).includes(id.toString())
}

export function getIsRestrictedCountry(query) {
  if (NETWORK_TYPE !== 'mainnet') return false
  return query?.cc === 'US' || query?.cc === 'CA'
}

export function getAssetTotalStatus(total) {
  if (NETWORK_TYPE !== 'mainnet') return false
  if (typeof total === 'undefined') return false
  if (total > 1000) {
    return true
  } else {
    return false
  }
}
