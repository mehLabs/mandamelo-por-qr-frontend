/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    textColor: {
      white: "#FFF"
    },
    extend: {
    },
    colors: {
      'color1': '#DEB992',
      'color2': {
        DEFAULT: '#1BA098',
        500: '#8DD0CC'
      }
    }
  },
  plugins: [require('flowbite/plugin')],
}
