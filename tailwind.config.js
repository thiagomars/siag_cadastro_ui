// tailwind.config.js
const colors = require('tailwindcss/colors')

const theme = process.env.SOLFI_THEME;

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: colors.sky[50],
          100: colors.sky[100],
          200: colors.sky[200],
          300: colors.sky[300],
          400: colors.sky[400],
          500: colors.sky[500],
          600: colors.sky[600],
          700: colors.sky[700],
          800: colors.sky[800],
          900: colors.sky[900],
          950: colors.sky[950],
        },
      },
    },
  },
  plugins: [],
}