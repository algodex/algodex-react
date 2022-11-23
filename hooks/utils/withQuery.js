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

import React from 'react';
import {useQuery} from 'react-query';
import {isUndefined} from 'lodash/lang';

/**
 * Base withQuery Abstraction
 *
 * Return an element based on Query State
 *
 * @param {JSX.Element} Component Component to wrap
 * @param {object} options Query Options
 * @param {function} options.hook Callable Hook
 * @param {object} options.components Hook Components
 * @return {JSX.Element} Return a composed component
 */
export default function withQuery(Component, {hook = useQuery, components}) {
  if (
    isUndefined(components) ||
    isUndefined(components.Loading) ||
    isUndefined(components.ServiceError)
  ) {
    throw new Error('Must have Loading and Error components');
  }
  const {Loading, ServiceError} = components;

  /**
   * Wrapped Component
   * @param {object} props
   * @return {JSX.Element}
   */
  function withQueryWrapper(props) {
    const {isSuccess, isLoading, isError, data, error} = hook(props);
    if (isSuccess) return <Component {...props} {...data} />;
    if (isLoading) return <Loading {...props} {...data} />;
    if (isError) return <ServiceError {...data} message={error.message} />;
  }

  withQueryWrapper.getInitialProps = Component.getInitialProps;

  return withQueryWrapper;
}
