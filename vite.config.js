import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import { svelteTesting } from "@testing-library/svelte/vite"
import mockApi from "./scripts/mock-api.js"

export default defineConfig({
  plugins: [svelte(), svelteTesting(), mockApi()],
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
  test: {
    include: ["src/**/*.test.js"],
    // 日時の表示のテストを、実行する環境に関係なく同じ結果にする
    env: { TZ: "Asia/Tokyo" },
  },
})
