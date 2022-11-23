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
import {
  useAssetOrderbookQuery,
} from './useAssetOrderbookQuery.js';
import {wrapper} from '../test/setup.js';

describe.skip('useAssetOrderbookQuery', () => {
  it('should fail on invalid asset id', ()=>{
    const {result} = renderHook(() => useAssetOrderbookQuery(
        {asset: {}},
    ), {wrapper});
    expect(result.error.message).toEqual('Must have valid id!');
  });
  it('should fail on invalid decimals', ()=>{
    const {result} = renderHook(() => useAssetOrderbookQuery(
        {asset: {id: 123456}},
    ), {wrapper});
    expect(result.error.message).toEqual('Must have valid decimals!');
  });
  it('should fetch asset chart', async () => {
    const asset = {
      id: 69410904,
      decimals: 10,
    };
    if (process.env.TEST_ENV !== 'integration') {
      nock('http://testnet-services-2.algodex.com:8080')
          .get(`/orders/asset/${asset.id}`)
          .reply(200, require('../spec/fetchAssetOrders.json'));
    }
    const {result, waitFor} = renderHook(() => useAssetOrderbookQuery(
        {asset},
    ), {wrapper});

    await waitFor(() => {
      return result.current.isSuccess;
    }, {timeout: 1000} );

    // TODO: Check the response parts not the entire object.
    // Break up into validation
    expect(result.current.data).toEqual({
      'isLoading': false,
      'orders': {
        'buy': [
          {
            'amount': 0.000404,
            'price': '1234.123450',
            'total': 0.000404,
          },
        ],
        'sell': [
          {
            'amount': 1,
            'price': '1234.123450',
            'total': 1,
          },
        ],
      },
    });
  });
});

