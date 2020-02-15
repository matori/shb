<script>
  import createNullValueObject from "~/utils/createNullValueObject"

  let ordered = false
  export { ordered }

  const removeAttrs = createNullValueObject(["ordered"])
</script>

<template>
  {#if ordered}
    <ol {...$$props} {...removeAttrs} class="{$$props.class || ''} List">
      <slot />
    </ol>
  {:else}
    <ul {...$$props} {...removeAttrs} class="{$$props.class || ''} List">
      <slot />
    </ul>
  {/if}
</template>

<style lang="scss" global>
  .List {
    margin: 0;
    padding-left: 0;
    list-style-type: none;
  }
</style>
