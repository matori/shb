<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import AppLogo from "~/components/app-header/AppLogo"

  const removeAttrs = createNullValueObject([])
</script>

<template>
  <header {...$$props} {...removeAttrs} class="{$$props.class || ''} AppHeader">
    <AppLogo class="AppHeader-logo" />
  </header>
</template>

<style lang="scss" global>
  .AppHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: get-lines(1);
    padding-left: get-lines(1);
    background-color: var(--color-bg-content);
  }

  .AppHeader-logo {
  }
</style>
