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

// import ValidationError from '@algodex/algodex-sdk/lib/error/ValidationError';
import {renderHook} from '@testing-library/react-hooks';
import useAlgodex from './useAlgodex.js';
import {wrapper} from '../test/setup.js';

describe.skip('useAlgodex Hook', () => {
  it('should test return value in useAlgodex hook', async () => {
    const {result} = renderHook(
        () => useAlgodex(),
        {wrapper},
    );
    expect(Object.keys(result.current)).toEqual([
      'algodex', 'isConnected',
      'http', 'wallet', 'setWallet',
      'placeOrder',
    ]);

    // expect(()=>result.current.setWallet({})).toThrowError(ValidationError);
    // expect(()=>result.current.placeOrder()).toThrowError(ValidationError);
  });
});
