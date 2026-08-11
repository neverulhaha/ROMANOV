/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#fcfcfc',
        navy: {
          50: '#f2f4f7',
          100: '#c7d0e2',
          800: '#0d172b',
          900: '#142342',
        },
        gold: {
          light: '#fbf9f1',
          DEFAULT: '#dac773',
          dark: '#b89f31',
        },
        darkBg: '#0c0c0c',
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
