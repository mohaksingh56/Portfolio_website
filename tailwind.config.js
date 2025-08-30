/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Professional color palette - muted and sophisticated
        'primary-teal': '#4db6ac',
        'primary-blue': '#5c9bd5',
        'secondary-green': '#7cb342',
        'secondary-purple': '#9575cd',
        'accent-amber': '#ffca28',
        'dark-primary': '#0f0f0f',
        'dark-secondary': '#1a1a1a',
        'dark-tertiary': '#2d2d2d',
        'dark-quaternary': '#404040',
        'text-primary': '#ffffff',
        'text-secondary': '#b0b0b0',
        'text-muted': '#808080',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float-gentle': 'float-gentle 6s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.8s ease-out',
      },
      keyframes: {
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        'twinkle': {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 1 },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: 0 },
          '100%': { transform: 'translateY(0px)', opacity: 1 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      backgroundImage: {
        'gradient-professional': 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2d2d2d 100%)',
      },
    },
  },
  plugins: [],
}

