/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        accent: {
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        surface: {
          DEFAULT: '#f8fafc',
          muted: '#f1f5f9',
          dark: '#0f172a',
          card: '#ffffff',
        },
        title: '#010101',
        description: '#2A2C11',
      },
      fontFamily: {
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        title: ['var(--text-title-size)', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        description: ['var(--text-description-size)', { lineHeight: '1.5' }],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 4px 24px -4px rgb(15 23 42 / 0.08)',
        'card-hover': '0 12px 32px -8px rgb(15 23 42 / 0.14)',
        contact: '0 4px 12px rgba(0, 0, 0, 0.08)',
        nav: '0 1px 0 0 rgb(15 23 42 / 0.06), 0 4px 16px -4px rgb(15 23 42 / 0.08)',
      },
      maxWidth: {
        content: 'var(--content-max-width)',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      nav: '900px',
      lg: '1085px',
      xl: '1280px',
      content: '1344px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
