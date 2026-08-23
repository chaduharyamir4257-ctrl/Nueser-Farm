/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ported 1:1 from the original styles.css :root variables
        "forest-dark": "#122318",
        forest: "#1F3D2B",
        "forest-mid": "#345837",
        sage: "#7B9B69",
        "sage-light": "#B7CBA0",
        cream: "#F1EDE0",
        "cream-card": "#FAF8F0",
        clay: "#A25C34",
        "clay-dark": "#7E4526",
        gold: "#D6A544",
        ink: "#1B241C",
        "ink-soft": "#4E574E",
        line: "rgba(18,35,24,0.12)",
      },
      fontFamily: {
        serif: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        organic: "63% 37% 54% 46% / 43% 47% 53% 57%",
      },
      boxShadow: {
        soft: "0 18px 40px -20px rgba(18,35,24,0.35)",
      },
    },
  },
  plugins: [],
};
