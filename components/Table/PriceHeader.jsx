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

import Icon from 'components/Icon'
import PropTypes from 'prop-types'
// import { Typography } from 'components/Typography'
import Typography from '@mui/material/Typography'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'

export const PriceHeaderText = styled(Typography)`
  display: flex;
  align-items: center;
  ${(props) => (props.textAlign === 'right' ? 'margin-left: auto' : 'margin: 0')};
  color: ${({ theme }) => theme.palette.gray['500']};
  svg {
    margin-left: 0.25rem;
  }
`

export const TablePriceHeader = ({ title, textAlign }) => {
  const { t } = useTranslation('common')
  return (
    <PriceHeaderText variant="body_tiny_cap" textAlign={textAlign} data-testid="header-item">
      {t(title)}
      <Icon color="gray" fillGradient={500} use="algoLogo" size={0.625} />
    </PriceHeaderText>
  )
}

TablePriceHeader.propTypes = {
  title: PropTypes.string.isRequired,
  textAlign: PropTypes.string.isRequired
}

export default TablePriceHeader
