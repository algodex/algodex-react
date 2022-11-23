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

import {QueryClient, QueryClientProvider} from 'react-query';

import AlgodexApi from '@algodex/algodex-sdk/lib/AlgodexApi.js';
import {Provider} from '../components/AlgodexContext';
import React from 'react';
import {matchers} from '@emotion/jest';
import {render} from '@testing-library/react';

expect.extend(matchers);
const queryClient = new QueryClient();
/**
 *
 * @type {APIProperties}
 */
const properties = {
  config: {
    'algod': {
      'uri': 'https://node.testnet.algoexplorerapi.io',
      'token': '',
    },
    'indexer': {
      'uri': 'https://algoindexer.testnet.algoexplorerapi.io',
      'token': '',
    },
    'explorer': {
      'uri': 'https://indexer.testnet.algoexplorerapi.io',
      'port': '',
    },
    'dexd': {
      'uri': 'https://testnet.algodex.com/api/v2',
      'token': '',
      'apiVersion': 2,
    },
    'tinyman': {
      'uri': 'https://testnet.analytics.tinyman.org',
      'token': '',
    },
  },
};
let api;

/**
 *
 * @return {AlgodexApi}
 */
function makeApi() {
  if (typeof api === 'undefined') {
    api = new AlgodexApi(properties);
  }
  return api;
}

/**
 * Example Test Component
 * @param {Object} props
 * @return {JSX.Element}
 */
export const TestComponent = (props)=><div data-testid="test">{props}</div>;

/**
 *
 * @param {JSX.Element} children
 * @return {JSX.Element}
 */
export function wrapper({children}) {
  return (
    <Provider dex={makeApi()}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  );
}

const customRender = (ui, options = {}) => render(ui, {wrapper, ...options});
export * from '@testing-library/react';
export {customRender as render};
