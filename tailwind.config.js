/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        main: "clamp(0vw,1000px,90vw)",
      },
      fontFamily: {
        body: ["Noto Sans JP", "sans-serif"],
      },
    },
  },
  plugins: [],
};
