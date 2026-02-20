/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0F',
        surface: '#12121A',
        border: '#1E1E2E',
        'text-primary': '#E4E4E7',
        'text-muted': '#71717A',
        cyan: '#00F0FF',
        magenta: '#FF00AA',
        green: '#00FF88',
        orange: '#FF6600',
      },
      fontFamily: {
        geist: ['var(--font-geist)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      keyframes: {
        'glitch': {
          '0%, 100%': { clipPath: 'inset(0 0 0 0)' },
          '20%': { clipPath: 'inset(20% 0 60% 0)' },
          '40%': { clipPath: 'inset(60% 0 10% 0)' },
          '60%': { clipPath: 'inset(40% 0 40% 0)' },
          '80%': { clipPath: 'inset(10% 0 80% 0)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'ticker': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'glitch': 'glitch 0.3s steps(5) forwards',
        'scan': 'scan 8s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'ticker': 'ticker 30s linear infinite',
      },
    },
  },
  plugins: [],
};
