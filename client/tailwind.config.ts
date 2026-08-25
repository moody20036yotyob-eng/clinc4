import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // EcoTrove Brand
        brand: {
          50: '#eef5ff',
          100: '#d9e8ff',
          200: '#bbd4ff',
          300: '#8cb7ff',
          400: '#578eff',
          500: '#2d63f0',
          600: '#1a45e6',
          700: '#1534d3',
          800: '#172dab',
          900: '#192c87',
          950: '#141e52',
        },
        // Neutral / Surface
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Accent / Gold
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Success
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        // Error
        error: {
          50: '#fff1f2',
          100: '#ffe4e6',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        arabic: ['Cairo', 'Noto Sans Arabic', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display-lg': ['3rem', { lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.01em' }],
        'display-sm': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
        'display-xs': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 12px -1px rgba(0, 0, 0, 0.07), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'elevated': '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 5px 15px -3px rgba(0, 0, 0, 0.06)',
        'modal': '0 20px 60px -10px rgba(0, 0, 0, 0.2)',
        'brand': '0 8px 24px -4px rgba(45, 99, 240, 0.3)',
        'brand-sm': '0 4px 12px -2px rgba(45, 99, 240, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-up': 'fadeUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(24px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        pulseSoft: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.7' } },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #1a45e6 0%, #2d63f0 50%, #578eff 100%)',
        'gradient-surface': 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        'gradient-hero': 'radial-gradient(ellipse at top center, rgba(45, 99, 240, 0.08) 0%, transparent 60%)',
        'grid-pattern': 'radial-gradient(circle, #2d63f015 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

export default config;
