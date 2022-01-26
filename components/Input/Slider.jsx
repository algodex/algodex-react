import MUISlider from '@mui/material/Slider'
import styled from 'styled-components'

// const trackHeight = '0.125rem'
// const thumbDiameter = '0.75rem'
// const tickWidth = '0.125rem'

export const Slider = styled(MUISlider)(({ theme, type }) => {
  let muiStyle = {}
  let shared = {}
  shared = {
    '& .MuiSlider-thumb': {
      height: 13,
      width: 13,
      backgroundColor: theme.colors.white,
      '&:focus, &:hover, &.Mui-active': {
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          // boxShadow: iOSBoxShadow,
        }
      }
    },
    '& .MuiSlider-track': {
      border: 'none',
      height: 2,
      color: theme.colors.white
    },
    '& .MuiSlider-rail': {
      opacity: 0.3,
      height: 2,
      backgroundColor: theme.colors.gray[500]
    }
  }

  if (type === 'line-marks') {
    muiStyle = {
      '& .MuiSlider-valueLabel': {
        fontSize: 12,
        fontWeight: 'normal',
        top: -6,
        backgroundColor: 'unset',
        color: theme.colors.white,
        '&:before': {
          display: 'none'
        },
        '& *': {
          background: 'transparent',
          color: theme.colors.white
        }
      },
      '& .MuiSlider-mark': {
        backgroundColor: theme.colors.gray[500],
        height: 15,
        width: 2,
        opacity: 0.2,
        '&.MuiSlider-markActive': {
          opacity: 1,
          color: theme.colors.white,
          backgroundColor: theme.colors.white
        }
      }
    }
  }

  if (type === 'default') {
    muiStyle = {
      '& .MuiSlider-mark': {
        color: theme.colors.white,
        width: 8,
        height: 8,
        backgroundColor: theme.colors.gray['700'],
        'border-radius': '50%',
        '&.MuiSlider-markActive': {
          opacity: 1,
          color: theme.colors.white,
          backgroundColor: theme.colors.white
        }
      }
    }
  }

  return {
    color: theme.colors.gray[100],
    ...shared,
    ...muiStyle
  }
})

Slider.defaultProps = {
  type: 'default',
  // type: 'line-marks',
  value: 50,
  onChange: () => console.log('No value passed'),
  marks: false
}

export default Slider
