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

import MUIModal from '@mui/material/Modal'
import PropTypes from 'prop-types'

const ModalWrapper = (props) => {
  return (
    <MUIModal
      data-testid="modal-element"
      open={props.isVisible}
      hideBackdrop={props.hideBackdrop}
      className="w-full"
      style={{ backgroundColor: `${props.hideBackdrop ? 'rgba(0, 0, 0, 0.7)' : 'none'}` }}
      {...props}
    >
      {props.children}
    </MUIModal>
  )
}

ModalWrapper.propTypes = {
  children: PropTypes.element,
  isVisible: PropTypes.bool,
  hideBackdrop: PropTypes.bool
}

ModalWrapper.defaultProps = {
  hideBackdrop: true
}
export default ModalWrapper
