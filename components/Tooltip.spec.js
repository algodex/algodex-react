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

import { Info } from 'react-feather'
import Tooltip from './Tooltip'
import { matchers } from '@emotion/jest'
import { render } from 'test/test-utils'
import styled from '@emotion/styled'

const IconButton = styled.button`
  cursor: pointer;
  pointer-events: all;
  border: none;
  background: transparent;
  margin-left: 0.125rem;
  padding: 0;
  height: 15px;

  svg {
    height: 15px;
    fill: ${({ theme }) => theme.palette.gray[500]};
    color: ${({ theme }) => theme.palette.gray[900]};
  }
`

expect.extend(matchers)
describe('Icon Button', () => {
  it('Should show a control render button', () => {
    const { queryByTestId } = render(
      <Tooltip
        hasRenderButton={true}
        renderButton={(setTriggerRef) => (
          <IconButton ref={setTriggerRef} type="button">
            <Info />
          </IconButton>
        )}
      >
        <div>Tooltip</div>
      </Tooltip>
    )
    expect(queryByTestId('tooltip-component')).toBeNull()
  })

  it('Should render tooltip if set to visible', () => {
    const { queryByTestId } = render(
      <Tooltip
        hasRenderButton={false}
        renderButton={(setTriggerRef) => (
          <IconButton data-testid="render-button" ref={setTriggerRef} type="button">
            <Info />
          </IconButton>
        )}
      >
        <div>Tooltip</div>
      </Tooltip>
    )
    expect(queryByTestId('tooltip-component')).toBeNull()
  })
})
