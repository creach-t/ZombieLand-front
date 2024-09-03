/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        greyZombie: '#B0B0B0',
        redZombie: '#C90000',
        greenZombie: '#62F974',
        darkGreenZombie: '#2B7D64',
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: '1' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        'fade-out': 'fadeOut 2s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};

