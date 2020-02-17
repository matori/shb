<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import AppLogo from "~/components/app-header/AppLogo"
  import AppSettings from "~/components/app-header/AppSettings"
  import AppFavLinks from "~/components/app-header/AppFavLinks.svelte"

  const removeAttrs = createNullValueObject([])
</script>

<template>
  <header {...$$props} {...removeAttrs} class="{$$props.class || ''} AppHeader">
    <div class="AppHeader-inner">
      <AppLogo class="AppHeader-logo" />
      <AppFavLinks class="AppHeader-links" />
      <AppSettings class="AppHeader-tools" />
    </div>
  </header>
</template>

<style lang="scss" global>
  .AppHeader {
    display: grid;
    grid-template-columns: 1fr minmax(var(--content-min-width), var(--content-max-width)) 1fr;
    grid-template-rows: get-lines(2);
    column-gap: get-lines(1);
    background-color: var(--color-bg-content);
  }

  .AppHeader-inner {
    grid-column-start: 2;
    grid-column-end: 3;
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    grid-template-rows: 100%;
    column-gap: get-lines(2);
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
</style>
