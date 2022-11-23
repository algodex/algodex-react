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

import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import useSearchResultsQuery from './useSearchResultsQuery.js';
import {wrapper} from '../test/setup.js';

describe('Fetch Search Result', () => {
  it('should fetch search result', async () => {
    const asset = {
      query: 'hello',
    };
    if (process.env.TEST_ENV !== 'integration') {
      nock('http://testnet-services-2.algodex.com:8080')
          .get(`/assets/search/${asset.query}`)
          .reply(200, require('../spec/searchAssets.json'));
    }
    const {result, waitFor} = renderHook(
        () => useSearchResultsQuery(asset),
        {wrapper},
    );
    await waitFor(() => {
      return result.current.isSuccess;
    }, {timeout: 1000}  );

    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(Object.keys(result.current.data)).toEqual(['assets']);
  });
});
