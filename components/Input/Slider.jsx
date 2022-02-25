import MUISlider from '@mui/material/Slider'
import styled from '@emotion/styled'

export const Slider = styled(MUISlider)(({ theme, type }) => {
  const muiStyle =
    type === 'line-marks'
      ? {
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
      : {
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

  return {
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
    },
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
