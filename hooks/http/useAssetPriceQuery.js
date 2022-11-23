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
 * With Asset Price Query
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {object} [options] withQuery Options
 * @return {JSX.Element}
 */
export function withAssetPriceQuery(Component, options) {
  return withQuery(Component, {
    hook: useAssetPriceQuery,
    components,
    ...options,
  });
}
/**
 * Use Asset Price Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {Object} [props.options] useQuery Options
 * @todo: Consolidate with Search
 * @return {object} Massaged Query
 */
export function useAssetPriceQuery({
  asset: algorandAsset,
  options = {
    refetchInterval,
  },
} = {}) {
  const {http} = useAlgodex();
  const {id} = algorandAsset;
  const {data: dexAsset, ...rest} = useQuery(
      ['assetPrice', {id}],
      () => http.dexd.fetchAssetPrice(id),
      options,
  );
  const asset = useMemo(() => {
    return {
      ...algorandAsset,
      price_info: dexAsset,
    };
  }, [algorandAsset, dexAsset]);

  return {data: {asset}, ...rest};
}

export default useAssetPriceQuery;
