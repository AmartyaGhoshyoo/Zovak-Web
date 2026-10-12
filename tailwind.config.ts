import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // "ink" naming kept for continuity — these are the light surfaces
        // (warm off-white paper), not dark ones.
        ink: "#F1E7D2",
        "ink-soft": "#E9DCC2",
        "ink-elev": "#FBF7EE",
        // Deep greens — used for whole sections (services, contact, footer)
        // and dark surfaces (terminal, gallery, assistant orb)
        forest: {
          DEFAULT: "#1F4E3A",
          soft: "#275C45",
          deep: "#163A2B",
        },
        night: {
          DEFAULT: "#13291F",
          soft: "#1C3A2C",
          line: "rgba(241,231,210,0.1)",
        },
        mint: "#CFE8C9",
        border: {
          DEFAULT: "rgba(31,58,43,0.12)",
          strong: "rgba(31,58,43,0.22)",
        },
        text: {
          DEFAULT: "#1B2A21",
          muted: "#4F5A4C",
          faint: "#5F6A58",
        },
        accent: {
          DEFAULT: "#2F6B4F",
          hover: "#255A42",
          soft: "rgba(47,107,79,0.1)",
        },
        // Light green — decorative on beige, readable on forest
        accent2: {
          DEFAULT: "#6DBF84",
          soft: "rgba(109,191,132,0.16)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        wrap: "1160px",
      },
      keyframes: {
        blink: {
          "0%, 50%": { opacity: "1" },
          "50.01%, 100%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
