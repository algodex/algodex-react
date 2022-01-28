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
  },
  '& input': {
    '&[type=number]': {
      '-moz-appearance': 'textfield'
    },
    '&::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '&::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    }
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
export function TextInput({ currency, label, ...props }) {
  return (
    <FormControl
      component={() => (
        <section className="text-sm text-right my-1 my-2 rounded bg-gray-900 border-2 border-solid border-gray-700">
          <MainInput
            size="small"
            placeholder="0.00"
            className="text-sm font-bold "
            inputProps={{
              ...props
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
  currency: PropTypes.string
}

export default TextInput
