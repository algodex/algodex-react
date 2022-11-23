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

/**
 * @jest-environment jsdom
 */
import {TestComponent, render} from '../../test/setup';
import {
  withAlgorandPriceQuery,
  withExplorerAssetInfo,
} from './useAlgoExplorer.js';

import React from 'react';
import asset from '../../spec/Asset.json';

describe('withAlgorandPriceQuery', ()=>{
  it('should compose withAlgorandPriceQuery', ()=>{
    expect(withAlgorandPriceQuery).toBeInstanceOf(Function);

    const Comp = withAlgorandPriceQuery(TestComponent);

    const {getByTestId} = render(
        <Comp/>,
    );
    expect(getByTestId('spinner-svg')).not.toBeNull();
  });
  it('should compose withExplorerAssetInfo', ()=>{
    expect(withExplorerAssetInfo).toBeInstanceOf(Function);

    const Comp = withExplorerAssetInfo(TestComponent);

    const {getByTestId} = render(
        <Comp asset={asset}/>,
    );
    expect(getByTestId('spinner-svg')).not.toBeNull();
  });
});
