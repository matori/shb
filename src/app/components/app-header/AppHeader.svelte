<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import AppLogo from "~/components/app-header/AppLogo"

  const removeAttrs = createNullValueObject([])
</script>

<template>
  <header {...$$props} {...removeAttrs} class="{$$props.class || ''} AppHeader">
    <div class="AppHeader-inner">
      <AppLogo class="AppHeader-logo" />
    </div>
  </header>
</template>

<style lang="scss" global>
  .AppHeader {
    padding-right: get-lines(1);
    padding-left: get-lines(1);
    background-color: var(--color-bg-content);
  }

  .AppHeader-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    height: 100%;
    max-width: var(--content-max-width);
    min-width: var(--content-min-width);
  }

  .AppHeader-logo {
  }
</style>
