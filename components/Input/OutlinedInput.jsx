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

import MUIOutlinedInput from '@mui/material/OutlinedInput'
import styled from '@emotion/styled'

export const OutlinedInput = styled(MUIOutlinedInput)(({ theme }) => ({
  '.MuiOutlinedInput-input': {
    color: theme.colors.gray['000'],
    textAlign: 'right'
  },

  '.Mui-disabled': {
    color: theme.colors.gray[500]
  },
  '& input': {
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    ':disabled': {
      'WebkitTextFillColor': 'unset'
    },
    '&[type=number]': {
      // '-moz-appearance': 'textfield'
      appearance: 'textfield'
    },
    '&::-webkit-outer-spin-button': {
      // '-webkit-appearance': 'none',
      appearance: 'none',
      margin: 0
    },
    '&::-webkit-inner-spin-button': {
      // '-webkit-appearance': 'none',
      appearance: 'none',
      margin: 0
    }
  }
}))

OutlinedInput.defaultProps = {
  size: 'small',
  placeholder: '0.00',
  className: 'text-base font-normal',
  fullWidth: true
}

export default OutlinedInput
