/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'skeleton':"repeat(auto-fit, minmax(240px, 1fr))"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
