/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kob: {
          void:    '#0a0a12',
          dark:    '#0f0f1e',
          deep:    '#14142a',
          card:    '#1a1a35',
          border:  '#2a2a55',
          purple:  '#7c3aed',
          violet:  '#8b5cf6',
          lavender:'#a78bfa',
          blue:    '#3b82f6',
          cyan:    '#06b6d4',
          glow:    '#c4b5fd',
          light:   '#f0eeff',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body:    ['var(--font-body)', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 0v40M40 0v40M0 0h40M0 40h40' stroke='%232a2a55' stroke-width='0.5'/%3E%3C/svg%3E\")",
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% -10%, #3b1d8a 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(135deg, #1a1a35 0%, #14142a 100%)',
        'purple-glow': 'radial-gradient(circle at center, #7c3aed33 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px #7c3aed44' },
          '50%': { boxShadow: '0 0 40px #7c3aed88, 0 0 80px #7c3aed22' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'kob': '0 0 30px rgba(124,58,237,0.3)',
        'kob-lg': '0 0 60px rgba(124,58,237,0.4)',
        'card': '0 4px 32px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
};
