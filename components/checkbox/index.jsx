import PropTypes from 'prop-types'

const Checkbox = ({ isChecked, onCheckFn }) => {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      onClick={onCheckFn}
      className={`${
        !isChecked ? 'appearance-none' : ''
      } bg-transparent border w-4 h-4 checked:bg-blue-600 checked:border-transparent`}
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
