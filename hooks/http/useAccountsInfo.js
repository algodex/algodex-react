/*
 * Algodex Hooks
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

import useAlgodex from '../useAlgodex';
import {useQuery} from 'react-query';

/**
 * Bulk Fetch Account Info
 * @return {UseQueryResult<Object, unknown>}
 */
function useAccountsInfo() {
  const {algodex} = useAlgodex();

  const hasAddresses = typeof algodex !== 'undefined' &&
    typeof algodex.addresses !== 'undefined' &&
    algodex.addresses.length > 0;

  // TODO move to a proper useAllAccountsInfo
  return useQuery(
      ['fetchAccounts', algodex.addresses?.map((w)=>w.address)],
      () => algodex.http.indexer.fetchAccounts(algodex.addresses),
      {
        enabled: hasAddresses,
        refetchInterval: 3000,
      },
  );
}

module.exports = useAccountsInfo;
