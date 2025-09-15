/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'arelia-yellow': '#FFD200', 
        'arelia-gold': '#FDB813',
        'arelia-dark': '#2D3748',   
        'arelia-subtle': '#FFFBEB', 
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
        'wave-slow': 'wave 30s linear infinite',
        'wave-fast': 'wave 20s linear infinite reverse',
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
        wave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      }
    },
  },
  plugins: [],
}