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
      className={`${classProps} ${
        !isChecked ? 'appearance-none' : ''
      } border border-gray-700 w-3.5 h-3.5 checked:bg-blue-600 checked:border-transparent`}
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
