/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: '#root',
  theme: {
    extend: {
      colors: {
        // Vigilant Lens Design System — "The Digital Curator"
        surface: {
          DEFAULT: '#0b1326',
          dim: '#0b1326',
          bright: '#31394d',
          'container-lowest': '#060e20',
          'container-low': '#131b2e',
          container: '#171f33',
          'container-high': '#222a3d',
          'container-highest': '#2d3449',
          variant: '#2d3449',
          tint: '#b7c4ff',
        },
        primary: {
          DEFAULT: '#b7c4ff',
          container: '#0052ff',
          fixed: '#dde1ff',
          'fixed-dim': '#b7c4ff',
          'on': '#002682',
          'on-container': '#dfe3ff',
          'on-fixed': '#001452',
          'on-fixed-variant': '#0038b6',
          inverse: '#004ced',
        },
        secondary: {
          DEFAULT: '#b7c8e1',
          container: '#3a4a5f',
          fixed: '#d3e4fe',
          'fixed-dim': '#b7c8e1',
          'on': '#213145',
          'on-container': '#a9bad3',
        },
        tertiary: {
          DEFAULT: '#ffb3b6',
          container: '#cd003c',
          fixed: '#ffdada',
          'fixed-dim': '#ffb3b6',
          'on': '#68001a',
          'on-container': '#ffddde',
        },
        error: {
          DEFAULT: '#ffb4ab',
          container: '#93000a',
          'on': '#690005',
          'on-container': '#ffdad6',
        },
        'on-background': '#dae2fd',
        'on-surface': '#dae2fd',
        'on-surface-variant': '#c3c5d9',
        outline: '#8d90a2',
        'outline-variant': '#434656',
        background: '#0b1326',
        'inverse-surface': '#dae2fd',
        'inverse-on-surface': '#283044',
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        label: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        'glass': '12px',
      },
      boxShadow: {
        'ambient': '0 20px 40px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
