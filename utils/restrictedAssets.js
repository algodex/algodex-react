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

const unrestrictedAssets = {
  31566704: 'USDC', //USDC
  465865291: 'STBL', //STBL
  841126810: 'STBL2', //STBL2
  386192725: 'goBTC', //goBTC
  386195940: 'goETH', //goETH
  793124631: 'gALGO', //gALGO
  441139422: 'goMINT', //goMINT
  312769: 'USDt', //USDt
  684649988: 'GARD', //GARD
  744665252: 'pBTC', //pTokens BTC
  792313023: 'xSOL', //xSOL
  672913181: 'goUSD', //goUSD
  694432641: 'gALGO3', //gALGO3
  2757561: 'rUSD', //realioUSD
  320259224: 'wALGO', //Wrapped Algo
  19386452: 'goETH Testet',
  15322902: 'LAMP', // LAMP Testnet
  26707058: 'SEDU', // SEDU Testnet
  15921880: 'HEAP', // HEAP Testnet
  23156562: 'CHAIR' // CHAIR Testnet
}

const NETWORK_TYPE = process.env.NEXT_PUBLIC_ALGORAND_NETWORK
export function getIsRestricted(id) {
  if (NETWORK_TYPE !== 'mainnet') return false
  // The asset is restricted since it is not in the unrestricted map
  return unrestrictedAssets[id.toString()] === undefined
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
