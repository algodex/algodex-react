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

import React, {createContext, useMemo} from 'react';

import AlgodexApi from '@algodex/algodex-sdk/lib/AlgodexApi.js';
import PropTypes from 'prop-types';

/**
 * @typedef import('@algodex/algodex-sdk')
 */

/**
 *
 * @type {React.Context<{}>}
 */
export const AlgodexContext = createContext({});

/**
 *
 * @param {Object} props Component Properties
 * @param {AlgodexApi} props.dex The AlgodexAPI Instance
 * @param {JSX.Element} [props.children] Component Children
 * @return {JSX.Element}
 */
export function Provider({children, dex}) {
  const context = useMemo(() => dex, [dex]);
  return <AlgodexContext.Provider value={context}>
    {children}
  </AlgodexContext.Provider>;
}
Provider.propTypes = {
  /**
   * Children Components
   */
  children: PropTypes.node,
  /**
   * Instance of a AlgodexAPI
   */
  dex: PropTypes.instanceOf(AlgodexApi),
};
