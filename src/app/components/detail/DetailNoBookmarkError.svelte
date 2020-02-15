<script>
</script>

<template>
  <section class="DetailNoBookmarkError">
    <p class="DetailNoBookmarkError-message">このエントリーはまだブックマークされていません</p>
  </section>
</template>

<style lang="scss" global>
  .DetailNoBookmarkError {
    border-width: 1px;
    border-style: solid;
    border-color: var(--color-border-base);
    padding: get-lines(1);
    background-color: var(--color-bg-content);
    box-shadow: var(--box-shadow-base);
  }

  .DetailNoBookmarkError-message {
    margin: 0;
    @include text(0);
  }
</style>
