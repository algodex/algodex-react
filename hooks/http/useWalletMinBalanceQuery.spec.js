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
import useWalletMinBalanceQuery from './useWalletMinBalanceQuery.js';
import {wrapper} from '../test/setup.js';

describe('Fetch Wallet Minimum Balance', () => {
  it('should fetch minimum balance from wallet', async () => {
    const wallet = {
      address: 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
      includesFullAccountInfo: true,
    };
    if (process.env.TEST_ENV !== 'integration') {
      nock('https://algoindexer.testnet.algoexplorerapi.io/v2/accounts/')
          .get(wallet.address)
          .reply(
              200,
              require('../spec/fetchAccountInfo.json'),
          );
    }
    const {result, waitFor} = renderHook(
        () => useWalletMinBalanceQuery({wallet}),
        {wrapper},
    );

    await waitFor(() => {
      return result.current.isSuccess;
    }, {timeout: 1000}  );
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(typeof result.current.data).toBe('number');
  });
});
