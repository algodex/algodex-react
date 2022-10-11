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

import InfoFlyover from './InfoFlyover'
import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'
expect.extend(matchers)

const itemInfo = {
  change: '42.86',
  fullName: 'LudoCoin',
  hasBeenOrdered: true,
  id: 33698417,
  liquidityAlgo: '22314.520143',
  liquidityAsa: '35927.387394',
  name: 'L',
  price: '1.0000',
  verified: false
}

describe('InfoFlyover Component', () => {
  it('Should render InfoFlyover Component', () => {
    const { getByText } = render(
      <InfoFlyover isActive={true} children="ExampleComp" row={itemInfo} /> // eslint-disable-line
    )
    expect(getByText(/ExampleComp/i)).toBeVisible()
  })

  it('Should not render InfoFlyover Component', () => {
    const { queryByText } = render(
      <InfoFlyover isActive={false} children="ExampleComp" row={itemInfo} /> // eslint-disable-line
    )
    expect(queryByText(/ExampleComp/i)).toBeNull()
  })

  it('Should render Nothing Found! when no data is provided', () => {
    const { queryByTestId } = render(<InfoFlyover isActive={false} />)
    expect(queryByTestId('empty-flyover')).not.toBeNull()
  })
})
