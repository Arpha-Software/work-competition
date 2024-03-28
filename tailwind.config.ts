import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "3.5xl": "2rem",
      },
      spacing: {
        75: "18.75rem",
      },
      colors: {
        primary: "#2C64DF",
        secondary: "#FFCC2E",
        disabled: "#BCBCBC",
      }
    },
  },
  plugins: [],
};
export default config;
