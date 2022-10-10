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

import MUITab from '@mui/material/Tab'
import { styled } from '@mui/system'
import { tabUnstyledClasses } from '@mui/base/TabUnstyled'

export const Tab = styled(MUITab)`
  // color: ${({ theme }) => theme.colors.gray['500']};
  color: #fff;
  min-width: 55px;
  opacity: 0.5;
  padding: 0;
  display: flex;
  align-items: self-start;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.12rem;
  margin-right: 1rem;
  &.${tabUnstyledClasses.selected} {
    color: #fff;
    opacity: 1;
  }
`

export default Tab
