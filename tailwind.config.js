/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-background': '#FBF9F6',
        'brand-text': '#333333',
        'brand-primary': '#1A1A1A',
        'brand-secondary': '#EFEBE6',
        'brand-muted': '#808080',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}