/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"SF Pro Display"', '"Inter"', 'system-ui', 'sans-serif']
      },
      colors: {
        navly: {
          primary: '#6EE7FF',
          accent: '#818CF8'
        }
      },
      backdropBlur: {
        xs: '2px'
      },
      boxShadow: {
        glow: '0 0 30px rgba(129, 140, 248, 0.55)',
        neon: '0 0 20px rgba(110, 231, 255, 0.45)'
      },
      backgroundImage: {
        'radial-grid': 'radial-gradient(circle at 20% 20%, rgba(129, 140, 248, 0.45) 0, transparent 45%), radial-gradient(circle at 80% 0%, rgba(14, 165, 233, 0.35) 0, transparent 55%)'
      }
    }
  },
  plugins: []
};

