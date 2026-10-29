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
      grid-template-rows: calc(var(--line) * 2 + 1px) 1fr;
      row-gap: calc(var(--line) - var(--line-edge));
      height: 100%;
      margin: 0;
      background-color: var(--color-bg-base);
      color: var(--color-text-base);
      font-family: var(--ff-sans);
    }

    .App-header {
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-bottom-color: var(--color-border-base);
      box-shadow: var(--shadow-base);
    }

    .App-body {
      min-height: 600px;
    }
  }
</style>
