/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#e6f0ff',
            100: '#cce0ff',
            200: '#99c0ff',
            300: '#66a0ff',
            400: '#3380ff',
            500: '#0066ff',
            600: '#0052cc',
            700: '#003d99',
            800: '#002966',
            900: '#001433',
          },
          secondary: {
            50: '#e6f0ff',
            100: '#cce0ff',
            200: '#99c0ff',
            300: '#66a0ff',
            400: '#3380ff',
            500: '#0066ff',
            600: '#0052cc',
            700: '#003d99',
            800: '#002966',
            900: '#001433',
          },
        },
        fontFamily: {
          sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
  };