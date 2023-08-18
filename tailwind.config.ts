import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "black-swoosh": "black-swoosh 10s ease infinite",
      },
      keyframes: {
        "black-swoosh": {
          "0%": {
            "background-size": "600% 100%",
            "background-position": "left center",
            "background-image":
              "linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(64, 64, 64, 0.8), rgba(128, 128, 128, 0.8), rgba(0, 0, 0, 0.8), rgba(64, 64, 64, 0.8), rgba(128, 128, 128, 0.8), rgba(0, 0, 0, 0.8))",
          },
          "50%": {
            "background-size": "600% 100%",
            "background-position": "right center",
            "background-image":
              "linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(64, 64, 64, 0.8), rgba(128, 128, 128, 0.8), rgba(0, 0, 0, 0.8), rgba(64, 64, 64, 0.8), rgba(128, 128, 128, 0.8), rgba(0, 0, 0, 0.8))",
          },
          "100%": {
            "background-size": "600% 100%",
            "background-position": "left center",
            "background-image":
              "linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(64, 64, 64, 0.8), rgba(128, 128, 128, 0.8), rgba(0, 0, 0, 0.8), rgba(64, 64, 64, 0.8), rgba(128, 128, 128, 0.8), rgba(0, 0, 0, 0.8))",
          },
        },
      },
      fontSize: {
        small: "16px",
      },
      colors: {
        primary: "#0a0a0a",
        secondary: "#1E1E1E",
        tertiary: "#f5f5f5",
        accent: "#FFA500",
      },
    },
  },
  plugins: [],
};
export default config;
