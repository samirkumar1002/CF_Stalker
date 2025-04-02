/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cf-blue': '#1E88E5',
        'cf-dark': '#1B1B1B',
        'cf-gray': '#2D2D2D',
        'cf-light': '#F5F5F5',
        'cf-text': '#E0E0E0',
        'cf-link': '#4FC3F7',
        'cf-success': '#4CAF50',
        'cf-warning': '#FFC107',
        'cf-error': '#F44336',
      },
      fontFamily: {
        'cf': ['Consolas', 'Monaco', 'monospace'],
        'cf-sans': ['Arial', 'sans-serif'],
      },
      boxShadow: {
        'cf': '0 2px 4px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
  darkMode: true,
} 