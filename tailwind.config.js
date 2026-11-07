/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,js}",
    "./script.js"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#12315B',
          primary: '#2563EB',
          hover: '#1D4ED8',
          light: '#DBEAFE',
          soft: '#F4F8FD',
          accent: '#93C5FD'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
}
