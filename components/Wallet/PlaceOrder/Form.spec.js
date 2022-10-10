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
import PlaceOrderForm from './Form.jsx'

expect.extend(matchers)
describe('form', () => {
  it('Should render spinner with container if flex is true', () => {
    const { queryByTestId } = render(
      <PlaceOrderForm
        showTitle={false}
        asset={1559042}
        onSubmit={() => {
          console.log('test')
        }}
      />
    )
    expect(queryByTestId('placeOrder')).toBeNull()
    // expect(queryByTestId('spinner-svg')).not.toBeNull()
  })
})
