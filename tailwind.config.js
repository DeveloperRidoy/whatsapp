const colors = require('tailwindcss/colors');


module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        emerald: colors.emerald
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

  