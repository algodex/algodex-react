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

import MUITabs from '@mui/material/Tabs'
import { styled } from '@mui/system'

const Tabs = styled(MUITabs)`
  border-bottom: solid 1px ${({ theme }) => theme.colors.gray['700']};

  .MuiTabs-indicator {
    min-width: 50px;
    height: 5px;
    background-color: ${({ tabtype, theme }) =>
      tabtype === 'buy' ? theme.colors.green['500'] : theme.colors.red['500']};
  }
  .MuiTab-textColorPrimary {
    &:hover {
      color: #fff;
    }
  }
`

export default Tabs
