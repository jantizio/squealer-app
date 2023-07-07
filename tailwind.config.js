/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/*.{js,ts,jsx,tsx,css}',
    './src/components/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    container: {
      center: true,
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
