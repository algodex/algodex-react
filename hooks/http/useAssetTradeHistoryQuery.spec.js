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

import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import useAssetTradeHistoryQuery from './useAssetTradeHistoryQuery.js';
import {wrapper} from '../../test/setup.js';

describe('Fetch Trade History', () => {
  it('should fetch asset trade history', async () => {
    // jest.setTimeout(60000);
    const asset = {
      id: 69410904,
    };
    if (process.env.TEST_ENV !== 'integration') {
      nock('https://testnet.algodex.com/algodex-backend')
          .get(`/trade_history.php?assetId=${asset.id}`)
          .reply(200, require('../../spec/fetchAssetTradeHistory.json'));
    }
    const {result, waitFor} = renderHook(
        () => useAssetTradeHistoryQuery({asset}),
        {wrapper},
    );
    await waitFor(() => {
      return result.current.isSuccess;
    });

    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(Object.keys(result.current.data)).toEqual(['orders']);
  });
});
