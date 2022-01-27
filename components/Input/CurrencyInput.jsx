// import PropTypes from 'prop-types'
// import styled from 'styled-components'

// const Input = styled.input`
//   flex: 1 1 auto;
//   width: 100%;
//   background-color: ${({ theme }) => theme.colors.gray['900']};
//   border: 2px solid ${({ theme }) => theme.colors.gray['700']};
//   border-radius: 3px;
//   padding: 0.5rem 0.75rem;
//   padding-right: 4.5rem;
//   color: ${({ theme }) => theme.colors.gray['000']};
//   text-align: right;
//   font-size: 1rem;
//   line-height: 1;

//   &:focus {
//     outline: 0;
//     border-color: ${({ theme }) => theme.colors.gray['400']};
//   }

//   &::placeholder {
//     color: ${({ theme }) => theme.colors.gray['600']};
//   }

//   &::-webkit-outer-spin-button,
//   &::-webkit-inner-spin-button {
//     -webkit-appearance: none;
//     margin: 0;
//   }
//   -moz-appearance: textfield;

//   &[read-only] {
//     pointer-events: none;
//   }
// `

// const Container = styled.div`
//   flex: 1 1 auto;
//   display: flex;
//   position: relative;
//   // margin-bottom: 1rem;
// `

// const InputLabel = styled.span`
//   position: absolute;
//   top: 50%;
//   transform: translateY(-50%);
//   color: ${({ theme }) => theme.colors.gray['500']};
//   font-size: 0.875rem;
//   font-weight: 600;
//   line-height: 1;
// `

// const Label = styled(InputLabel)`
//   left: 0.875rem;
// `

// const Asset = styled(InputLabel)`
//   right: 1.25rem;
//   width: 2.75rem;
//   font-family: ${({ isCondensed }) => (isCondensed ? `'Open Sans Condensed'` : 'inherit')};
// `

// /**
//  *
//  * @param {object} props Component Properties
//  * @param {string} props.label Input Label
//  * @param {string} props.currency Display Currency
//  * @returns {JSX.Element}
//  * @constructor
//  */
// export function CurrencyInput({ label, currency, ...props }) {
//   const condenseAssetName = currency?.length > 5

//   return (
//     <Container>
//       <Input placeholder="0.00" {...props} />
//       <Label>{label}</Label>
//       <Asset isCondensed={condenseAssetName}>{currency}</Asset>
//     </Container>
//   )
// }

// CurrencyInput.propTypes = {
//   label: PropTypes.string,
//   currency: PropTypes.string,
//   isCondensed: PropTypes.bool
// }

// export default CurrencyInput

import FormControl, { useFormControl } from '@mui/material/FormControl'

import FormHelperText from '@mui/material/FormHelperText'
import InputBase from '@mui/material/InputBase'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import styled from 'styled-components'
import theme from 'theme'
import { useMemo } from 'react'

const MainInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: '1.5rem',
    color: '#FFFFFF'
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.colors.gray['600'],
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    // transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.colors.gray['600'], 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.colors.gray['600']
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
export function CurrencyInput({ label, currency, ...props }) {
  // const MyFormHelperText = () => {
  //   const { focused } = useFormControl() || {}

  //   const helperText = useMemo(() => {
  //     if (focused) {
  //       return 'This field is being focused'
  //     }

  //     return 'Helper text'
  //   }, [focused])

  //   return <FormHelperText>{helperText}</FormHelperText>
  // }

  return (
    <FormControl
      sx={{
        width: 500,
        maxWidth: '100%'
      }}
      fullWidth
      variant="standard"
    >
      <MainInput fullWidth defaultValue="hello-input" />
    </FormControl>
  )
}

CurrencyInput.propTypes = {
  label: PropTypes.string,
  currency: PropTypes.string,
  isCondensed: PropTypes.bool
}

export default CurrencyInput
