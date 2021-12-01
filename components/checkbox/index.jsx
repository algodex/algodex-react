import PropTypes from 'prop-types'

const Checkbox = ({ isChecked, onCheckFn }) => {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={onCheckFn}
      className={`${
        !isChecked ? 'appearance-none' : ''
      } border border-gray-500 w-3.5 h-3.5 checked:bg-blue-600 checked:border-transparent`}
    />
  )
}

Checkbox.propTypes = {
  isChecked: PropTypes.bool,
  onCheckFn: PropTypes.func
}

Checkbox.defaultProps = {
  isChecked: false
}

Checkbox.displayName = 'Checkbox'

export default Checkbox
