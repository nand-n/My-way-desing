import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // theme: {},
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#FBBF24',
        accent: '#D97706',
        background: '#F3F4F6',
        text: '#1F2937',
      },
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailgrids/plugin")],
};
export default config;
