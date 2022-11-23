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
import React from 'react';
import {ServiceError} from './ServiceError';
import {render} from '../../test/setup';

const testProps = {
  flex: true,
  color: 'purple',
  size: 10,
  message: 'Something is up',
};

const tests = [
  {
    ...testProps,
  },
  {
    ...testProps,
    size: 1.5,
    flex: false,
  },
];
beforeEach(() => {
  jest.spyOn(console, 'error');
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockImplementation(() => null);
});

afterEach(() => {
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockRestore();
});
describe('Service Error', () => {
  tests.map((props)=>{
    it('should render flex contaienr', ()=>{
      const {queryByTestId} = render(
          <ServiceError {...props} />,
      );

      if (props.flex) {
        expect(queryByTestId('flex-service')).not.toBeNull();
        expect(
            queryByTestId('msg-flex'),
        ).toHaveStyleRule('margin', '0.375rem 0');
      } else {
        expect(queryByTestId('flex-service')).toBeNull();
        expect(
            queryByTestId('mssg-service'),
        ).toHaveStyleRule('color', props.color);
        expect(
            queryByTestId('mssg-service'),
        ).toHaveStyleRule('margin', '0 0 1rem 0');
      }
    });
  });
});
