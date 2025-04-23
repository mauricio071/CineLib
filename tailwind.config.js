/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#b71c1c",
        secondary: "#121212",
        tertiary: "#1e1e1e",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "2rem",
        xl: "4.5rem",
        "2xl": "8rem",
      },
    },
  },
  plugins: [],
};
