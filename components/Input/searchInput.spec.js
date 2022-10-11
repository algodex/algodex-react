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

import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'
import SearchInput from './SearchInput'

expect.extend(matchers)

describe('Search Input', () => {
  it('Should be visible when passed initial text and an onchange', () => {
    const { queryByTestId } = render(
      <SearchInput
        initialText="test"
        isActive={true}
        onChange={() => {
          console.log('test')
        }}
      />
    )
    // expect(queryByTestId('Checkbox')).toHaveStyle('letter-spacing: 0.025rem')
    expect(queryByTestId('search-input')).toBeVisible()

    // expect(queryByTestId('AssetName-element')).not.toHaveStyle('letter-spacing: 0')
  })
})
