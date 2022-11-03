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

import config from '@/config.json'
import AlgodexApi from '@algodex/algodex-sdk'

export const getAlgodexEnvironment = () => {
  return process.env.NEXT_PUBLIC_ALGODEX_ENV || 'public_test'
}

export const getActiveNetwork = () => {
  return process.env.NEXT_PUBLIC_ALGORAND_NETWORK &&
    process.env.NEXT_PUBLIC_ALGORAND_NETWORK.toLowerCase() === 'mainnet'
    ? 'mainnet'
    : 'testnet'
}

export const getDefaultAsset = () => {
  // Default to LAMP (available on Testnet only)
  return process.env.NEXT_PUBLIC_DEFAULT_ASSET || 15322902
}

export const getAlgodexApi = () => {
  const configEnv =
    process.env.NEXT_PUBLIC_ALGORAND_NETWORK === 'mainnet' ? config.mainnet : config.testnet
  
  if (globalThis.location !== undefined) {
    configEnv.dexd.uri = configEnv.dexd.uri.replace('WINDOW_LOCATION', 
    globalThis.location.protocol + '//' + globalThis.location.host);
  } else if (process.env.NEXT_PUBLIC_ALGORAND_NETWORK === 'mainnet') {
    configEnv.dexd.uri = process.env.ALGODEX_API_V2;
  }

  const api = new AlgodexApi({ config: configEnv })
  return api;
}