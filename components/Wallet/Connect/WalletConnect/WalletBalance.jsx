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

import { Box, Typography } from '@mui/material'

import Icon from 'components/Icon/Icon'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Balance = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0;
  text-align: right;
  font-weight: 500;
  line-height: 1.5;

  svg {
    opacity: 0.5;
  }

  > span {
    margin-left: 0.375rem;

    > span {
      opacity: 0.5;
    }
  }
`
export const WalletBalance = ({ balance }) => {
  const split = balance.toFixed(6).split('.')

  return (
    <Balance>
      <Box mr={0.5} mt={0.4}>
        <Icon color="gray" fillGradient="000" use="algoLogo" size={0.625} />
      </Box>
      <Box>
        <Typography variant="body_small" fontWeight="bold">{`${split[0]}.`}</Typography>
        <Typography variant="body_small" fontWeight="bold">
          {split[1]}
        </Typography>
      </Box>
    </Balance>
  )
}

WalletBalance.propTypes = {
  balance: PropTypes.number
}

WalletBalance.defaultProps = {
  balance: 0
}

export default WalletBalance
