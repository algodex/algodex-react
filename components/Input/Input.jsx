import styled from '@emotion/styled'
import MUIOutlinedInput from '@mui/material/OutlinedInput/OutlinedInput'

const MainInput = styled(MUIOutlinedInput)(({ theme }) => ({
  '.MuiOutlinedInput-input': {
    color: theme.colors.gray['000'],
    marginRight: '0.5rem',
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

MainInput.defaultProps = {
  size: 'small',
  placeholder: '0.00',
  className: 'text-sm font-bold ',
  fullWidth: true
}
