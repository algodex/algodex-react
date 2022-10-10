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

import { fireEvent, render } from 'test/test-utils'

import LanguageSelection from './LanguageSelection'
import { matchers } from '@emotion/jest'

expect.extend(matchers)

jest.mock('next/dist/client/router', () => require('next-router-mock'))

describe.skip('Language Selection Component', () => {
  it('Should render Language Selection dropdown on click for mobile', () => {
    const { queryByTestId } = render(<LanguageSelection isMobile={true} />)
    fireEvent.click(queryByTestId('dropdown-button-mobile'))
    expect(queryByTestId('dropdown-container-mobile')).not.toBeNull()
  })

  it('Should render Language Selection dropdown on click for Web', () => {
    const { queryByTestId } = render(<LanguageSelection isMobile={false} />)
    fireEvent.click(queryByTestId('dropdown-button-web'))
    expect(queryByTestId('dropdown-container-web')).not.toBeNull()
  })
})
