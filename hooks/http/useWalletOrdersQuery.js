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

import ServiceError from '../components/ServiceError';
import Spinner from '../components/Spinner';
import useAlgodex from '../useAlgodex.js';
import {useMemo} from 'react';
import {useQuery} from 'react-query';
import withQuery from '../utils/withQuery';
const refetchInterval = 3000;

const components = {
  Loading: Spinner,
  ServiceError,
};

/**
 *
 * @param {JSX.Element} Component
 * @param {object} [options]
 * @return {JSX.Element}
 */
export function withWalletOrdersQuery(Component, options) {
  return withQuery(Component, {
    hook: useWalletOrdersQuery,
    components,
    ...options,
  });
}

/**
 * Use Wallet Orders Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @return {object}
 */
export function useWalletOrdersQuery({
  wallet,
  options = {refetchInterval},
}) {
  const {address} = wallet;
  const {http} = useAlgodex();

  // FIXME: The asset names are also fetched from the search results
  // as a backup method.
  // This is due to some 1.0 server-side issues where the asset names
  // are not always fetched.
  const {data: assetSearchData} = useQuery(
      ['searchResults'],
      () => http.dexd.searchAssets(''),
      options,
  );

  const {data, ...rest} = useQuery(
      ['walletOrders', {address}],
      () => http.dexd.fetchWalletOrders(address),
      options,
  );

  const orders = useMemo(() => http.dexd.mapOpenOrdersData(data,
      assetSearchData), [data, assetSearchData]);
  return {data: {orders}, ...rest};
}

export default useWalletOrdersQuery;
