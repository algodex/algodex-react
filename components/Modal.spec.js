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
import ModalWrapper from './Modal'

expect.extend(matchers)
describe('ModalWrapper', () => {
  it('Should render modal with backdrop', () => {
    const { queryByTestId } = render(
      <ModalWrapper data-testid="ModalWrapper-element" hideBackdrop={false} isVisible={true}>
        <div data-testid="modal-element" style={{ backgroundColor: 'none' }}>
          Hello
        </div>
      </ModalWrapper>
    )
    expect(queryByTestId('modal-element')).not.toBeNull()
    expect(queryByTestId('modal-element')).toHaveStyle({ 'background-color': 'none' })
  })

  it('Should render modal without backdrop', () => {
    const { queryByTestId } = render(
      <ModalWrapper data-testid="ModalWrapper-element" hideBackdrop={true} isVisible={true}>
        <div data-testid="modal-element" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></div>
      </ModalWrapper>
    )
    expect(queryByTestId('modal-element')).toHaveStyle({
      'background-color': 'rgba(0, 0, 0, 0.7)'
    })
  })
})
