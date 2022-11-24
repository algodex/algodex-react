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

import { createTheme } from '@mui/material/styles'
import { lighten } from 'polished'

const colors = {
  white: '#FFFFFF',
  blue: {
    '000': '#7face6',
    100: '#6a9ee2',
    200: '#5590dd',
    300: '#3f82d9',
    400: '#2680EB',
    500: '#2d75d6',
    600: '#2668c0',
    700: '#225daa',
    800: '#1d5195',
    900: '#194680'
  },
  amber: {
    '000': '#FFC30D',
    100: '#F2B600',
    200: '#E6AD00',
    300: '#D9A300',
    400: '#CC9A00',
    500: '#BF9000',
    600: '#B38600',
    700: '#B38600',
    800: '#997300',
    900: '#8C6A00'
  },
  green: {
    '000': '#F0FFF4',
    100: '#C6F7D4',
    200: '#9BE6B4',
    300: '#69D391',
    400: '#48BB78',
    500: '#38A169',
    600: '#30845A',
    700: '#286749',
    800: '#21543D',
    900: '#1C4532'
  },
  gray: {
    '000': '#F8FAFC',
    100: '#EDF2F6',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A1AEC0',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#171923'
  },
  red: {
    '000': '#FFF5F5',
    100: '#FED7D7',
    200: '#FEB2B2',
    300: '#FC8181',
    400: '#F56565',
    500: '#E53E3E',
    600: '#C53030',
    700: '#9B2C2C',
    800: '#822727',
    900: '#63171B'
  }
}

const fontFamilies = {
  heading: `'Inter', 'Alliance No.1', sans-serif`,
  body: `'Inter', 'Alliance No.1'`,
  monospace: `'Roboto Mono', monospace`
}

const fontSizes = [
  '10px',
  '12px',
  '14px',
  '16px',
  '20px',
  '24px',
  '32px',
  '34px',
  '40px',
  '48px',
  '60px',
  '64px',
  '96px'
]

// const breakpoints = ['40em', '48em']

export const buttons = {
  primary: {
    color: colors.gray['000'],
    border: '1px solid transparent',
    backgroundColor: colors.green['500'],
    '&:hover': {
      backgroundColor: lighten(0.05, colors.green['500'])
    }
  },
  secondary: {
    color: colors.gray['000'],
    border: '1px solid transparent',
    backgroundColor: colors.gray['600'],
    '&:hover': {
      backgroundColor: lighten(0.05, colors.gray['600'])
    }
  },
  danger: {
    color: colors.gray['000'],
    border: '1px solid transparent',
    backgroundColor: colors.red['500'],
    '&:hover': {
      backgroundColor: lighten(0.05, colors.red['500'])
    }
  }
}

export const parseThemeColor = (str) => {
  return str.split('.').reduce((o, i) => o[i], colors)
}
const muiTheme = createTheme()
const theme = {
  ...muiTheme,
  // TODO: remove fontfamilies
  fontFamilies,
  buttons,
  typography: {
    ...muiTheme.typography,
    h1: {
      fontFamily: fontFamilies.heading,
      fontSize: fontSizes[12],
      [muiTheme.breakpoints.up('xs')]: {
        // fontSize: '0.1rem'
      },
      [muiTheme.breakpoints.up('md')]: {
        // fontSize: '0.625rem'
      },
      fontWeight: 700,
      lineHeight: '0.9',
      letterSpacing: '-0.04em'
    },
    h2: {
      fontFamily: fontFamilies.heading,
      fontSize: fontSizes[8],
      fontWeight: 700,
      lineHeight: ['2rem', '2.25rem', '2.5rem'],
      letterSpacing: '-0.03em'
    },
    h3: {
      fontFamily: fontFamilies.body,
      fontSize: fontSizes[7],
      fontWeight: 700,
      lineHeight: '1.25rem',
      letterSpacing: '0.025em'
    },
    h4: {
      fontFamily: fontFamilies.heading,
      fontSize: fontSizes[6],
      fontWeight: 700,
      lineHeight: ['1.75rem', '1.75rem', '2rem'],
      letterSpacing: '-0.02em'
    },
    h5: {
      fontFamily: fontFamilies.heading,
      fontWeight: 700,
      fontSize: fontSizes[5],
      lineHeight: 1.334,
      letterSpacing: '-0.02em'
    },
    h6: {
      fontFamily: fontFamilies.heading,
      fontWeight: 600,
      fontSize: fontSizes[4],
      lineHeight: 1.6,
      letterSpacing: '0.0075em'
    },

    // Subtitles
    subtitle: {
      fontFamily: fontFamilies.body,
      fontWeight: 700,
      fontSize: fontSizes[3],
      lineHeight: 1.75,
      letterSpacing: '0.00938em'
    },
    subtitle_tiny: {},
    subtitle_small: {
      fontFamily: fontFamilies.body,
      fontWeight: 500,
      fontSize: fontSizes[2],
      lineHeight: 1.57,
      letterSpacing: '0.00714em'
    },
    subtitle_medium: {
      fontFamily: fontFamilies.body,
      fontWeight: 500,
      fontSize: fontSizes[3],
      lineHeight: 1.57
    },
    subtitle_large: {},
    subtitle_medium_cap: {
      fontFamily: fontFamilies.body,
      fontWeight: 700,
      fontSize: fontSizes[3],
      lineHeight: 1.75,
      letterSpacing: '0.1em',
      textTransform: 'uppercase'
    },

    // Body
    body: {
      fontFamily: 'Inter',
      fontSize: fontSizes[3],
      lineHeight: '0.9',
      letterSpacing: '-0.04em'
    },
    body_tiny: {},
    body_tiny_bold: {
      fontFamily: fontFamilies.body,
      fontSize: fontSizes[1],
      fontWeight: 700,
      lineHeight: '1.5rem',
      letterSpacing: '0.03em'
    },
    body_small: {
      fontFamily: fontFamilies.body,
      fontSize: fontSizes[1],
      fontWeight: 400,
      lineHeight: '1.5rem'
    },
    body_small_bold: {
      fontFamily: fontFamilies.body,
      fontSize: fontSizes[1],
      fontWeight: 700,
      lineHeight: '1.5rem',
      letterSpacing: '0.03em'
    },
    body_small_cap: {
      fontFamily: fontFamilies.body,
      fontSize: fontSizes[1],
      fontWeight: 400,
      lineHeight: '1.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.03em'
    },
    body_small_cap_bold: {
      fontFamily: fontFamilies.body,
      fontSize: fontSizes[1],
      fontWeight: 700,
      lineHeight: '1.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.03em'
    },
    body_medium: {},
    body_large: {},
    body_caps_medium: {},

    // Caption
    caption: {
      fontFamily: fontFamilies.body,
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.66,
      letterSpacing: '0.03333em'
    },

    // Overline
    overline: {
      fontFamily: fontFamilies.body,
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase'
    },

    // Labels
    label_regular: {},
    label_tiny: {},
    label_medium: {},
    label_large: {},
    label_caps: {},

    // Button
    button_regular: {},
    button_tiny: {},
    button_medium: {},
    button_large: {},
    button_caps: {},

    price: {
      fontFamily: fontFamilies.monospace,
      fontWeight: 400,
      [muiTheme.breakpoints.up('xs')]: {
        fontSize: '0.1rem'
      },
      [muiTheme.breakpoints.up('md')]: {
        fontSize: '0.625rem'
      },
      lineHeight: '1rem',
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    }
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'primary' },
          style: {
            color: colors.gray['000'],
            border: '1px solid transparent',
            backgroundColor: colors.green['500'],
            '&:hover': {
              backgroundColor: lighten(0.05, colors.green['500'])
            },
            textTransform: 'uppercase',
            fontFamily: fontFamilies.body,
            fontWeight: 600,
            fontSize: fontSizes[2],
            letterSpacing: '0.05em'
          }
        },
        {
          props: { variant: 'default' },
          style: {
            color: colors.gray['000'],
            border: '1px solid transparent',
            backgroundColor: colors.gray['600'],
            '&:hover': {
              backgroundColor: lighten(0.05, colors.gray['600'])
            },
            textTransform: 'uppercase',
            fontFamily: fontFamilies.body,
            fontWeight: 600,
            fontSize: fontSizes[2],
            letterSpacing: '0.05em'
          }
        }
      ]
    }
  },
  palette: {
    ...muiTheme.palette,
    primary: {
      main: colors.gray['800'],
      light: colors.gray['400'],
      dark: colors.gray['900'],
      contrastText: 'white'
    },
    secondary: {
      main: colors.gray['100'],
      light: colors.gray['100'],
      dark: colors.gray['100'],
      contrastText: 'white'
    },
    buy: {
      main: colors.green['600'],
      light: colors.green['400'],
      dark: colors.green['900'],
      contrastText: 'white'
    },
    sell: {
      main: colors.red['600'],
      light: colors.red['400'],
      dark: colors.red['900'],
      contrastText: 'white'
    },
    background: {
      paper: colors.gray['800'],
      default: colors.gray['800']
    },
    // TODO: Remove focus
    focus: {
      green: '#4b9064',
      red: '#b23639'
    },
    // TODO: Remove colors
    ...colors
  },
  // TODO: Remove colors
  colors: {
    ...colors,
    background: {
      light: colors.gray['000'],
      dark: colors.gray['800']
    },
    focus: {
      green: '#4b9064',
      red: '#b23639'
    }
  }
}

// theme.breakpoints = breakpoints
export default theme
