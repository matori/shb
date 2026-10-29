import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import mockApi from "./scripts/mock-api.js"

export default defineConfig({
  plugins: [svelte(), mockApi()],
  envDir: "env",
  publicDir: false,
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src/app", import.meta.url)),
    },
    extensions: [".mjs", ".js", ".svelte", ".json"],
  },
  build: {
    outDir: "public",
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
})
