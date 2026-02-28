/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#C12D2D",
        secondary: "#E47C21",
        dark: "#2C2B2B",
        background: "#F1E4D4",
        "card-bg": "#FDFAF6",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
