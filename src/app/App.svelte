<script>
  import AppHeader from "~/components/app-header/AppHeader"
  import AppBody from "~/components/app-body/AppBody"
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
