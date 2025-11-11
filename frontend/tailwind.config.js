/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",   // Indigo
        secondary: "#ef4444", // Red
        dark: "#0f172a",
        light: "#f8fafc",
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Support dark mode
}