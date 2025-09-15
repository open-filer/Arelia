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
        playfair: ['"Playfair Display"', 'serif'],
        poppins: ['Poppins', 'sans-serif'], 
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'pulse-slow': 'pulse-slow 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-slow': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
        },
      }
    },
  },
  plugins: [],
}