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
import withQuery from '../utils/withQuery';

const refetchInterval = 3000;

const components = {
  Loading: Spinner,
  ServiceError,
};

/**
 * With Search Results Query
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {Object} [options] Options to pass to withQuery
 * @return {JSX.Element}
 */
export function withSearchResultsQuery(Component, options) {
  return withQuery(Component, {
    hook: useSearchResultsQuery,
    components,
    ...options,
  });
}

/**
 * Use Search Results Query
 * @param {Object} props The props of the parent
 * @param {string} props.query Search Query
 * @param {Object} [props.options] useQuery Options
 * @return {object}
 */
export function useSearchResultsQuery({
  query = '',
  options = {
    refetchInterval: query === '' ? refetchInterval : 20000,
  },
} = {}) {
  const {http} = useAlgodex();
  const {data, isError, error, ...rest} = useQuery(
      ['searchResults', {query}],
      () => http.dexd.searchAssets(query),
      options,
  );

  return {data, isError, error, ...rest};
}
export default useSearchResultsQuery;
