/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF', // Pure white
        secondaryBg: '#F5F5F7', // Apple light gray
        surface: '#FFFFFF',
        primaryText: '#1D1D1F', // Apple near black
        secondaryText: '#6E6E73', // Apple text gray
        accent: {
          DEFAULT: '#0071E3', // Apple minimal blue
          secondary: '#E5E7EB', // Subtle neutral
        },
        divider: '#E5E7EB',
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
