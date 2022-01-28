import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const MainInput = styled(OutlinedInput)(({ theme }) => ({
  '.MuiOutlinedInput-input': {
    color: theme.colors.gray['000'],
    marginRight: '0.5rem',
    textAlign: 'right'
  }
}))

/**
 *
 * @param {object} props Component Properties
 * @param {string} props.label Input Label
 * @param {string} props.currency Display Currency
 * @returns {JSX.Element}
 * @constructor
 */
export function TextInput({
  name,
  type,
  pattern,
  label,
  currency,
  value,
  onChange,
  min,
  step,
  autoComplete
}) {
  return (
    <FormControl
      component={() => (
        <section className="text-sm text-right my-1 my-2 rounded bg-gray-900 border-2 border-solid border-gray-700">
          <MainInput
            autoComplete={autoComplete}
            name={name}
            // onInput={(e) =>
            //   onChange(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'))
            // }
            onChange={onChange}
            // onInput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
            // onInput={(e) => e.target.value}
            value={value}
            size="small"
            placeholder="0.00"
            className="text-sm font-bold"
            inputProps={{
              min,
              step,
              inputMode: 'decimal',
              pattern: '[0-9]*',
              type
            }}
            InputProps={{
              min,
              step,
              inputMode: 'decimal',
              pattern: '[0-9]*',
              type
            }}
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <span className="text-sm font-bold text-gray-500">{label}</span>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <span className="text-sm font-bold text-gray-500">{currency}</span>
              </InputAdornment>
            }
          />
        </section>
      )}
    ></FormControl>
  )
}

TextInput.propTypes = {
  label: PropTypes.string,
  currency: PropTypes.string,
  isCondensed: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.string,
  pattern: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  min: PropTypes.any,
  step: PropTypes.any,
  autoComplete: PropTypes.bool
}

export default TextInput
