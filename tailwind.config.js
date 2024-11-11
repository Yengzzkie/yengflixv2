/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/routes/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      '-1/2': '-50%',
    },
  },
  plugins: [],
}