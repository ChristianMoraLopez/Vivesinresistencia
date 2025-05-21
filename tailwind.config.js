/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4AB4FF',
          hover: '#1A97F5',
          active: '#007AD9',
          light: '#A8DBFF',
          dark: '#0369A1',
        },
        secondary: {
          DEFAULT: '#4A7BFF',
          hover: '#265DF7',
          active: '#0D3DEB',
          light: '#AABEFF',
          dark: '#1B3FC1',
        },
        accent: {
          DEFAULT: '#4AEDFF',
          hover: '#28D7E6',
          active: '#00C1D4',
          light: '#A8F8FF',
          dark: '#0893A2',
        },
        soft: {
          DEFAULT: '#D3FFF5',
          hover: '#B4FBEF',
          active: '#9AF3E5',
          light: '#E6FFFA',
          dark: '#9EDCD1',
        },
        bold: {
          DEFAULT: '#3F36FF',
          hover: '#271EFF',
          active: '#1A0FCC',
          light: '#928CFF',
          dark: '#1D16B0',
        },
        extra: {
          DEFAULT: '#9FD7FF',
          hover: '#84C8FF',
          active: '#64B7FF',
          light: '#D5EDFF',
          dark: '#519BCF',
        },
      },
    },
  },
  plugins: [],
};