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

export const styles = {
  title: { fontWeight: 700, fontSize: '20px', color: 'white', lineHeight: 1.2 },
  body1: { fontWeight: 600, fontSize: '12px', color: 'gray.300' },
  subtitle2: { fontWeight: 700, fontSize: '16px', color: 'white' },
  input: {
    border: 1,
    borderColor: 'gray.250',
    '.MuiOutlinedInput-input': {
      textAlign: 'left !important'
    }
  },
  divider: { backgroundColor: 'gray.250', marginTop: '5px' },
  name: { fontWeight: 500, fontSize: '15px', color: 'gray.750', lineHeight: 1.3, minWidth: '40%' },
  value: { fontWeight: 700, fontSize: '14px', color: 'white', lineHeight: 1.3 },
  note: { fontWeight: 500, fontSize: '10px', color: 'white', lineHeight: 1.3 },
  fillAvailable: { width: '-webkit-fill-available' },
  accordionStyles: {
    marginBlock: '1rem',
    border: '1px solid',
    borderColor: 'gray.250',
    backgroundColor: 'transparent',
    borderRadius: '6px'
  },
  submitBtn: {
    color: 'gray.100',
    textDecoration: 'uppercase',
    backgroundColor: 'green.600',
    px: '20px',
    fontWeight: 700,
    transition: 'all ease .3s',
    '&:hover': {
      backgroundColor: 'green.600',
      opacity: '0.8'
    }
  },
  btnOutline: {
    color: 'white',
    textDecoration: 'uppercase',
    backgroundColor: 'transparent',
    px: '20px',
    py: '3px',
    fontWeight: 700,
    border: '2px solid',
    transition: 'all ease .3s',
    '&:hover': {
      color: 'white'
    }
  },
  copy: {
    marginRight: '0.4rem',
    fontSize: '0.9rem',
    cursor: 'pointer',
    opacity: 0.8,
    transition: 'all .3s ease',
    ['&:hover']: {
      opacity: 1
    },
    ['@media(max-width:600px)']: {
      fontSize: '1.5rem'
    }
  }
}
