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
import ServiceError from '../components/ServiceError';
import Spinner from '../components/Spinner';
import {render} from '../test/setup.js';
import {useQuery} from 'react-query';
import withQuery from './withQuery.js';

describe('withQuery High Order Component', () => {
  it('should compose a component with a react-query', async () => {
    // eslint-disable-next-line require-jsdoc
    function MyComponent(props) {
      return (
        <div>MyComponent</div>
      );
    }
    // eslint-disable-next-line require-jsdoc
    function useTestHook() {
      return useQuery('testHook', ()=> {
        return {
          data: 'Data!',
        };
      });
    }
    try {
      withQuery(
          MyComponent,
          {
            hook: useTestHook,
          },
      );
    } catch (e) {
      expect(e.message).toEqual('Must have Loading and Error components');
    }
    try {
      withQuery(
          MyComponent,
          {
            hook: useTestHook,
            components: {
              ServiceError,
            },
          },
      );
    } catch (e) {
      expect(e.message).toEqual('Must have Loading and Error components');
    }

    const Comp = withQuery(
        MyComponent,
        {
          hook: useTestHook,
          components: {
            ServiceError, Loading: Spinner,
          },
        },
    );
    const {getByTestId} = render(
        <Comp/>,
    );

    expect(getByTestId('spinner-svg')).not.toBeNull();
  });
});
