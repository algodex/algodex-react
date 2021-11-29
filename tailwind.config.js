module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
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
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
