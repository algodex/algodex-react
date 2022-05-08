import MUIOutlinedInput from '@mui/material/OutlinedInput'
import styled from '@emotion/styled'

export const OutlinedInput = styled(MUIOutlinedInput)(({ theme }) => ({
  '.MuiOutlinedInput-input': {
    color: theme.colors.gray['000'],
    textAlign: 'right'
  },

  '.Mui-disabled': {
    color: theme.colors.gray[500]
  },
  '& input': {
    ':disabled': {
      '-webkit-text-fill-color': 'unset'
    },
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

OutlinedInput.defaultProps = {
  size: 'small',
  placeholder: '0.00',
  className: 'text-base font-normal',
  fullWidth: true
}

export default OutlinedInput
