import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#007AFF',
          purple: '#6366F1',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      backdropBlur: {
        'xl': '24px',
      },
    },
  },
  plugins: [],
} satisfies Config