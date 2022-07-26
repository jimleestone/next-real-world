/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5cb85c',
        'primary-300': '#a3d7a3',
        'primary-600': '#449d44',
        'primary-700': '#419641',
        'primary-800': '#398439',
        'primary-900': '#2d672d',
      },
      fontFamily: {
        sans: ['source sans pro', ...defaultTheme.fontFamily.sans],
        titillium: ['titillium web', ...defaultTheme.fontFamily.sans],
        mono: ['monospace', ...defaultTheme.fontFamily.mono],
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          md: '1rem',
          lg: '3rem',
          xl: '4rem',
          '2xl': '14rem',
        },
      },
      flex: {
        2: '1 0 10%',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
