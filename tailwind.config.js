const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss/tailwind-config').TailwindConfig } */
module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'brand-nebula': 'var(--color-brand-nebula)',
        'brand-black': 'var(--color-brand-black)',

        'neutral-lightest': 'var(--color-neutral-lightest)',
        'neutral-light': 'var(--color-neutral-light)',
        'neutral-dark': 'var(--color-neutral-dark)',
        'neutral-darkest': 'var(--color-neutral-darkest)',

        'uranus-base': 'var(--color-uranus-base)',

        'venus-base': 'var(--color-venus-base)',

        'nebula-lightest': 'var(--color-nebula-lightest)',
        'nebula-light': 'var(--color-nebula-light)',
        'nebula-dark': 'var(--color-nebula-dark)',
        'nebula-darkest': 'var(--color-nebula-darkest)',
      },
      boxShadow: {
        small: '0px 4px 8px rgba(35, 38, 59, 0.25)',
        medium: '0px 8px 16px rgba(35, 38, 59, 0.25)',
        large: '0px 12px 32px rgba(35, 38, 59, 0.25)',
      },
      transitionProperty: {
        width: 'width',
        height: 'height',
        'backdrop-filter': 'backdrop-filter',
      },
      transitionDuration: {
        DEFAULT: '300ms',
        2000: '2000ms',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      spacing: {
        header: '15rem',
      },
    },
    screens: {
      tablet: '768px',
      laptop: '1440px',
      'can-hover': { raw: '(any-hover: hover)' },
      'cannot-hover': { raw: '(any-hover: none)' },
    },
    zIndex: {
      dropdown: 5,
      'overlay-header': 10,
      header: 20,
      'autocomplete-panel': 30,
      dev: 40,
      'overlay-full': 50,
      refinements: 60,
      loader: 70,
      auto: 'auto',
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
