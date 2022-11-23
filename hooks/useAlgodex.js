/*
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021-2022 Algodex VASP (BVI) Corp.
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

import {AlgodexContext} from './components/AlgodexContext';
import {useContext} from 'react';

import AlgodexApi from '@algodex/algodex-sdk/lib/AlgodexApi.js';

/**
 * @typedef {Object} AlgodexAPIHook
 * @property {AlgodexApi|boolean} algodex AlgodexAPI Instance or false
 * @property {boolean} isConnected Has connected wallets
 * @property {function} setWallet Set Wallets
 * @property {function} setAsset Set Asset
 * @property {function} setConfig Set AlgodexAPIConfig
 * @property {function} setAddresses Set Available Addresses
 * @property {((function(): Promise<void>)|*)} connect MyAlgo Connect
 */

/**
 * useAlgodexAPI
 *
 * Hooks for working with the algodex context. It constructs
 * an instance of AlgodexAPI
 *
 * @return {AlgodexAPIHook}
 */
export default function useAlgodex() {
  // Get AlgodexAPI Context
  const algodex = useContext(AlgodexContext);

  // Check connection status
  const isConnected = typeof algodex !== 'undefined' &&
    typeof algodex.wallet !== 'undefined' &&
    typeof algodex.wallet.address !== 'undefined' &&
    typeof algodex.wallet.connector !== 'undefined' &&
    algodex.wallet.connector.connected;

  // Return Algodex
  return {
    algodex,
    isConnected,
    http: algodex.http,
    wallet: algodex.wallet,
    setWallet: (...args)=>algodex.setWallet(...args),
    placeOrder: (...args)=>algodex.placeOrder(...args),
  };
}
