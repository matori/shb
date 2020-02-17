<script>

</script>

<template>
  <h1 {...$$props} class="{$$props.class || ''} AppLogo">
    <a href="/" class="AppLogo-link">しんぷるはてぶ</a>
  </h1>
</template>

<style lang="scss" global>
  .AppLogo {
    @include text(1);
    margin-top: 0;
    margin-bottom: 0;
    font-weight: var(--fw-normal);
    white-space: nowrap;
  }

  .AppLogo-link {
    display: flex;
    align-items: center;
    height: 100%;
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
