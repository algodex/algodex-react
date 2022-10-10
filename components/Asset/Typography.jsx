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

import styled from '@emotion/styled'
import { rgba } from 'polished'

export const NameVerifiedWrapper = styled.span`
  white-space: nowrap;
`
export const AssetName = styled.strong`
  font-weight: 600;
  color: ${({ theme }) => theme.palette.gray['000']};
  margin-right: 0.125rem;
  letter-spacing: 0.025rem;
`

export const AssetId = styled.span`
  color: ${({ theme }) => rgba(theme.palette.gray['000'], 0.3)};
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
`

export const AssetNameBlock = styled.p`
  color: ${({ theme }) => theme.palette.gray['500']};
  ${NameVerifiedWrapper} {
    svg {
      position: relative;
      top: -0.125rem;
      margin-left: 0.375rem;
    }
  }
`
