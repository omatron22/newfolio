/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Remove any custom font references
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["corporate", "dracula", "retro", "aqua"],
  },
};