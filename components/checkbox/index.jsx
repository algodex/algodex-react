import PropTypes from 'prop-types'

const Checkbox = ({ isChecked, onCheckFn, classProps }) => {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={onCheckFn}
      className={`${classProps} ${
        !isChecked ? 'appearance-none' : ''
      } border border-gray-700 w-3.5 h-3.5 checked:bg-blue-600 checked:border-transparent`}
    />
  )
}

Checkbox.propTypes = {
  isChecked: PropTypes.bool,
  onCheckFn: PropTypes.func,
  classProps: PropTypes.string
}

Checkbox.defaultProps = {
  isChecked: false
}

Checkbox.displayName = 'Checkbox'

export default Checkbox
