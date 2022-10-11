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

import AlertIcon from './AlertIcon'
import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'

expect.extend(matchers)
describe('Icon Button', () => {
  it('Should render icon with the right props', () => {
    const { queryByTestId } = render(
      <AlertIcon data-testid="alert-icon" color="gray" flex={true} size={10} />
    )
    expect(queryByTestId('alert-icon')).toHaveStyleRule('width', '10rem')
    expect(queryByTestId('alert-icon')).toHaveStyleRule('height', '10rem')
    expect(queryByTestId('alert-icon')).toHaveStyleRule('margin', '0')
  })

  it('Should render icon diffently when flex is set to false', () => {
    const { queryByTestId } = render(
      <AlertIcon data-testid="alert-icon" color="gray" flex={false} size={10} />
    )
    expect(queryByTestId('alert-icon')).toHaveStyleRule('margin', '0 0.5rem 0 0')
  })
})
