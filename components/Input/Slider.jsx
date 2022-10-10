/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
            color: theme.palette.white,
            '&:before': {
              display: 'none'
            },
            '& *': {
              background: 'transparent',
              color: theme.palette.white
            }
          },
          '& .MuiSlider-mark': {
            backgroundColor: theme.palette.gray[500],
            height: 15,
            width: 2,
            opacity: 0.2,
            '&.MuiSlider-markActive': {
              opacity: 1,
              color: theme.palette.white,
              backgroundColor: theme.palette.white
            }
          }
        }
      : {
          '& .MuiSlider-mark': {
            color: theme.palette.white,
            width: 8,
            height: 8,
            backgroundColor: theme.palette.gray['700'],
            borderRadius: '50%',
            '&.MuiSlider-markActive': {
              opacity: 1,
              color: theme.palette.white,
              backgroundColor: theme.palette.white
            }
          },
          '& .MuiSlider-markLabel': {
            color: theme.palette.gray[500],
            fontWeight: '700',
            fontSize: '12px',
            top: '-10px'
          },
          '& .MuiSlider-markLabelActive': {
            color: theme.palette.white
          }
        }

  return {
    '&.Mui-disabled': {
      opacity: 0.5,
      pointerEvents: 'none',
      cursor: 'default'
    },
    '& .MuiSlider-thumb': {
      height: 13,
      width: 13,
      backgroundColor: theme.palette.white,
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
      color: theme.palette.white
    },
    '& .MuiSlider-rail': {
      opacity: 0.3,
      height: 2,
      backgroundColor: theme.palette.gray[500]
    },

    ...muiStyle
  }
})

Slider.defaultProps = {
  type: 'default',
  // type: 'line-marks',
  // value: 50,
  onChange: () => console.log('No value passed')
}

export default Slider
