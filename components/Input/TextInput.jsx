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

import styled from '@emotion/styled'

/**
 * @param {object} props Component Properties
 * @param {string} props.type Input Type
 * @param {boolean} props.hasOutline Enable Outline
 * @param {boolean} props.hasBackgroundColor Enable Backgroung Color
 * @type {StyledComponent}
 */
export const TextInput = styled.input`
  flex: 1 1 auto;
  background-color: ${({ theme, hasBackgroundColor }) =>
    hasBackgroundColor ? theme.palette.gray['900'] : 'inherit'};
  border: ${({ theme, hasOutline }) =>
    hasOutline ? `2px solid ${theme.palette.gray['700']}` : 'none'};
  border-radius: 3px;
  padding: 0.5rem;
  color: ${({ theme }) => theme.palette.gray['000']};
  font-family: ${({ theme }) => theme.fontFamilies.body};
  font-size: 1rem;
  line-height: 1;
  min-height: 2.5rem;

  // &:focus {
  //   outline: 0;
  //   box-shadow: 0 0 0 0.2rem rgba(121, 255, 156, 0.5);
  //   border-color: ${({ theme }) => theme.palette.gray['400']};
  // }

  &::placeholder {
    color: ${({ theme }) => theme.palette.gray['600']};
    font-size: medium;
  }

  &[disabled] {
    pointer-events: none;
    opacity: 0.33;
  }

  &[read-only] {
    pointer-events: none;
  }
`

TextInput.defaultProps = {
  type: 'text',
  hasOutline: true,
  hasBackgroundColor: true
}

export default TextInput
