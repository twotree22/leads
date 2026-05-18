import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f2f6fb",
          100: "#dde8f5",
          700: "#14365d",
          800: "#102c4c",
          900: "#0b223d",
          950: "#07182b",
        },
        sage: {
          50: "#f1f8f3",
          100: "#dcefe1",
          200: "#bddfc7",
          500: "#4f9b68",
          600: "#397c50",
          700: "#2f6342",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(11, 34, 61, 0.1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
