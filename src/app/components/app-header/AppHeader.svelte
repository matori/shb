<script>
  import AppLogo from "~/components/app-header/AppLogo"
  import AppSettings from "~/components/app-header/AppSettings"
  import AppFavLinks from "~/components/app-header/AppFavLinks.svelte"

  let { class: className = "", ...rest } = $props()
</script>

<header {...rest} class={[className, "AppHeader"]}>
  <div class="AppHeader-inner">
    <AppLogo class="AppHeader-logo" />
    <AppFavLinks class="AppHeader-links" />
    <AppSettings class="AppHeader-tools" />
  </div>
</header>

<style>
  :global {
    .AppHeader {
      display: grid;
      grid-template-columns: 1fr minmax(var(--content-min-width), var(--content-max-width)) 1fr;
      grid-template-rows: calc(var(--line) * 2);
      column-gap: var(--line);
      background-color: var(--color-bg-content);
    }

    .AppHeader-inner {
      grid-column-start: 2;
      grid-column-end: 3;
      display: grid;
      grid-template-columns: min-content 1fr min-content;
      grid-template-rows: 100%;
      column-gap: calc(var(--line) * 2);
    }

    .AppHeader-logo {
      grid-column-start: 1;
      grid-column-end: 2;
    }

    .AppHeader-links {
      grid-column-start: 2;
      grid-column-end: 3;
      min-width: 0;
    }
  }
</style>
