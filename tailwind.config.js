/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        'tag-s': '180px',
        'tag-m': '240px',
        'tag-l': '300px',
        tab: '300px',
      },
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
        zen: ['Zen Kaku Gothic New', 'Noto Sans JP'],
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          md: '2rem',
          lg: '3rem',
          xl: '4rem',
          '2xl': '14rem',
        },
      },
      flex: {
        2: '1 0 auto',
        3: '0 0 auto',
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
