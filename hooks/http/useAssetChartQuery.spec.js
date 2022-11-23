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

import '../test/nock';

import {
  sortByASAPrice,
  sortPriceByTime,
  useAssetChartQuery,
} from './useAssetChartQuery.js';

import asset from '../spec/Asset.json';
import chart from '../spec/Chart.json';
import {renderHook} from '@testing-library/react-hooks';
import {wrapper} from '../test/setup.js';

describe('Fetch Asset Chart', () => {
  it('should fetch asset chart', async () => {
    const {result, waitFor} = renderHook(
        () => useAssetChartQuery({
          interval: chart.interval, asset,
        }),
        {wrapper},
    );

    await waitFor(() => {
      return result.current.isSuccess;
    }, {timeout: 1000} );
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(Object.keys(result.current.data)).toEqual(
        ['overlay', 'volume', 'ohlc', 'isLoading', 'isError'],
    );
  });
  it('should sort by ASA Price', ()=>{
    const unsorted = [{asaPrice: 123}, {asaPrice: 12345}];
    expect(unsorted.sort(sortByASAPrice)).toEqual(
        [{asaPrice: 12345}, {asaPrice: 123}],
    );
  });
  it('should sort price by time', ()=>{
    const unsorted = [{time: 1234}, {time: 123}];
    expect(unsorted.sort(sortPriceByTime)).toEqual([
      {
        'time': 123,
      },
      {
        'time': 1234,
      },
    ]);
  });
});
