<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import Link from "~/elements/Link"

  let url
  export { url }

  const removeAttrs = createNullValueObject(["url"])
</script>

<template>
  <Link {...$$props} {...removeAttrs} {url} class="{$$props.class || ''} LinkBox">
    <slot />
  </Link>
</template>

<style lang="scss" global>
  .LinkBox {
    @include text(-1, false);
    display: inline-block;
    border-radius: 2px;
    padding: get-lines(0.5);
    overflow: hidden;
    background-color: var(--color-bg-blue);
    color: white;
    line-height: 1;
    text-decoration: none;
    vertical-align: bottom;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
