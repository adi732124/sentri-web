import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'var(--accent)',
          bg: 'var(--accent-bg)',
          border: 'var(--accent-border)',
        },
        ui: {
          text: 'var(--text)',
          heading: 'var(--text-h)',
          bg: 'var(--bg)',
          border: 'var(--border)',
          'code-bg': 'var(--code-bg)',
        },
      },
      fontFamily: {
        sans: ['var(--sans)'],
        heading: ['var(--heading)'],
        mono: ['var(--mono)'],
      },
      boxShadow: {
        sentri: 'var(--shadow)',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
} satisfies Config
