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

import { default as IconButton, getColor, getFillColor, getSize } from './IconButton'

import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'
import theme from '../../../theme'

expect.extend(matchers)
describe('Icon Button', () => {
  it('Should render icon with the right color', () => {
    const { queryByTestId } = render(
      <IconButton color="gray" gradient={900} fillGradient={500} icon="Info" size="500" />
    )
    expect(queryByTestId('info-icon-wrapper')).toHaveStyleRule('color', '#171923')
    expect(queryByTestId('info-icon-wrapper')).not.toHaveStyleRule('color', '700')
  })

  it('Should render icon with the right size', () => {
    const { queryByTestId } = render(<IconButton icon="Info" size="500" />)
    expect(queryByTestId('info-icon-wrapper')).toHaveStyleRule('height', '500')
    expect(queryByTestId('info-icon-wrapper')).toHaveStyleRule('width', '500')
  })

  it('Should throw an error when icon name is wrong', () => {
    expect(() => render(<IconButton icon="Infoo" size="500" />)).toThrow('Icon Not Found!')
  })

  it('Should render correct icon', () => {
    expect(() => render(<IconButton icon="Info" size="500" />)).not.toThrow('Icon Not Found!')
  })

  it('Child component should be an svg element', () => {
    const { queryByTestId } = render(<IconButton icon="Info" size="500" />)
    expect(queryByTestId('svg')).toBeDefined()
  })

  it('Should return the correct size for the icon', () => {
    expect(getSize({ size: 500 })).toBe('500px')
    expect(getSize({ size: '500' })).toBe('500')
  })

  it('Should return the correct color hex for icon', () => {
    expect(getColor({ theme, color: 'gray', gradient: 900 })).toBe('#171923')
    expect(getColor({ theme })).toBe('#171923')
  })

  it('Should return the correct fill color hex for icon', () => {
    expect(getFillColor({ theme, color: 'blue', fillGradient: 500 })).not.toBe('#2668c0')
    expect(getFillColor({ theme })).toBe('#718096')
  })
})
