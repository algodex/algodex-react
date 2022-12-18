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
import {useQuery} from 'react-query';
// const refetchInterval = 3000;
import withQuery from '../utils/withQuery';

const components = {
  Loading: Spinner,
  ServiceError,
};
/**
 *
 * @todo add to PlaceOrder
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {Object} [options]
 * @return {JSX.Element}
 */
export function withAssetOrdersQuery(Component, options) {
  return withQuery(Component, {
    hook: useAssetOrdersQuery,
    components,
    ...options,
  });
}

/**
 *
 * @param {object} asset
 * @param {object} options
 * @return {UseQueryResult<Object, unknown>}
 */
export function useAssetOrdersQuery({asset, options = {}}) {
  const {http} = useAlgodex();
  const {id} = asset;
  return useQuery(
      ['assetOrders', {id}],
      () => http.dexd.fetchAssetOrders(id),
      options,
  );
}

export default useAssetOrdersQuery;
