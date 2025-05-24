/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3B82F6', // Azul claro
          DEFAULT: '#2563EB', // Azul principal
          dark: '#1D4ED8', // Azul escuro
        },
        secondary: {
          light: '#10B981', // Verde claro
          DEFAULT: '#059669', // Verde principal
          dark: '#047857', // Verde escuro
        },
        neutral: {
          light: '#F3F4F6', // Cinza claro
          DEFAULT: '#9CA3AF', // Cinza principal
          dark: '#4B5563', // Cinza escuro
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Habilita o modo escuro
}
