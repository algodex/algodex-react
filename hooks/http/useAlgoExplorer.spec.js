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

import {
  useAlgorandPriceQuery,
  useExplorerAssetInfo,
} from './useAlgoExplorer.js';

import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import {wrapper} from '../../test/setup.js';

describe.skip('useAlgoExplorer', () => {
  it('should fetch asset orders alone', async () => {
    const asset = {
      id: 69410904,
    };
    if (process.env.TEST_ENV !== 'integration') {
      nock('https://testnet.algoexplorerapi.io')
          .get(`/v1/asset/${asset.id}/info`)
          .reply(200, require('../../spec/fetchExplorerAssetInfo.json'));
    }
    const {result, waitFor} = renderHook(
        () => useExplorerAssetInfo({asset}),
        {wrapper},
    );
    await waitFor(() => {
      return result.current.isSuccess;
    }, {interval: 10000});
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(Object.keys(result.current.data)).toEqual(
        [
          'id', 'deleted',
          'txid', 'timestamp',
          'decimals', 'name',
          'txns', 'fullName',
          'circulating', 'verified',
          'url', 'total',
        ],
    );
  });
  it('should fetch algorand price', async () => {
    if (process.env.TEST_ENV !== 'integration') {
      nock(`https://price.algoexplorerapi.io`)
          .get(`/price/algo-usd`)
          .reply(200, require('../../spec/fetchAlgorandPrice.json'));
    }
    const {result, waitFor} = renderHook(
        () => useAlgorandPriceQuery(),
        {wrapper},
    );
    await waitFor(() => {
      return result.current.isSuccess;
    }, {interval: 10000});

    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(Object.keys(result.current.data)).toEqual(['algoPrice']);
    expect(typeof result.current.data.algoPrice).toBe('string');
  });
});
