import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        atlas: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        neon: {
          DEFAULT: '#00e5c5',
          400: '#00ffdc',
          600: '#00b09e',
        },
        magenta: {
          DEFAULT: '#ff0077',
          400: '#ff339a',
        },
        charcoal: {
          DEFAULT: '#06060e',
          50:  '#0c0c18',
          100: '#111122',
          200: '#1a1a2e',
          300: '#25253a',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':  'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' },                            to: { opacity: '1' } },
        slideUp:   { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        glowPulse: { '0%,100%': { opacity: '0.6' }, '50%': { opacity: '1' } },
      },
    },
  },
  plugins: [],
}
export default config
