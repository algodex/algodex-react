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
import React from 'react';
import {Spinner} from './Spinner';
import {render} from '../test/setup';
const defaultProps = {
  'data-testid': 'spinner-element',
  'color': 'gray',
  'flex': true,
  'size': 5,
};
const tests = [
  defaultProps,
  {...defaultProps, flex: false},
];
describe('Spinner', () => {
  tests.forEach((props)=>{
    it(`should render a ${props.flex ? 'flex spinner': 'spinner'}`, () => {
      const {queryByTestId} = render(
          <Spinner {...props}/>,
      );
      if (props.flex) {
        expect(queryByTestId('spinner-flex-container')).not.toBeNull();
      } else {
        expect(queryByTestId('spinner-flex-container')).toBeNull();
      }

      expect(queryByTestId('spinner-svg')).not.toBeNull();
    });
  });
});
