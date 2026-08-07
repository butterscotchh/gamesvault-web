/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brick: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#e6d4cd',
          300: '#d4b8ad',
          400: '#b88d7a',
          500: '#9e6b54',
          600: '#8a5942',
          700: '#734635',
          800: '#5c3629',
          900: '#45281e',
        }
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
