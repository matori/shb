<script>
  import createNullValueObject from "~/utils/createNullValueObject"

  // props
  let url
  let ref
  export { url, ref }

  const removeAttrs = createNullValueObject(["url", "ref", "target", "rel"])
</script>

<template>
  <a
    {...$$props}
    {...removeAttrs}
    href="{url}"
    target="_blank"
    rel="noreferrer noopeener nofollow"
    class="{$$props.class || ''} Link"
    bind:this="{ref}"
    on:click
    on:keydown
  >
    <slot />
  </a>
</template>

<style lang="scss" global>
  .Link {
    @include focus-clear-without-keyboard;
  }
</style>
