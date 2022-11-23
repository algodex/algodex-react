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
import floatToFixed from '@algodex/algodex-sdk/lib/utils/format/floatToFixed';
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
 * @param {JSX.Element} Component React Component
 * @param {object} [options] Extra options for hooks
 * @return {JSX.Element}
 */
export function withAssetTradeHistoryQuery(Component, options) {
  return withQuery(Component, {
    hook: useAssetTradeHistoryQuery,
    components,
    ...options,
  });
}

/**
 * Use Asset Trade History Query
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {Object} [props.options] useQuery Options
 * @return {object} Massaged React-Query
 */
export function useAssetTradeHistoryQuery({
  asset,
  options = {
    refetchInterval: 5000,
    staleTime: 3000,
  },
}) {
  const {http} = useAlgodex();
  const {id} = asset;
  const {data, ...rest} = useQuery(
      ['assetTradeHistory', {id}],
      () => http.dexd.fetchAssetTradeHistory(id),
      options,
  );

  const tradesData =
    data?.transactions.map((txn) => ({
      id: txn.PK_trade_history_id,
      type: txn.tradeType,
      price: floatToFixed(txn.formattedPrice),
      amount: txn.formattedASAAmount,
      timestamp: txn.unix_time * 1000,
    })) || [];

  return {data: {orders: tradesData}, ...rest};
}

export default useAssetTradeHistoryQuery;
