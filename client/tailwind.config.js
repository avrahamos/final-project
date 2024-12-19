/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'], 
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
      },
      colors: {
        militaryGreen: '#4b5320',
        militaryBrown: '#6b4423',
        militaryGray: '#5c5c5c',
      },
    },
  },
  plugins: [],
};
