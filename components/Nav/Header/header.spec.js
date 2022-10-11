/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
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

import React from 'react'
import singletonRouter from 'next/router'
import { render } from 'test/test-utils'
import { Header } from './index'
import { matchers } from '@emotion/jest'
import { MobileNavigation } from './header.css'

jest.mock('next/dist/client/router', () => require('next-router-mock'))
expect.extend(matchers)
describe.skip('Header', () => {
  it('should render the container', () => {
    const { queryByTestId } = render(<Header router={singletonRouter} />)
    expect(queryByTestId('header-container')).toBeVisible()
    expect(queryByTestId('header-container')).not.toBeNull()
    expect(queryByTestId('header-network-dropdown-element')).not.toBeNull()
    expect(queryByTestId('header-navigation-element')).not.toBeNull()
  })

  it('should make mobile nav visible if isOpen is true', () => {
    const { queryByTestId } = render(
      <MobileNavigation data-testid="mobile-nav-element" isOpen={true} />
    )
    expect(queryByTestId('mobile-nav-element')).toBeVisible()
    expect(queryByTestId('mobile-nav-element')).not.toBeNull()
  })
})
