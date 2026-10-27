/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#141414',
        border: '#001000',
        text: '#9CFF8C',
        primary: '#C6FF3D',
        accent: '#33FF66',
        // Tints and glow shades derived strictly from these:
        'surface-hover': '#1a1a1a',
        'surface-subtle': '#0c0c0c',
        'text-muted': 'rgba(156, 255, 140, 0.65)',
        'text-dim': 'rgba(156, 255, 140, 0.4)',
        'accent-glow': 'rgba(51, 255, 102, 0.25)',
        'primary-glow': 'rgba(198, 255, 61, 0.3)',
      },
      fontFamily: {
        headline: ['"Silkscreen"', 'monospace'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(51, 255, 102, 0.2)',
        'glow': '0 0 20px rgba(51, 255, 102, 0.35)',
        'glow-primary': '0 0 25px rgba(198, 255, 61, 0.4)',
        'inner-glow': 'inset 0 0 15px rgba(51, 255, 102, 0.15)',
      },
      borderRadius: {
        card: '16px',
      },
      letterSpacing: {
        widest: '0.2em',
        ultra: '0.25em',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(51, 255, 102, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(51, 255, 102, 0.5)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        scanline: 'scanline 8s linear infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
