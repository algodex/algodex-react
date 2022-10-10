/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2022 Algodex VASP (BVI) Corp.
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
import { AssetId } from './Typography'
import { AssetName } from './Typography'

expect.extend(matchers)

describe('AssetName', () => {
  it('Text should have accurate letter spacing', () => {
    const { queryByTestId } = render(
      <AssetName data-testid="AssetName-element">hello world</AssetName>
    )
    expect(queryByTestId('AssetName-element')).toHaveStyle('letter-spacing: 0.025rem')
    expect(queryByTestId('AssetName-element')).not.toHaveStyle('letter-spacing: 0')
  })
})

describe('AssetId', () => {
  it('Text should have a unique font size', () => {
    const { queryByTestId } = render(<AssetId data-testid="AssetId-element">#98848</AssetId>)
    expect(queryByTestId('AssetId-element')).toHaveStyle('font-size: 0.625rem')
  })
})
