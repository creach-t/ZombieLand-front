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
        jump: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-100px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        jump: 'jump 700ms ease',
      },
    },
  },
  plugins: [],
};
