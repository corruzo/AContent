/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        cream: '#FDFCF8',
        sand: '#F5F0E8',
        stone: '#E8E0D4',
        terra: {
          50:  '#FFF5F0',
          100: '#FFE8DC',
          200: '#FFCDB5',
          300: '#FFA882',
          400: '#FF7A45',
          500: '#E85D20',
          600: '#C44A14',
          700: '#9E3A0E',
          800: '#7A2D0B',
          900: '#5C2009',
        },
        ink: {
          50:  '#F7F6F4',
          100: '#EDEBE6',
          200: '#D4CFC6',
          300: '#B5ADA0',
          400: '#8F8578',
          500: '#6B6258',
          600: '#524B42',
          700: '#3D3830',
          800: '#2A2520',
          900: '#1A1612',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'scroll-left': 'scrollLeft 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
      },
      keyframes: {
        scrollLeft: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
};
