/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brick: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#e6d4cd',
          300: '#d4b8ad',
          400: '#b88d7a',
          500: '#9e6b54',
          600: '#8a5942',
          700: '#734635',
          800: '#5c3629',
          900: '#45281e',
        },
        cyber: {
          black:  '#050810',
          dark:   '#0a0f1e',
          card:   '#0d1426',
          border: '#1a2540',
          cyan:   '#00f5ff',
          green:  '#00ff88',
          purple: '#bf00ff',
          yellow: '#ffe600',
          red:    '#ff2050',
        }
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'neon-cyan':   '0 0 8px #00f5ff, 0 0 24px #00f5ff40',
        'neon-green':  '0 0 8px #00ff88, 0 0 24px #00ff8840',
        'neon-purple': '0 0 8px #bf00ff, 0 0 24px #bf00ff40',
        'neon-sm':     '0 0 4px #00f5ff80',
        'card-glow':   '0 4px 32px 0 #00f5ff18, 0 1px 0 0 #1a2540',
      },
      backgroundImage: {
        'grid-cyber':     "linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)",
        'hero-gradient':  "radial-gradient(ellipse 80% 60% at 50% 0%, #00f5ff18 0%, transparent 70%), linear-gradient(180deg, #050810 0%, #0a0f1e 100%)",
        'card-gradient':  "linear-gradient(135deg, #0d1426 0%, #0a0f1e 100%)",
      },
      backgroundSize: {
        'grid-size': '40px 40px',
      },
      animation: {
        'pulse-slow':    'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker':       'flicker 4s linear infinite',
        'scan':          'scan 6s linear infinite',
        'glow-breathe':  'glowBreathe 2.5s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '92%':      { opacity: 1 },
          '93%':      { opacity: 0.6 },
          '94%':      { opacity: 1 },
          '96%':      { opacity: 0.7 },
          '97%':      { opacity: 1 },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glowBreathe: {
          '0%, 100%': { boxShadow: '0 0 8px #00f5ff, 0 0 24px #00f5ff40' },
          '50%':      { boxShadow: '0 0 16px #00f5ff, 0 0 48px #00f5ff60' },
        }
      }
    },
  },
  plugins: [],
}
