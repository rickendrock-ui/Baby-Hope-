/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Tambahkan font ramah anak di sini
        'comic-sans': ['"Comic Neue"', 'cursive', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}