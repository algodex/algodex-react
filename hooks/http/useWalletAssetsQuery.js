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

/**
 *
 * @type {{ServiceError, Loading}}
 */
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
export function withWalletAssetsQuery(Component, options) {
  return withQuery(Component, {
    hook: useWalletAssetsQuery,
    components,
    ...options,
  });
}
/**
 * @deprecated
 * @param {object} data
 * @return {null|*}
 */
export const mapAssetsData = (data) => {
  if (!data || !data.allAssets || !data.allAssets.length) {
    return null;
  }

  const {allAssets: assetsData} = data;

  return assetsData.map(
      ({
        unit_name,
        name,
        formattedTotalASAAmount,
        formattedASAAvailable,
        formattedASAInOrder,
        formattedTotalAlgoEquiv,
        assetId,
      }) => {
        return {
          'unit': unit_name,
          'id': assetId,
          name,
          'total': formattedTotalASAAmount || '',
          'available': formattedASAAvailable || '',
          'in-order': formattedASAInOrder || '',
          'algo-value': formattedTotalAlgoEquiv || '',
        };
      },
  );
};
/**
 * Use Wallet Assets Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @todo: Fetch Wallet Assets from on-chain
 * @return {object}
 */
export function useWalletAssetsQuery({
  wallet: {address},
  options = {
    enabled: typeof address !== 'undefined',
    refetchInterval,
  },
}) {
  const {http} = useAlgodex();
  const {data, ...rest} = useQuery(
      ['walletAssets', {address}],
      () => http.dexd.fetchWalletAssets(address),
      options,
  );
  const assets = useMemo(() => mapAssetsData(data), [data]);
  return {data: {assets}, ...rest};
}

export default useWalletAssetsQuery;
