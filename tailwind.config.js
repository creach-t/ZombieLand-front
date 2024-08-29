
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greyZombie: '#B0B0B0',
        redZombie: '#C90000',
        greenZombie: '#62F974',
        darkGreenZombie: '#2B7D64'
      }
    },
  },
  plugins: [],
}
