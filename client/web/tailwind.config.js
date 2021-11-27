module.exports = {
  mode: "jit",
  purge: ["src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
  corePlugins: {
    preflight: false,
  },
};
