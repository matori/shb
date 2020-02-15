<script>
</script>

<template>
  <h1 {...$$props} class="{$$props.class || ''} AppLogo">しんぷるはてぶ</h1>
</template>

<style lang="scss" global>
  .AppLogo {
    @include text(1);
    margin-top: 0;
    margin-bottom: 0;
    font-weight: var(--fw-normal);
  }
</style>
