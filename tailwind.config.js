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
        sans: ['Noto Sans JP', ...defaultTheme.fontFamily.sans],
        mono: ['Source Code Pro', 'Ubuntu Mono', 'monospace', ...defaultTheme.fontFamily.mono],
        serif: ['Noto Serif JP', 'serif', ...defaultTheme.fontFamily.serif],
        titillium: ['titillium web', ...defaultTheme.fontFamily.sans],
        mplus: ['M PLUS Rounded 1c', ...defaultTheme.fontFamily.sans],
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
      typography: (theme) => ({
        DEFAULT: {
          css: {},
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
