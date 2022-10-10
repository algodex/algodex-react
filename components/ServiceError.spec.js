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

import ServiceError from './ServiceError'
import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'

expect.extend(matchers)
describe('Icon Button', () => {
  it('Should render flex container', () => {
    const { queryByTestId } = render(
      <ServiceError flex={true} size={10} message={'Something is up'} />
    )
    expect(queryByTestId('flex-service')).not.toBeNull()
    expect(queryByTestId('mssg-service')).toBeNull()
  })

  it('Should render message section', () => {
    const { queryByTestId } = render(
      <ServiceError flex={false} size={10} message={'Something is up'} />
    )
    expect(queryByTestId('mssg-service')).not.toBeNull()
    expect(queryByTestId('flex-service')).toBeNull()
  })

  it('Should render component with appropriate component props', () => {
    const { queryByTestId } = render(
      <ServiceError size={1.5} flex={false} color="gray.600" message={'Something is up'} />
    )
    expect(queryByTestId('mssg-service')).toHaveStyleRule('color', '#A1AEC0')
    expect(queryByTestId('mssg-service')).toHaveStyleRule('margin', '0 0 1rem 0')
  })

  it('Should render component with when color props is less than 300', () => {
    const { queryByTestId } = render(
      <ServiceError size={1.5} flex={false} color="gray.400" message={'Something is up'} />
    )
    expect(queryByTestId('mssg-service')).toHaveStyleRule('color', '#E2E8F0')
  })
})
