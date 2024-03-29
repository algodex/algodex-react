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
import { mdiAlertCircle } from '@mdi/js'

export const ValidationMessage = ({ components, message }) => {
  const { Icon } = components
  return (
    <div className="flex items-center text-xs mb-4 font-medium text-red-700">
      <Icon path={mdiAlertCircle} title="Alert Icon" size={0.7} />
      <p className="ml-1">{message}</p>
    </div>
  )
}

ValidationMessage.propTypes = {
  components: PropTypes.shape({
    Icon: PropTypes.node
  }),
  message: PropTypes.string
}

ValidationMessage.defaultProps = {
  components: {
    Icon: Icon
  },
  message: ''
}
