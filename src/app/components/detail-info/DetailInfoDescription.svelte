<script>
  import createNullValueObject from "~/utils/createNullValueObject"

  let text
  export { text }

  const removeAttrs = createNullValueObject(["text"])
</script>

<template>
  <p {...$$props} {...removeAttrs} class="{$$props.class || ''} DetailInfoDescription">
    {#if text}{text}{:else}詳細データはありません。{/if}
  </p>
</template>

<style lang="scss" global>
  .DetailInfoDescription {
    @include text(0);
    margin: 0;
    overflow-wrap: break-word;
  }
</style>
