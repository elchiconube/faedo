/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue,svelte}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef8f4',
          100: '#d5efe4',
          200: '#ace0ca',
          300: '#7cccb0',
          400: '#4fb399',
          500: '#349981',
          600: '#287a68',
          700: '#225f54',
          800: '#1f4d44',
          900: '#1b413a',
        },
      },
    },
  },
  plugins: [],
};

