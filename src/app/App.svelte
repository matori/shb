<script>
  import { theme } from "~/store/config"
  import AppHeader from "~/components/app-header/AppHeader"
  import AppBody from "~/components/app-body/AppBody"

  // ライト・ダークを選んだときは <html data-theme> で固定し、自動のときは OS の設定に従う
  $effect(() => {
    if ($theme === "auto") {
      delete document.documentElement.dataset.theme
    } else {
      document.documentElement.dataset.theme = $theme
    }
  })
</script>

<AppHeader class="App-header" />
<AppBody class="App-body" />

<style>
  :global {
    html {
      height: 100%;
      font-size: 100%;
    }

    body {
      display: grid;
      grid-template-rows: auto 1fr;
      row-gap: calc(var(--line) * 0.75);
      height: 100%;
      margin: 0;
      background-color: var(--color-bg);
      color: var(--color-text);
      font-family: var(--ff-sans);
    }

    a {
      color: var(--color-accent);

      &:hover {
        color: var(--color-accent-hover);
      }
    }

    .App-body {
      min-height: 600px;
    }
  }
</style>
