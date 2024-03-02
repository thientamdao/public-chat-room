/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
  content: ['./public/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-light': 'rgb(var(--primary-light))',
        'primary-dark': 'rgb(var(--primary-dark))',
        'secondary-light': 'rgb(var(--secondary-light))',
        'secondary-dark': 'rgb(var(--secondary-dark))',
        'mono-light': 'rgb(var(--mono-light))',
        'mono-dark': 'rgb(var(--mono-dark))',
        'success-light': 'rgb(var(--success-light))',
        'success-dark': 'rgb(var(--success-dark))',
        'danger-light': 'rgb(var(--danger-light))',
        'danger-dark': 'rgb(var(--danger-dark))',
      },
      fontFamily: {
        sans: ['Montserrat', 'Segoe UI', 'sans-serif'],
      },
      keyframes: {
        beat: {
          '0%': { transform: 'scale(1)' },
          '20%': { transform: 'scale(0.3)' },
          '40%': { transform: 'scale(0.3)' },
          '60%': { transform: 'scale(1)' },
        },
        countDown: {
          '0%': { width: '100%' },
          '100%': { width: '0' },
        },
        moveInTop: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-2rem)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        beat: 'beat 1s linear infinite',
        moveInTop: 'moveInTop .3s ease',
      },
      animationDirection: {
        forwards: 'forwards',
      },
    },
  },
  safelist: [
    {
      pattern:
        /(bg|text|border)-(primary|secondary|mono|success|danger)-(light|dark)/,
      variants: ['hover'],
    },
  ],
  plugins: [
    plugin(function ({ addUtilities, matchUtilities, theme }) {
      matchUtilities(
        {
          'animate-delay': (value) => ({
            animationDelay: value,
          }),
        },
        { values: theme('transitionDelay') },
      )
      addUtilities({
        '.fill-mode-forwards': {
          animationFillMode: 'forwards',
        },
      })
    }),
  ],
}
