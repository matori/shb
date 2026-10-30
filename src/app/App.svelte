<script>
  import { settings } from "~/store/settings.svelte.js"
  import { entryFeeds } from "~/store/entryFeeds.svelte.js"
  import AppHeader from "~/components/header/AppHeader.svelte"
  import AppMain from "~/components/main/AppMain.svelte"

  // ライト・ダークを選んだときは <html data-theme> で固定し、自動のときは OS の設定に従う
  $effect(() => {
    if (settings.theme === "auto") {
      delete document.documentElement.dataset.theme
    } else {
      document.documentElement.dataset.theme = settings.theme
    }
  })

  // 自動更新が有効なら、設定した間隔でエントリーの一覧を読み込み直す
  $effect(() => {
    if (!settings.autoRefreshEnabled) {
      return
    }
    const timer = setInterval(() => entryFeeds.load(), settings.autoRefreshIntervalMinutes * 60 * 1000)
    return () => clearInterval(timer)
  })
</script>

<AppHeader />
<AppMain class="App-main" />

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

    .App-main {
      min-height: 600px;
    }
  }
</style>
