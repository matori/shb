<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import Link from "~/elements/Link"

  let slug
  let label
  export { slug, label }

  const removeAttrs = createNullValueObject(["slug", "label"])

  $: url = `https://b.hatena.ne.jp/hotentry/${slug}`
</script>

<template>
  <div {...$$props} {...removeAttrs}  class="{$$props.class || ''} DetailInfoCategory">
    <Link {url} class="DetailInfoCategory-link">{label}</Link>
  </div>
</template>

<style lang="scss" global>
  .DetailInfoCategory {
    display: flex;
    align-items: flex-end;
  }

  .DetailInfoCategory-link {
    @include text(-2);
    display: block;
    border-radius: 2px;
    padding-right: 0.5em;
    padding-left: 0.5em;
    background-color: var(--color-bg-orange);
    color: white;
    text-decoration: none;
    white-space: nowrap;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
