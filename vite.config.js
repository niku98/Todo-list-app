import { fileURLToPath, URL } from "node:url";

import EnvCaster from "@niku/vite-env-caster";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import VueDevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueDevTools(), EnvCaster({
    declaration: false
  })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
