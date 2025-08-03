import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design System Colors
        primary: {
          blue: '#007AFF',
          purple: '#6366F1',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        // Extended color palette
        blue: {
          500: '#3B82F6',
          600: '#007AFF',
        },
        purple: {
          500: '#8B5CF6',
          600: '#6366F1',
        },
        green: {
          500: '#10B981',
          600: '#059669',
        },
        orange: {
          500: '#F59E0B',
          600: '#D97706',
        },
        red: {
          500: '#EF4444',
          600: '#DC2626',
        },
      },
      backdropBlur: {
        'xl': '24px',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #007AFF, #6366F1)',
        'gradient-button': 'linear-gradient(to right, rgb(37 99 235), rgb(147 51 234))',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
} satisfies Config