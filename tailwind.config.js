/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'win-desktop': '#008080',
        'win-gray': '#C0C0C0',
        'win-gray-light': '#DFDFDF',
        'win-gray-dark': '#808080',
        'win-white': '#FFFFFF',
        'win-black': '#000000',
        'win-navy': '#000080',
        'win-title': '#FFFFFF',
        'win-highlight': '#0A246A',
        'win-btn': '#C0C0C0',
      },
      fontFamily: {
        system: ['var(--font-sans)', 'Tahoma', 'Geneva', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
