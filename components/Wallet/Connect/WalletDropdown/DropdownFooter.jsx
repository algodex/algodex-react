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

import PropTypes from 'prop-types'

const DropdownFooter = () => {
  return (
    <Box className="p-4">
      {/* <Typography variant="body_small_bold" color="gray.000">
        New to Algorand
      </Typography> */}
      <br />
      {/* <Typography variant="body_small_bold" color="gray.000" className="underline mt-1">
        Learn More About Algorand Wallets
      </Typography> */}
    </Box>
  )
}

DropdownFooter.propTypes = {
  externalLink: PropTypes.string
}

export default DropdownFooter
