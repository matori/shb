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
      column-gap: var(--line);
      padding-top: calc(var(--line) * 0.4);
      padding-bottom: calc(var(--line) * 0.4);
      background-color: var(--color-surface);
    }

    .AppHeader-inner {
      grid-column-start: 2;
      grid-column-end: 3;
      display: grid;
      grid-template-columns: min-content 1fr min-content;
      align-items: center;
      column-gap: var(--line);
    }

    .AppHeader-links {
      min-width: 0;
    }
  }
</style>
