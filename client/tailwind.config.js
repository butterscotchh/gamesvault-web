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
        y2k: {
          bg:       '#f0eaff',   // soft lavender page bg
          panel:    '#e8deff',   // lighter lavender panel
          card:     '#ede5ff',   // card background
          dark:     '#d8ccf5',   // slightly deeper lavender
          border:   '#b89ee8',   // muted purple border
          pink:     '#f5a8d0',   // baby pink
          lilac:    '#c9a8f5',   // lilac / soft purple
          mint:     '#a8e8c8',   // mint green
          sky:      '#a8d8f5',   // baby blue
          peach:    '#f5c8a8',   // soft peach / orange
          butter:   '#f5e8a8',   // butter yellow
          rose:     '#f0b8c8',   // dusty rose
          lavender: '#d0b8f5',   // medium lavender
          white:    '#ffffff',
          text:     '#4a3570',   // deep purple for readable text
          muted:    '#8870b8',   // muted purple for secondary text
        }
      },
      fontFamily: {
        inter:  ['Inter', 'system-ui', 'sans-serif'],
        pixel:  ['"Press Start 2P"', 'monospace'],
        y2k:    ['"VT323"', '"Courier New"', 'monospace'],
        chrome: ['"Orbitron"', '"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'y2k-pink':    '0 0 10px #f5a8d080, 0 0 24px #f5a8d040',
        'y2k-lilac':   '0 0 10px #c9a8f580, 0 0 24px #c9a8f540',
        'y2k-mint':    '0 0 10px #a8e8c880, 0 0 24px #a8e8c840',
        'y2k-sky':     '0 0 10px #a8d8f580, 0 0 24px #a8d8f540',
        'bevel-out':   '3px 3px 0 #b89ee8, -1px -1px 0 #e0d0ff',
        'bevel-in':    'inset 2px 2px 4px rgba(184,158,232,0.4), inset -1px -1px 2px rgba(255,255,255,0.8)',
        'panel':       '0 0 0 2px #b89ee8, 4px 4px 0 #c0b0e0, 0 0 20px #c9a8f530',
        'card-y2k':    '0 0 0 2px #c9a8f5, 4px 4px 0 #b89ee8, 0 0 15px #f5a8d020',
        'chrome':      '0 2px 0 rgba(255,255,255,0.8), 0 -1px 0 rgba(184,158,232,0.4)',
      },
      backgroundImage: {
        'y2k-hero':    'radial-gradient(ellipse at 50% 0%, #c9a8f540 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, #a8d8f530 0%, transparent 50%), linear-gradient(180deg, #f0eaff 0%, #e8deff 100%)',
        'y2k-panel':   'linear-gradient(135deg, #ede5ff 0%, #e8deff 50%, #f0eaff 100%)',
        'chrome-shine':'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 40%, rgba(184,158,232,0.1) 60%, rgba(255,255,255,0.3) 100%)',
        'rainbow-text':'linear-gradient(90deg, #f5a8d0, #c9a8f5, #a8d8f5, #a8e8c8, #f5e8a8, #f5c8a8, #f5a8d0)',
        'pastel-stripe':'linear-gradient(90deg, #f5a8d0, #c9a8f5, #a8d8f5, #a8e8c8, #f5e8a8, #f5c8a8, #f0b8c8, #f5a8d0)',
      },
      animation: {
        'pulse-slow':   'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker':      'flicker 4s linear infinite',
        'rainbow':      'rainbowShift 3s linear infinite',
        'float':        'float 3s ease-in-out infinite',
        'spin-slow':    'spin 8s linear infinite',
        'marquee':      'marquee 18s linear infinite',
        'blink':        'blink 1s step-end infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '92%': { opacity: 1 }, '93%': { opacity: 0.7 },
          '94%': { opacity: 1 }, '96%': { opacity: 0.8 }, '97%': { opacity: 1 },
        },
        rainbowShift: {
          '0%':   { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%':      { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}
