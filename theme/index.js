import { createTheme } from '@mui/material/styles'

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
  heading: `'Alliance No.1', Inter, sans-serif`,
  body: 'Inter, sans-serif',
  monospace: `'Roboto Mono', monospace`
}

const fontSizes = [10, 12, 14, 16, 20, 24, 32, 40, 48, 64]

export const parseThemeColor = (str) => {
  return str.split('.').reduce((o, i) => o[i], colors)
}
const theme = createTheme({
  fontFamilies,
  palette: {
    primary: {
      main: colors.green['500']
    },
    secondary: {
      main: colors.gray['600']
    },
    background: {
      light: colors.gray['000'],
      dark: colors.gray['800']
    },
    ...colors
  },
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
})
// export default theme
export default {
  ...theme,
  background: colors.gray['800'],
  typography: {
    ...theme.typography,
    infoHeader: {
      as: 'p',
      fontFamily: fontFamilies.heading,
      fontWeight: 400,
      fontSize: fontSizes[3],
      lineHeight: '1.5rem'
    },
    title: {
      as: 'h1',
      fontFamily: fontFamilies.heading,
      fontSize: fontSizes[7],
      [theme.breakpoints.up('md')]: {
        fontSize: fontSizes[8]
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: fontSizes[9]
      },
      fontWeight: 700,
      lineHeight: '0.9',
      letterSpacing: '-0.04em'
    },
    headerLg: {
      as: 'h2',
      fontFamily: fontFamilies.heading,
      fontSize: fontSizes[5],
      [theme.breakpoints.up('md')]: {
        fontSize: fontSizes[6]
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: fontSizes[7]
      },
      fontWeight: 700,
      lineHeight: ['2rem', '2.25rem', '2.5rem'],
      letterSpacing: '-0.03em'
    },
    headerSm: {
      as: 'h3',
      fontFamily: fontFamilies.heading,
      fontSize: fontSizes[5],
      [theme.breakpoints.up('md')]: {
        fontSize: fontSizes[4]
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: fontSizes[5],
        lineHeight: '2rem'
      },
      fontWeight: 700,
      lineHeight: '1.75rem',
      letterSpacing: '-0.02em'
    },
    headerCaps: {
      as: 'h3',
      fontFamily: fontFamilies.body,
      fontSize: fontSizes[3],
      fontWeight: 700,
      lineHeight: '1.25rem',
      textTransform: 'uppercase',
      letterSpacing: '0.12em'
    },
    bodyCopyLg: {
      as: 'p',
      fontFamily: fontFamilies.body,
      fontSize: fontSizes[4],
      fontWeight: 500,
      lineHeight: '1.75rem'
    },
    bodyCopy: {
      as: 'p',
      fontFamily: fontFamilies.body,
      fontSize: fontSizes[3],
      fontWeight: 500,
      lineHeight: '1.5rem'
    },
    bodyCopyMono: {
      as: 'dd',
      fontFamily: fontFamilies.monospace,
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: '1.5rem'
    },
    bodyCopySm: {
      as: 'p',
      fontFamily: fontFamilies.body,
      fontSize: fontSizes[2],
      fontWeight: 500,
      lineHeight: '1.25rem'
    },
    bodyCopyTiny: {
      as: 'p',
      fontFamily: fontFamilies.body,
      fontSize: fontSizes[0],
      fontWeight: 400,
      lineHeight: '1rem',
      textTransform: 'uppercase',
      letterSpacing: '0.04em'
    },
    bodyCopyTinyMono: {
      as: 'p',
      fontFamily: fontFamilies.monospace,
      fontSize: fontSizes[0],
      fontWeight: 400,
      lineHeight: '1rem',
      textTransform: 'uppercase',
      letterSpacing: '0.04em'
    },
    preTitle: {
      as: 'h2',
      fontFamily: fontFamilies.body,
      fontSize: fontSizes[2],
      fontWeight: 700,
      lineHeight: '1.25rem',
      textTransform: 'uppercase',
      letterSpacing: '0.025em'
    },
    labelLg: {
      as: 'span',
      fontFamily: fontFamilies.body,
      fontSize: fontSizes[2],
      fontWeight: 700,
      lineHeight: '1.25rem',
      textTransform: 'uppercase',
      letterSpacing: '0.025em'
    },
    labelMd: {
      as: 'span',
      fontFamily: fontFamilies.body,
      fontSize: fontSizes[1],
      fontWeight: 700,
      lineHeight: '1.125rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    labelMdLight: {
      as: 'span',
      fontFamily: fontFamilies.body,
      fontSize: fontSizes[1],
      fontWeight: 500,
      lineHeight: '1.125rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    labelMdSpaced: {
      as: 'span',
      fontFamily: fontFamilies.body,
      fontSize: fontSizes[1],
      fontWeight: 500,
      lineHeight: '1.125rem',
      textTransform: 'uppercase',
      letterSpacing: '0.2em'
    },
    labelSm: {
      as: 'span',
      fontFamily: fontFamilies.body,
      fontSize: fontSizes[0],
      fontWeight: 700,
      lineHeight: '1rem',
      textTransform: 'uppercase',
      letterSpacing: '0.04em'
    },
    labelSmForm: {
      as: 'span',
      fontFamily: fontFamilies.body,
      fontSize: fontSizes[0],
      fontWeight: 700,
      lineHeight: '0.9rem',
      textTransform: 'uppercase',
      letterSpacing: '0.1em'
    }
  }
}
