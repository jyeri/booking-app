/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    container: {
      padding: {
        DEFAULT: "2rem",
        md: "8rem",
        lg: "10rem",
      },
    },
  },
  plugins: [],
};
