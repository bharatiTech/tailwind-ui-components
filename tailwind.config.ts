import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0D98BA",
        secondary: "#F5F5F5",
        accent: "#E53E3E",
      },
      borderRadius: {
        "button-lg": "12px",
      },
    },
  },
  plugins: [],
};

export default config;
