import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-cabinet)', 'Clash Display', 'sans-serif'],
        body: ['var(--font-satoshi)', 'Satoshi', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        void: {
          50:  '#f0eeff',
          100: '#e2dcff',
          200: '#c5b9ff',
          300: '#a896ff',
          400: '#8b73ff',
          500: '#6e50ff',
          600: '#5740cc',
          700: '#413099',
          800: '#2b2066',
          900: '#160f33',
          950: '#0a0618',
        },
        ember: {
          400: '#fb923c',
          500: '#f97316',
        },
        aurora: {
          cyan: '#22d3ee',
          green: '#4ade80',
          pink: '#f472b6',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'gradient-x': 'gradientX 4s ease infinite',
        'text-shimmer': 'textShimmer 3s ease-in-out infinite',
        'cursor-blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(1deg)' },
          '66%': { transform: 'translateY(6px) rotate(-1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(110,80,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(110,80,255,0.06) 1px, transparent 1px)',
        'dot-pattern': 'radial-gradient(rgba(110,80,255,0.15) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
        'dot': '24px 24px',
      },
    },
  },
  plugins: [],
}

export default config