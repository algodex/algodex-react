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

import {useQuery} from 'react-query';
const refetchInterval = 3000;
import withQuery from '../utils/withQuery';
import Spinner from '../components/Spinner';
import ServiceError from '../components/ServiceError';
import { getAlgodexApi } from '@/services/environment'

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
export function withNFTDetailsQuery(Component, options) {
  return withQuery(Component, {
    hook: useNFTDetailsQuery,
    components,
    ...options,
  });
}

/**
 * Use NFT Details Query
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {Object} [props.options] useQuery Options
 * @return {object} React Query Results
 */
export function useNFTDetailsQuery({
  asset,
  options = {
    refetchInterval,
  },
} = {}) {
  const api = getAlgodexApi();
  const {id} = asset;
  return useQuery(
      ['fetchExplorerAssetInfo', {id}],
      // () => api.http.explorer.fetchExplorerAssetInfo(id),
      () => api.http.explorer.fetchExplorerAssetInfo(100049775),
      options,
  );
}

export default useNFTDetailsQuery;
