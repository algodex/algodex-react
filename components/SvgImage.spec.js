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

import SvgImage from './SvgImage'
import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'

expect.extend(matchers)
describe('Icon Button', () => {
  it('Should render an SVG Image if the type is provided', () => {
    const { queryByTestId } = render(<SvgImage use="verified" data-testid="svg-image-icon" />)
    expect(queryByTestId('svg-image-icon')).not.toBeNull()
  })

  it('Should not SVG Image when a wrong type is provided', () => {
    const { queryByTestId } = render(<SvgImage use="verify" data-testid="svg-image-icon" />)
    expect(queryByTestId('svg-image-icon')).toBeNull()
  })

  it('Should render SVG Images using the right props', () => {
    const { queryByTestId } = render(
      <SvgImage color="gray.600" use="verified" w={3} h={2} data-testid="svg-image-icon" />
    )
    expect(queryByTestId('svg-image-icon')).toHaveStyleRule('height', '2rem')
    expect(queryByTestId('svg-image-icon')).toHaveStyleRule('width', '3rem')
    expect(queryByTestId('svg-image-icon')).toHaveStyleRule('color', '#4A5568')
  })
})
