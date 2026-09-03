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
          50: '#fdf8f6', 100: '#f2e8e5', 200: '#e6d4cd', 300: '#d4b8ad',
          400: '#b88d7a', 500: '#9e6b54', 600: '#8a5942', 700: '#734635',
          800: '#5c3629', 900: '#45281e',
        },
        nier: {
          black:   '#040405',   // deepest bg
          dark:    '#0e0d0c',   // slightly lighter bg
          panel:   '#1a1714',   // panel / card bg
          card:    '#141210',   // card bg
          brown:   '#3b3833',   // deep brown
          mid:     '#585046',   // medium taupe/brown
          muted:   '#bfbaa7',   // muted warm grey
          cream:   '#e6e1d1',   // primary text / light
          border:  '#3b3833',   // border color
          gold:    '#c8b882',   // accent gold
          dimgold: '#8a7a50',   // dim gold for secondary accents
        }
      },
      fontFamily: {
        inter:  ['Inter', 'system-ui', 'sans-serif'],
        pixel:  ['"Press Start 2P"', 'monospace'],
        y2k:    ['"VT323"', '"Courier New"', 'monospace'],
        chrome: ['"Orbitron"', '"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'nier-glow':   '0 0 12px rgba(200,184,130,0.25), 0 0 30px rgba(200,184,130,0.08)',
        'nier-panel':  '0 0 0 1px #3b3833, 4px 4px 0 #0e0d0c, 0 0 20px rgba(200,184,130,0.06)',
        'nier-card':   '0 0 0 1px #3b3833, 3px 3px 0 #0a0908',
        'bevel-out':   '3px 3px 0 #0a0908, -1px -1px 0 #3b3833',
        'bevel-in':    'inset 2px 2px 4px rgba(0,0,0,0.6), inset -1px -1px 2px rgba(200,184,130,0.06)',
      },
      backgroundImage: {
        'nier-hero':   'radial-gradient(ellipse at 50% 0%, rgba(200,184,130,0.08) 0%, transparent 60%), linear-gradient(180deg, #040405 0%, #0e0d0c 100%)',
        'nier-panel':  'linear-gradient(135deg, #1a1714 0%, #141210 60%, #1a1714 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker':    'flicker 5s linear infinite',
        'float':      'float 4s ease-in-out infinite',
        'spin-slow':  'spin 12s linear infinite',
        'marquee':    'marquee 22s linear infinite',
        'blink':      'blink 1.2s step-end infinite',
        'sigil-fade': 'sigilFade 6s ease-in-out infinite',
        'scan':       'scanLine 8s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '91%': { opacity: 1 }, '92%': { opacity: 0.5 },
          '93%': { opacity: 1 }, '95%': { opacity: 0.7 }, '96%': { opacity: 1 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%':      { opacity: 0 },
        },
        sigilFade: {
          '0%, 100%': { opacity: 0.12, transform: 'scale(1) rotate(0deg)' },
          '50%':      { opacity: 0.28, transform: 'scale(1.04) rotate(1deg)' },
        },
        scanLine: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
}
