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

import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Input = styled.input`
  flex: 1 1 auto;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.gray['900']};
  border: 2px solid ${({ theme }) => theme.palette.gray['700']};
  border-radius: 3px;
  padding: 0.5rem 0.75rem;
  padding-right: 4.5rem;
  color: ${({ theme }) => theme.palette.gray['000']};
  text-align: right;
  font-size: 1rem;
  line-height: 1;

  &:focus {
    outline: 0;
    border-color: ${({ theme }) => theme.palette.gray['400']};
  }

  &:disabled {
    outline: 0;
    border-color: transparent;
    background-color: ${({ theme }) => theme.palette.gray['700']};
  }

  &::placeholder {
    color: ${({ theme }) => theme.palette.gray['600']};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;

  &[read-only] {
    pointer-events: none;
  }
`

const Container = styled.div`
  flex: 1 1 auto;
  display: flex;
  position: relative;
  // margin-bottom: 1rem;
`

const InputLabel = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.palette.gray['500']};
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1;
`

const Label = styled(InputLabel)`
  left: 0.875rem;
`

const Asset = styled(InputLabel)`
  right: 1.25rem;
  width: 2.75rem;
  font-family: ${({ isCondensed }) => (isCondensed ? `'Open Sans Condensed'` : 'inherit')};
`

/**
 *
 * @param {object} props Component Properties
 * @param {string} props.label Input Label
 * @param {string} props.currency Display Currency
 * @returns {JSX.Element}
 * @constructor
 */
export function CurrencyInput({ label, currency, ...props }) {
  const condenseAssetName = currency?.length > 5

  return (
    <Container data-testid="currency-input">
      <Input placeholder="0.00" {...props} />
      <Label>{label}</Label>
      <Asset isCondensed={condenseAssetName}>{currency}</Asset>
    </Container>
  )
}

CurrencyInput.propTypes = {
  label: PropTypes.string,
  currency: PropTypes.string,
  isCondensed: PropTypes.bool
}

export default CurrencyInput
