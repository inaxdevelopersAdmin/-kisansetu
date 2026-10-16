/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f2f8f3',
          100: '#e1efe4',
          200: '#c5e0cb',
          300: '#9bc9a6',
          400: '#6cab7b',
          500: '#488e58',
          600: '#347242',
          700: '#2a5a35',
          800: '#1f4329',
          900: '#153c2b',
          950: '#0c2219',
        },
        harvest: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        soil: {
          50: '#fbf8f5',
          100: '#f6f0eb',
          200: '#eddcd1',
          300: '#dec2b1',
          400: '#cba18d',
          500: '#b8816c',
          600: '#a46b57',
          700: '#885545',
          800: '#6f463a',
          900: '#5c3c33',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
