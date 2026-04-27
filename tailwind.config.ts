import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          bg: 'var(--accent-bg)',
          border: 'var(--accent-border)',
        },
        ui: {
          bg: 'var(--bg)',
          subtle: 'var(--bg-subtle)',
          muted: 'var(--bg-muted)',
          surface: 'var(--surface)',
          text: 'var(--text)',
          heading: 'var(--text-h)',
          'text-muted': 'var(--text-muted)',
          border: 'var(--border)',
          'border-strong': 'var(--border-strong)',
          'code-bg': 'var(--code-bg)',
        },
        success: {
          DEFAULT: 'var(--success)',
          bg: 'var(--success-bg)',
          border: 'var(--success-border)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          bg: 'var(--warning-bg)',
          border: 'var(--warning-border)',
        },
        danger: {
          DEFAULT: 'var(--danger)',
          bg: 'var(--danger-bg)',
          border: 'var(--danger-border)',
        },
        high: {
          DEFAULT: 'var(--high)',
          bg: 'var(--high-bg)',
          border: 'var(--high-border)',
        },
        info: {
          DEFAULT: 'var(--info)',
          bg: 'var(--info-bg)',
          border: 'var(--info-border)',
        },
      },
      fontFamily: {
        sans: ['var(--sans)'],
        heading: ['var(--heading)'],
        mono: ['var(--mono)'],
      },
      boxShadow: {
        sentri: 'var(--shadow)',
        'sentri-sm': 'var(--shadow-sm)',
        'sentri-md': 'var(--shadow-md)',
        'sentri-lg': 'var(--shadow-lg)',
        'sentri-xl': 'var(--shadow-xl)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      transitionTimingFunction: {
        sentri: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        fast: '100ms',
        DEFAULT: '150ms',
        slow: '250ms',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
} satisfies Config
