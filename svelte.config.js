import { fileURLToPath } from "node:url"
import { sveltePreprocess } from "svelte-preprocess"

const baseScss = fileURLToPath(new URL("./src/app/assets/styles/base.scss", import.meta.url))

export default {
  preprocess: sveltePreprocess({
    scss: {
      prependData: `@import "${baseScss}";`,
    },
  }),
}
