import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import Unocss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    Unocss({
      /* options */
    }),
  ],
  base: "/mobile",
  server: {
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
});
