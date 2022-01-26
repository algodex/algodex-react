import MUISlider from '@mui/material/Slider'
import { important } from 'polished'
import styled from 'styled-components'

// const trackHeight = '0.125rem'
// const thumbDiameter = '0.75rem'
// const tickWidth = '0.125rem'

export const Slider = styled(MUISlider)(({ theme, type }) => {
  console.log(theme)
  let muiStyle = {}
  if (type === 'line-marks') {
    muiStyle = {
      '& .MuiSlider-rail': {
        opacity: 0.5,
        backgroundColor: theme.colors.gray[900]
      },
      '& .MuiSlider-mark': {
        backgroundColor: theme.colors.gray[900],
        height: 40,
        width: 1,
        '&.MuiSlider-markActive': {
          opacity: 1,
          backgroundColor: 'currentColor'
        }
      }
    }
  }
  let regular = {
    '& .MuiSlider-thumb': {
      height: '13px',
      width: '13px'
    },
    '& .MuiSlider-rail': {
      color: '#FFFFFF',
      height: '2px'
    },
    '& .MuiSlider-mark': {
      color: '#FFFFFF',
      width: '8px',
      height: '8px',
      'border-radius': '50%'
    },
    '& .MuiSlider-thumbColorPrimary': {
      color: '#FFFFFF'
    },
    '& .MuiSlider-colorPrimary': {
      color: '#FFFFFF'
    }
  }
  return {
    color: theme.colors.gray[100],
    ...muiStyle,
    ...regular
  }
})

Slider.defaultProps = {
  type: 'default',
  value: 0,
  onChange: () => console.log('No value passed'),
  marks: false
}

export default Slider
