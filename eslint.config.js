import js from "@eslint/js"
import svelte from "eslint-plugin-svelte"
import prettier from "eslint-config-prettier"
import globals from "globals"
import svelteConfig from "./svelte.config.js"

export default [
  {
    ignores: ["public/", "node_modules/"],
  },
  js.configs.recommended,
  ...svelte.configs.recommended,
  // 整形は Prettier にまかせる
  prettier,
  ...svelte.configs.prettier,
  {
    files: ["src/**/*.js", "src/**/*.svelte"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ["**/*.svelte", "**/*.svelte.js"],
    languageOptions: {
      parserOptions: {
        svelteConfig,
      },
    },
  },
  // ダミーAPIと設定ファイルは Node.js（26）で動く。Temporal も使える
  {
    files: ["scripts/**/*.js", "*.config.js"],
    languageOptions: {
      globals: { ...globals.node, Temporal: "readonly" },
    },
  },
]
