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

/**
 * @param {object} props Component Properties
 * @param {boolean} props.isChecked Checked State
 * @param {function} props.onChange Triggered on State change
 * @param {string } props.classProps Class property
 * @returns {JSX.Element}
 * @constructor
 */
const CheckboxInput = ({ isChecked, onChange, classProps }) => {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      data-testid="checkbox"
      className={`${classProps} ${
        !isChecked ? 'appearance-none' : ''
      } cursor-pointer border-solid border-3 border-gray-700 w-3.5 h-3.5 checked:bg-blue-600 checked:border-transparent`}
    />
  )
}

CheckboxInput.propTypes = {
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
  classProps: PropTypes.string
}

CheckboxInput.defaultProps = {
  isChecked: false
}

CheckboxInput.displayName = 'Checkbox'

export default CheckboxInput
