import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#001736",
          600: "#002b5c",
          soft: "#7594cb",
          fixed: "#d6e3ff",
        },
        accent: {
          DEFAULT: "#fd8b00",
          600: "#904d00",
          text: "#603100",
          200: "#ffb77d",
          100: "#ffdcc3",
        },
        petrol: {
          DEFAULT: "#17292B",
          900: "#101E20",
          elev: "#1F3A3D",
          line: "#2E4A4D",
        },
        ink: {
          DEFAULT: "#0D0D0D",
          2: "#43474f",
        },
        surface: {
          DEFAULT: "#faf9fe",
          alt: "#F8F9FA",
          2: "#eeedf2",
          line: "#e3e2e7",
        },
        vivid: {
          orange: "#F5811E",
          "orange-600": "#DE6E12",
        },
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,23,54,.06), 0 1px 3px rgba(0,23,54,.08)",
        md: "0 6px 18px rgba(0,23,54,.08), 0 2px 6px rgba(0,23,54,.05)",
        lg: "0 18px 44px rgba(0,23,54,.12)",
        cta: "0 10px 24px rgba(253,139,0,.30)",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      maxWidth: {
        container: "1200px",
      },
      spacing: {
        gutter: "24px",
        section: "80px",
      },
      fontFamily: {
        heading: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(.22,.61,.36,1)",
      },
    },
  },
  plugins: [],
};

export default config;
