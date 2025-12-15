/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F14',
        surface: '#111827',
        primaryText: '#E5E7EB',
        secondaryText: '#9CA3AF',
        accent: {
          DEFAULT: '#6366F1', // Indigo
          secondary: '#22D3EE', // Soft Cyan
        },
        divider: '#1F2933',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
