/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
}
