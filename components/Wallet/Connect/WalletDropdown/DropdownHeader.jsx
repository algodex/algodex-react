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

import Icon from '@mdi/react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import { mdiClose } from '@mdi/js'

const DropdownHeader = ({ closeFn }) => {
  return (
    <div className="flex justify-between items-center p-4">
      <Typography variant="subtitle" color="gray.100">
        Your Wallets
      </Typography>
      <Icon
        onClick={closeFn}
        path={mdiClose}
        title="Close Dropdown"
        size={0.8}
        className="cursor-pointer"
        color="#FFFFFF"
      />
    </div>
  )
}

DropdownHeader.propTypes = {
  closeFn: PropTypes.func
}

export default DropdownHeader
