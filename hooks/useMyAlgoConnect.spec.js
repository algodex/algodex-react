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

/**
 * @jest-environment jsdom
 */
import {renderHook} from '@testing-library/react-hooks';
import useMyAlgoConnect from './useMyAlgoConnect.js';
import {wrapper} from '../test/setup.js';

describe('useMyAlgoConnect', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error');
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
  });

  afterEach(() => {
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockRestore();
  });
  it('should connect to MyAlgoWallet', () => {
    const {result} = renderHook(
        () => useMyAlgoConnect(),
        {wrapper},
    );
    // TODO: test result of connect/disconnect
    expect(result.current).toBeInstanceOf(Object);
  });
});
