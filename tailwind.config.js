module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  media: false, // or 'darkMode' or 'class'
  important: '#root',
  theme: {
    screens: {
      xs: '320px',
      // => @media (min-width: 475px) { ... }

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
        blue: {
          '000': '#7face6',
          100: '#6a9ee2',
          200: '#5590dd',
          300: '#3f82d9',
          400: '#2d75d6',
          500: '#2a74d5',
          600: '#2668c0',
          700: '#225daa',
          800: '#1d5195',
          900: '#194680'
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
      },
      backgroundImage: {
        unauthorized: "url('/unauthorized.png')",
        'unauthorized-mobile': "url('/m-unauthorized.png')"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
